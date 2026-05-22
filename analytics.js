/**
 * 自強之路 — 學習行為分析模組
 *
 * 設計原則：
 * 1. 失敗不阻擋遊戲：任何網路 / 後端錯誤都會 silent fail，事件暫存於 localStorage
 * 2. 批次發送：累積 10 個事件或 10 秒 flush 一次，減少請求
 * 3. 關鍵節點立即送：通關、章節完成等 milestone 立即 flush
 * 4. 完全可關閉：window.__ANALYTICS_DISABLED__ = true 即停用
 */

(function () {
  'use strict';

  // ===== 設定 =====
  const CONFIG = {
    endpoint: '/api/track',        // Vercel Serverless Function 路徑
    batchSize: 10,                  // 每 10 個事件送一次
    flushInterval: 10000,           // 或每 10 秒送一次
    storageKey: 'ziqiang_events_buffer_v1',
    studentKey: 'ziqiang_student_v1',
    maxBufferSize: 500,             // 離線最多暫存 500 條，超過就丟最舊
  };

  // ===== 學生身份 =====
  function getStudent() {
    try {
      return JSON.parse(localStorage.getItem(CONFIG.studentKey)) || null;
    } catch (e) { return null; }
  }

  function setStudent(info) {
    // info: { class: 'S4A', studentId: '12', sessionId: 'uuid' }
    localStorage.setItem(CONFIG.studentKey, JSON.stringify(info));
  }

  function getOrCreateSession() {
    let info = getStudent();
    if (info && info.sessionId) return info;
    const sessionId = (crypto.randomUUID && crypto.randomUUID()) ||
                      (Date.now() + '-' + Math.random().toString(36).slice(2, 10));
    info = info || {};
    info.sessionId = sessionId;
    info.sessionStartedAt = new Date().toISOString();
    setStudent(info);
    return info;
  }

  // ===== 事件緩衝 =====
  let buffer = [];
  function loadBuffer() {
    try {
      buffer = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
    } catch (e) { buffer = []; }
  }
  function saveBuffer() {
    if (buffer.length > CONFIG.maxBufferSize) {
      buffer = buffer.slice(-CONFIG.maxBufferSize);
    }
    try {
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(buffer));
    } catch (e) { /* quota exceeded, drop silently */ }
  }
  loadBuffer();

  // ===== 場景停留時間追蹤 =====
  let currentScene = null;
  let sceneEnterTime = null;

  function trackSceneTime() {
    if (!currentScene || !sceneEnterTime) return;
    const duration = Date.now() - sceneEnterTime;
    track('scene_dwell', {
      sceneId: currentScene,
      durationMs: duration,
    });
  }

  // ===== 核心 API =====
  function track(eventName, payload) {
    if (window.__ANALYTICS_DISABLED__) return;
    const student = getOrCreateSession();
    const event = {
      eventName,
      payload: payload || {},
      timestamp: new Date().toISOString(),
      sessionId: student.sessionId,
      class: student.class || null,
      studentId: student.studentId || null,
      appVersion: window.__APP_VERSION__ || 'unknown',
      url: location.pathname,
    };
    buffer.push(event);
    saveBuffer();

    // 關鍵 milestone 立即 flush
    const immediate = ['game_complete', 'chapter_finish', 'workshop_complete', 'login'];
    if (immediate.includes(eventName) || buffer.length >= CONFIG.batchSize) {
      flush();
    }
  }

  // ===== 發送批次 =====
  let flushing = false;
  async function flush() {
    if (flushing || buffer.length === 0) return;
    if (!navigator.onLine) return;     // 離線就先暫存
    flushing = true;
    const batch = buffer.slice();      // 複製當前 buffer
    try {
      const res = await fetch(CONFIG.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: batch }),
        keepalive: true,               // 即使頁面關閉也嘗試發送
      });
      if (res.ok) {
        // 成功才清掉已送的部分（避免 race condition）
        buffer = buffer.slice(batch.length);
        saveBuffer();
      }
    } catch (e) {
      // 網路錯誤，下次再試
    } finally {
      flushing = false;
    }
  }

  // 定時 flush
  setInterval(flush, CONFIG.flushInterval);

  // 頁面關閉前最後一次嘗試
  window.addEventListener('beforeunload', () => {
    trackSceneTime();
    if (buffer.length === 0) return;
    // 用 sendBeacon 確保送出（不被瀏覽器取消）
    try {
      const blob = new Blob([JSON.stringify({ events: buffer })], { type: 'application/json' });
      navigator.sendBeacon(CONFIG.endpoint, blob);
      buffer = [];
      saveBuffer();
    } catch (e) { /* ignore */ }
  });

  // ===== 高階追蹤 API（給 game.js 呼叫）=====
  const Analytics = {
    /**
     * 登入：學生填完班別 + 學號後呼叫
     */
    login(className, studentId) {
      const session = getOrCreateSession();
      setStudent({
        ...session,
        class: className,
        studentId: studentId,
      });
      track('login', { class: className, studentId: studentId });
    },

    /**
     * 進入場景（同時結束上一個場景的停留計時）
     */
    enterScene(sceneId, chapterKey) {
      trackSceneTime();   // 結束上一場景
      currentScene = sceneId;
      sceneEnterTime = Date.now();
      track('scene_enter', { sceneId, chapterKey });
    },

    /**
     * 點擊線索熱點
     */
    clickEvidence(evidenceId, sceneId) {
      track('evidence_click', { evidenceId, sceneId });
    },

    /**
     * 推理題作答
     */
    answerInference(sceneId, questionId, choice, correct) {
      track('inference_answer', { sceneId, questionId, choice, correct });
    },

    /**
     * 說服選擇（每場景一次）
     */
    persuasionChoice(sceneId, evidenceId, aspect) {
      track('persuasion_choice', { sceneId, evidenceId, aspect });
    },

    /**
     * 工作坊階段轉換
     */
    workshopPhase(chapterKey, phase) {
      track('workshop_phase', { chapterKey, phase });
    },

    /**
     * 工作坊完成
     */
    workshopComplete(chapterKey, selectedEvidence, aspectsUsed, score) {
      track('workshop_complete', {
        chapterKey,
        selectedEvidence,    // 學生選了哪些 evidence
        aspectsUsed,          // 覆蓋了哪些 aspects
        score,
      });
    },

    /**
     * 章節完成
     */
    chapterFinish(chapterKey, durationMs) {
      track('chapter_finish', { chapterKey, durationMs });
    },

    /**
     * 通關
     */
    gameComplete(totalScore, totalDurationMs, achievementsUnlocked) {
      trackSceneTime();
      track('game_complete', {
        totalScore,
        totalDurationMs,
        achievementsUnlocked,
      });
    },

    /**
     * 成就解鎖
     */
    achievementUnlock(achievementId) {
      track('achievement_unlock', { achievementId });
    },

    /**
     * 私函複習題作答
     */
    letterQuiz(chapterKey, questionIdx, choice, correct) {
      track('letter_quiz', { chapterKey, questionIdx, choice, correct });
    },

    /**
     * 自訂事件（萬用）
     */
    custom(eventName, payload) {
      track(eventName, payload);
    },

    /**
     * 取得當前學生資訊
     */
    getStudent: getStudent,

    /**
     * 手動清除（測試用 / 學生畢業）
     */
    clear() {
      localStorage.removeItem(CONFIG.storageKey);
      localStorage.removeItem(CONFIG.studentKey);
      buffer = [];
      currentScene = null;
      sceneEnterTime = null;
    },
  };

  window.Analytics = Analytics;
})();
