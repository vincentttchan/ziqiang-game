/* ======================================================
   自強之路 ── 洋務運動互動遊戲
   遊戲引擎 game.js
   ====================================================== */
window.__APP_VERSION__ = 'v80';

'use strict';

// ── 遊戲狀態 ─────────────────────────────────────────
const state = {
  chapterKey:  null,          // 'chapter1'…'chapter4'
  sceneQueue:  [],
  sceneIdx:    0,
  phase:       'idle',        // idle|explore|dialogue|decision|rebuttal|persuade|feedback
  evidenceBank: new Set(),
  puzzleHits:  new Set(),
  puzzleDone:  false,
  decisions:   {},            // { sceneId: 'A'|'B' } — 用於後期決策回響
  completedChapters: [],      // 已完成的章節列表（用於存檔顯示）
  chapterEvidence: new Set(), // 跨場景累積的本章史料（用於爭議庭）
  tutorialHintShown: false,   // 第一場極短教學提示
  memorials:   {},            // { chapterKey: [evId, evId, evId] } — 每章呈交的奏摺核心卷宗
  allEvidenceCollected: {},   // { chapterKey: [evId,...] } — 跨章蒐證累積（成就用）
  inferenceStats: { total: 0, firstTry: 0 }, // 推論題首次答對統計
};

// ── 存檔系統 ─────────────────────────────────────────
const SAVE_KEY = 'ziqiang_save_v1';
function saveProgress() {
  try {
    const payload = {
      nextChapter: nextChapterAfter(state.chapterKey),
      lastChapter: state.chapterKey,
      decisions: state.decisions,
      completedChapters: state.completedChapters,
      memorials: state.memorials || {},
      timestamp: Date.now(),
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
  } catch (e) { /* localStorage 可能被禁用 */ }
}
function loadProgress() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || !data.nextChapter) return null;
    return data;
  } catch (e) { return null; }
}
function clearProgress() {
  try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
}
function nextChapterAfter(chapterKey) {
  const order = ['chapter1', 'chapter2', 'chapter3', 'chapter4'];
  const i = order.indexOf(chapterKey);
  return (i >= 0 && i < order.length - 1) ? order[i + 1] : null;
}
const CHAPTER_LABELS = {
  chapter1: '第一章 · 時代困局',
  chapter2: '第二章 · 強兵之路',
  chapter3: '第三章 · 求富轉向',
  chapter4: '第四章 · 帝國之殤',
};

// ── 文憑試 術語高亮 ──────────────────────────────────────
const DSE_TERMS = {
  '師夷長技': '向西方學習技術以對抗西方的核心思想',
  '師夷長技以制夷': '魏源提出，以夷攻夷，是洋務運動的理論基礎',
  '官督商辦': '政府監管、商人出資經營的企業制度，是洋務「求富」的主要模式',
  '求強': '洋務前期目標：以軍事現代化為主（1861–1872）',
  '求富': '洋務後期目標：以工商業現代化為主（1872後）',
  '強兵': '洋務前期以購置武器、訓練軍隊為主',
  '育才': '創辦新式學堂、派遣留學生',
  '體制積弊': '清廷制度性問題，是洋務失敗的根本原因',
  '保守頑固': '守舊派以禮教為由阻撓改革',
  '政出多門': '洋務缺乏中央統一規劃，各省各自為政',
  '甲午慘敗': '1894年甲午戰爭清廷戰敗，洋務運動失敗的最終標誌',
  '治標不治本': '洋務只學西方技術，未改變政治制度，無法根治積弱',
};

function highlightDSETerms(html) {
  let result = html;
  for (const [term, tip] of Object.entries(DSE_TERMS)) {
    // 避免在已有 HTML 標籤內重複替換
    result = result.replace(
      new RegExp(`(?<!<[^>]*)${term}`, 'g'),
      `<span class="dse-term" data-tip="${tip}">${term}</span>`
    );
  }
  return result;
}

// ── 人物肖像 ─────────────────────────────────────────
const PORTRAITS = {
  '李鴻章':     'images/portraits/li-hongzhang.jpg',
  '奕訢':       'images/portraits/yi-xin.jpg',
  '恭親王奕訢': 'images/portraits/yi-xin.jpg',
  '倭仁':       'images/portraits/wo-ren.jpg',
  '倭仁（書信語氣）': 'images/portraits/wo-ren.jpg',
  '曾國藩':     'images/portraits/zeng-guofan.jpg',
  '慈禧':       'images/portraits/cixi.jpg',
  '慈禧太后':   'images/portraits/cixi.jpg',
  '張之洞':     'images/portraits/zhang-zhidong.jpg',
  '容閎':       'images/portraits/yung-wing.jpg',
  '盛宣懷':     'images/portraits/sheng-xuanhuai.jpg',
  '唐廷樞':     'images/portraits/tang-tingzhu.jpg',
  '丁汝昌':     'images/portraits/ding-ruchang.jpg',
  '李鴻章（戰後回顧）': 'images/portraits/li-hongzhang.jpg',
  '丁汝昌（遺書語氣）': 'images/portraits/ding-ruchang.jpg',
  '李蓮英':     'images/portraits/li-lianying.jpg',
  '頑固派官員': 'images/portraits/conservative.jpg',
  '清廷官員':   'images/portraits/official.jpg',
  '武將':       'images/portraits/military.jpg',
  '商人':       'images/portraits/merchant.jpg',
  '鄉紳':       'images/portraits/gentry.jpg',
  '鄉紳代表':   'images/portraits/gentry.jpg',
  '太監':       'images/portraits/eunuch.jpg',
  '守舊官員':   'images/portraits/conservative.jpg',
  '舊式武官':   'images/portraits/military.jpg',
  '德國教官':   'images/portraits/german-instructor.jpg',
  '戈登':       'images/portraits/gordon.jpg',
  '徐桐':       'images/portraits/xu-tong.jpg',
  // 場景專屬 speaker（對應通用肖像）
  '兩廣總督琦善': 'images/portraits/official.jpg',
  '兩廣總督耆英': 'images/portraits/official.jpg',
  '守舊大臣':     'images/portraits/conservative.jpg',
  '禮部侍郎':     'images/portraits/official.jpg',
  '財政官員':     'images/portraits/official.jpg',
  '保守將領':     'images/portraits/military.jpg',
  '保守士大夫':   'images/portraits/conservative.jpg',
  '洋行買辦':     'images/portraits/merchant.jpg',
};

// ── AI 配音（OpenAI TTS，方案甲：只配首句）───────────
const VOICE_MAP = {
  's1_1': 'audio/voice/v-linzexu-s1_1.mp3',
  's1_3': 'audio/voice/v-yixin-s1_3.mp3',
  's2_1': 'audio/voice/v-zengguofan-s2_1.mp3',
  's2_2': 'audio/voice/v-zengguofan-s2_2.mp3',
  's2_3': 'audio/voice/v-gordon-s2_3.mp3',
  's3_1': 'audio/voice/v-lihongzhang-s3_1.mp3',
  's3_3': 'audio/voice/v-zhangzhidong-s3_3.mp3',
  's3_4': 'audio/voice/v-lihongzhang-s3_4.mp3',
  's4_1': 'audio/voice/v-woren-s4_1.mp3',
  's4_3': 'audio/voice/v-dingruchang-s4_3.mp3',
};
let voiceAudio = null;
function playVoice(sceneId) {
  const url = VOICE_MAP[sceneId];
  if (!url) return;
  stopVoice();
  voiceAudio = new Audio(url);
  voiceAudio.volume = 0.85;
  if (typeof bgm !== 'undefined' && bgm.muted) return;
  voiceAudio.play().catch(()=>{ /* 檔案不存在或瀏覽器拒絕：靜默 */ });
}
function stopVoice() {
  if (voiceAudio) {
    try { voiceAudio.pause(); } catch (e) {}
    voiceAudio = null;
  }
}

// ── 圖片預載入 ───────────────────────────────────────
const _imgCache = new Map(); // url -> HTMLImageElement
function preloadImages(urls) {
  urls.forEach(url => {
    if (!url || _imgCache.has(url)) return;
    const img = new Image();
    img.src = url;
    _imgCache.set(url, img);
  });
}
function preloadScene(sceneId) {
  const scene = GAME_DATA.scenes[sceneId];
  if (!scene) return;
  const urls = [];
  scene.objects.forEach(o => {
    if (o.closeup) urls.push(o.closeup);
  });
  preloadImages(urls);
}
function preloadPortrait(speaker) {
  const url = PORTRAITS[speaker];
  if (url) preloadImages([url]);
}

// ── 對白鏡頭感 ─────────────────────────────────────
const SPEAKER_LENS = {
  reform: [
    '李鴻章', '奕訢', '恭親王奕訢', '曾國藩', '張之洞',
    '容閎', '盛宣懷', '唐廷樞', '兩廣總督琦善', '兩廣總督耆英'
  ],
  conservative: [
    '倭仁', '倭仁（書信語氣）', '徐桐', '守舊大臣', '守舊官員',
    '保守將領', '保守士大夫', '舊式武官', '禮部侍郎'
  ],
  court: ['慈禧', '慈禧太后', '李蓮英', '太監', '財政官員'],
  foreign: ['戈登', '德國教官', '洋行買辦']
};

function normalizeSpeakerName(speaker) {
  return (speaker || '').replace(/（[^）]*）/g, '').trim();
}

function speakerLensType(speaker) {
  const raw = speaker || '';
  const normalized = normalizeSpeakerName(raw);
  if (!normalized || normalized === '旁白') return 'narrator';
  if (SPEAKER_LENS.reform.includes(raw) || SPEAKER_LENS.reform.includes(normalized)) return 'reform';
  if (SPEAKER_LENS.conservative.includes(raw) || SPEAKER_LENS.conservative.includes(normalized)) return 'conservative';
  if (SPEAKER_LENS.court.includes(raw) || SPEAKER_LENS.court.includes(normalized)) return 'court';
  if (SPEAKER_LENS.foreign.includes(raw) || SPEAKER_LENS.foreign.includes(normalized)) return 'foreign';
  return 'neutral';
}

/* 對白派系分類（保留 data-lens 屬性供 CSS 做隱性色調暗示，
   但不再顯示文字標籤——讓學生自行判讀立場，避免破壞沉浸） */
function setDialoguePresentation(speaker) {
  const area = $('dialogue-area');
  if (!area) return;

  let type = speakerLensType(speaker);
  if (!speaker && state.phase === 'decision') type = 'player';
  if (!speaker && state.phase === 'persuade') type = 'evidence';

  area.dataset.lens = type;
  area.dataset.phase = state.phase || 'idle';

  area.classList.remove('dialogue-cut');
  void area.offsetWidth;
  area.classList.add('dialogue-cut');
}

const SCENE_BG_URLS = {
  'bg-school': 'images/bg-school-b.jpg',
};
function sceneBgUrl(bgKey) {
  return SCENE_BG_URLS[bgKey] || `images/${bgKey}.jpg`;
}

// ── 背景音樂系統 ─────────────────────────────────────
const BGM_TRACKS = {
  menu:     'audio/bgm-menu.mp3',
  chapter1: 'audio/bgm-ch1.mp3',
  chapter2: 'audio/bgm-ch2.mp3',
  chapter3: 'audio/bgm-ch3.mp3',
  chapter4: 'audio/bgm-ch4.mp3',
};

// ══════════════════════════════════════════════════════
// SFX 音效系統（Web Audio API — 不需要外部音檔）
// ══════════════════════════════════════════════════════
let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx) {
    try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch (e) { _audioCtx = null; }
  }
  return _audioCtx;
}
function sfxMuted() {
  return (typeof bgm !== 'undefined') && bgm.muted;
}
function playSFX(type) {
  if (sfxMuted()) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  try { ctx.resume(); } catch (e) {}
  const now = ctx.currentTime;

  switch (type) {
    case 'stamp': {
      // 紅印章蓋下：低頻短促 thud + 微高頻 click
      const o1 = ctx.createOscillator();
      const g1 = ctx.createGain();
      o1.type = 'square'; o1.frequency.value = 110;
      g1.gain.setValueAtTime(0.18, now);
      g1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      o1.connect(g1); g1.connect(ctx.destination);
      o1.start(now); o1.stop(now + 0.13);

      const o2 = ctx.createOscillator();
      const g2 = ctx.createGain();
      o2.type = 'triangle'; o2.frequency.value = 1800;
      g2.gain.setValueAtTime(0.08, now);
      g2.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      o2.connect(g2); g2.connect(ctx.destination);
      o2.start(now); o2.stop(now + 0.05);
      break;
    }
    case 'archive': {
      // 卷宗入檔：紙頁翻動感（短促白噪 + bandpass）
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.25, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.18;
      const src = ctx.createBufferSource(); src.buffer = buf;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2400; bp.Q.value = 1.4;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.25, now + 0.04);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      src.connect(bp); bp.connect(g); g.connect(ctx.destination);
      src.start(now);
      break;
    }
    case 'flight': {
      // 徽章飛行：上升滑音
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(420, now);
      o.frequency.exponentialRampToValueAtTime(880, now + 0.6);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.08, now + 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      o.connect(g); g.connect(ctx.destination);
      o.start(now); o.stop(now + 0.75);
      break;
    }
    case 'catch': {
      // 史料庫接住：清脆 chime
      [880, 1320].forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine'; o.frequency.value = freq;
        g.gain.setValueAtTime(0, now + i * 0.05);
        g.gain.linearRampToValueAtTime(0.06, now + i * 0.05 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.4);
        o.connect(g); g.connect(ctx.destination);
        o.start(now + i * 0.05); o.stop(now + i * 0.05 + 0.45);
      });
      break;
    }
    case 'click': {
      // 介面點擊：極短促 tick
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'triangle'; o.frequency.value = 1200;
      g.gain.setValueAtTime(0.08, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      o.connect(g); g.connect(ctx.destination);
      o.start(now); o.stop(now + 0.04);
      break;
    }
    case 'dramatic': {
      // 甲午震撼：低沉沉船感（低頻 + slow decay）
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(85, now);
      o.frequency.exponentialRampToValueAtTime(38, now + 2.0);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.25, now + 0.3);
      g.gain.linearRampToValueAtTime(0.18, now + 1.2);
      g.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
      o.connect(g); g.connect(ctx.destination);
      o.start(now); o.stop(now + 2.6);
      break;
    }
  }
}

// ══════════════════════════════════════════════════════
// 環境音系統（Web Audio API 程序化生成 — 不需音檔）
// ══════════════════════════════════════════════════════
const _ambientState = { active: null, nodes: [] };

// 場景 bg → 環境音類型
const SCENE_AMBIENT = {
  'bg-cannon':      'naval',     // 虎門炮台（海邊）
  'bg-battlefield': 'wind',      // 八里橋戰場
  'bg-court':       'court',     // 朝廷議事廳
  'bg-yamen':       'court',     // 總理衙門
  'bg-factory':     'industrial',// 江南製造局
  'bg-barracks':    'wind',      // 練兵場
  'bg-school':      'study',     // 同文館
  'bg-port':        'naval',     // 招商局港口
  'bg-port-dock':   'naval',
  'bg-telegraph':   'industrial',// 電報局
  'bg-mine':        'industrial',// 開平煤礦
  'bg-wubei':       'wind',      // 武備學堂
  'bg-wubei-field': 'wind',
  'bg-garden':      'garden',    // 頤和園
  'bg-naval':       'naval',     // 北洋海軍
  'bg-battle':      'dramatic-naval', // 黃海海戰
  'bg-study':       'study',
  'bg-tongwenguan': 'study',
};

function stopAmbient() {
  _ambientState.nodes.forEach(n => {
    try { n.stop?.(); } catch (e) {}
    try { n.disconnect?.(); } catch (e) {}
  });
  _ambientState.nodes = [];
  _ambientState.active = null;
}

function startAmbient(type) {
  if (sfxMuted()) return;
  if (_ambientState.active === type) return; // 同型不重啟
  stopAmbient();
  if (!type) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  try { ctx.resume(); } catch (e) {}
  _ambientState.active = type;

  // 主音量（環境音應極輕，與 BGM 共存）
  const master = ctx.createGain();
  master.gain.value = 0;
  master.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.2);
  master.connect(ctx.destination);
  _ambientState.nodes.push(master);

  // 共用噪音來源（4 秒循環，避免一次性產生過大 buffer）
  function makeNoise(durSec = 4) {
    const buf = ctx.createBuffer(1, ctx.sampleRate * durSec, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    src.start();
    _ambientState.nodes.push(src);
    return src;
  }

  switch (type) {
    case 'naval': {
      // 海浪：低頻波動的粉紅噪音（low-pass + slow LFO）
      const src = makeNoise();
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 320; lp.Q.value = 0.7;
      const g = ctx.createGain(); g.gain.value = 0.5;
      // LFO 模擬潮汐起伏
      const lfo = ctx.createOscillator();
      const lfoG = ctx.createGain();
      lfo.frequency.value = 0.18;
      lfoG.gain.value = 0.25;
      lfo.connect(lfoG); lfoG.connect(g.gain);
      lfo.start();
      src.connect(lp); lp.connect(g); g.connect(master);
      _ambientState.nodes.push(lp, g, lfo, lfoG);
      break;
    }
    case 'wind': {
      // 戰場風聲：高頻 bandpass 噪音 + 緩慢頻率搖擺
      const src = makeNoise();
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 720; bp.Q.value = 0.8;
      const g = ctx.createGain(); g.gain.value = 0.6;
      const lfo = ctx.createOscillator();
      const lfoG = ctx.createGain();
      lfo.frequency.value = 0.12;
      lfoG.gain.value = 220;
      lfo.connect(lfoG); lfoG.connect(bp.frequency);
      lfo.start();
      src.connect(bp); bp.connect(g); g.connect(master);
      _ambientState.nodes.push(bp, g, lfo, lfoG);
      break;
    }
    case 'court': {
      // 官署寧靜：極低頻 hum + 偶爾極遠的鐘聲（隨機 30-60s 一次）
      const src = makeNoise();
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 180; lp.Q.value = 0.5;
      const g = ctx.createGain(); g.gain.value = 0.35;
      src.connect(lp); lp.connect(g); g.connect(master);
      _ambientState.nodes.push(lp, g);
      // 隨機鐘聲
      const scheduleBell = () => {
        if (_ambientState.active !== 'court') return;
        const delay = 25 + Math.random() * 35;
        const timer = setTimeout(() => {
          if (_ambientState.active !== 'court') return;
          const now = ctx.currentTime;
          [220, 440].forEach((freq, i) => {
            const o = ctx.createOscillator();
            const bellG = ctx.createGain();
            o.type = 'sine'; o.frequency.value = freq;
            bellG.gain.setValueAtTime(0, now);
            bellG.gain.linearRampToValueAtTime(0.04 - i * 0.015, now + 0.05);
            bellG.gain.exponentialRampToValueAtTime(0.001, now + 4);
            o.connect(bellG); bellG.connect(master);
            o.start(now); o.stop(now + 4.1);
          });
          scheduleBell();
        }, delay * 1000);
        _ambientState.nodes.push({ stop: () => clearTimeout(timer) });
      };
      scheduleBell();
      break;
    }
    case 'industrial': {
      // 工廠低頻轟鳴 + 金屬高頻
      const src = makeNoise();
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 110; lp.Q.value = 0.8;
      const g1 = ctx.createGain(); g1.gain.value = 0.8;
      src.connect(lp); lp.connect(g1); g1.connect(master);
      // 機械周期感
      const lfo = ctx.createOscillator();
      const lfoG = ctx.createGain();
      lfo.frequency.value = 0.45;
      lfoG.gain.value = 0.4;
      lfo.connect(lfoG); lfoG.connect(g1.gain);
      lfo.start();
      _ambientState.nodes.push(lp, g1, lfo, lfoG);
      break;
    }
    case 'study': {
      // 學堂寧靜：超低頻 hum + 偶爾紙頁翻動
      const src = makeNoise();
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 140; lp.Q.value = 0.5;
      const g = ctx.createGain(); g.gain.value = 0.3;
      src.connect(lp); lp.connect(g); g.connect(master);
      _ambientState.nodes.push(lp, g);
      // 偶爾翻書聲
      const schedulePage = () => {
        if (_ambientState.active !== 'study') return;
        const delay = 18 + Math.random() * 25;
        const timer = setTimeout(() => {
          if (_ambientState.active !== 'study') return;
          const now = ctx.currentTime;
          const pSrc = makeNoise(0.2);
          const pBp = ctx.createBiquadFilter();
          pBp.type = 'bandpass'; pBp.frequency.value = 2800; pBp.Q.value = 1.5;
          const pG = ctx.createGain();
          pG.gain.setValueAtTime(0, now);
          pG.gain.linearRampToValueAtTime(0.08, now + 0.03);
          pG.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          pSrc.connect(pBp); pBp.connect(pG); pG.connect(master);
          schedulePage();
        }, delay * 1000);
        _ambientState.nodes.push({ stop: () => clearTimeout(timer) });
      };
      schedulePage();
      break;
    }
    case 'garden': {
      // 花園：高頻細微 + 偶爾鳥鳴
      const src = makeNoise();
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 1100; bp.Q.value = 0.6;
      const g = ctx.createGain(); g.gain.value = 0.25;
      src.connect(bp); bp.connect(g); g.connect(master);
      _ambientState.nodes.push(bp, g);
      // 鳥鳴
      const scheduleBird = () => {
        if (_ambientState.active !== 'garden') return;
        const delay = 12 + Math.random() * 18;
        const timer = setTimeout(() => {
          if (_ambientState.active !== 'garden') return;
          const now = ctx.currentTime;
          const o = ctx.createOscillator();
          const bG = ctx.createGain();
          o.type = 'sine';
          o.frequency.setValueAtTime(2400, now);
          o.frequency.linearRampToValueAtTime(3200, now + 0.08);
          o.frequency.linearRampToValueAtTime(2200, now + 0.16);
          bG.gain.setValueAtTime(0, now);
          bG.gain.linearRampToValueAtTime(0.05, now + 0.02);
          bG.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
          o.connect(bG); bG.connect(master);
          o.start(now); o.stop(now + 0.2);
          scheduleBird();
        }, delay * 1000);
        _ambientState.nodes.push({ stop: () => clearTimeout(timer) });
      };
      scheduleBird();
      break;
    }
    case 'dramatic-naval': {
      // 黃海海戰：低頻沉重 + 海浪 + 偶爾遠炮
      const src = makeNoise();
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 240; lp.Q.value = 0.6;
      const g = ctx.createGain(); g.gain.value = 0.9;
      src.connect(lp); lp.connect(g); g.connect(master);
      _ambientState.nodes.push(lp, g);
      const scheduleCannon = () => {
        if (_ambientState.active !== 'dramatic-naval') return;
        const delay = 8 + Math.random() * 12;
        const timer = setTimeout(() => {
          if (_ambientState.active !== 'dramatic-naval') return;
          const now = ctx.currentTime;
          const cSrc = makeNoise(0.4);
          const cLp = ctx.createBiquadFilter();
          cLp.type = 'lowpass'; cLp.frequency.value = 95; cLp.Q.value = 1.2;
          const cG = ctx.createGain();
          cG.gain.setValueAtTime(0, now);
          cG.gain.linearRampToValueAtTime(0.5, now + 0.03);
          cG.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
          cSrc.connect(cLp); cLp.connect(cG); cG.connect(master);
          scheduleCannon();
        }, delay * 1000);
        _ambientState.nodes.push({ stop: () => clearTimeout(timer) });
      };
      scheduleCannon();
      break;
    }
  }
}

const bgm = {
  audio:    null,
  current:  null,
  muted:    false,
  unlocked: false,
  pending:  null,
};

function bgmPlay(key) {
  bgm.pending = key;
  if (!bgm.unlocked) return;
  if (bgm.current === key && bgm.audio && !bgm.audio.paused) return;
  const src = BGM_TRACKS[key];
  if (!src) return;

  const next = new Audio(src);
  next.loop   = true;
  next.volume = 0;

  if (bgm.audio) {
    const old = bgm.audio;
    let vol = old.volume;
    const fadeOut = setInterval(() => {
      vol = Math.max(0, vol - 0.04);
      old.volume = vol;
      if (vol <= 0) { clearInterval(fadeOut); old.pause(); old.src = ''; }
    }, 40);
  }

  bgm.audio   = next;
  bgm.current = key;

  if (!bgm.muted) {
    next.play().catch(() => {});
    let vol = 0;
    const fadeIn = setInterval(() => {
      vol = Math.min(1, vol + 0.04);
      next.volume = vol;
      if (vol >= 1) clearInterval(fadeIn);
    }, 40);
  }
}

function bgmToggleMute() {
  bgm.muted = !bgm.muted;
  if (bgm.audio) bgm.audio.volume = bgm.muted ? 0 : 1;
  if (bgm.muted) { stopVoice(); stopAmbient(); }
  // 取消靜音時，重新啟動當前場景的環境音
  if (!bgm.muted && state.chapterKey) {
    const sceneId = state.sceneQueue[state.sceneIdx];
    const scene = GAME_DATA.scenes[sceneId];
    if (scene) startAmbient(SCENE_AMBIENT[scene.bg] || null);
  }
  const btn = document.getElementById('btn-mute');
  if (btn) {
    btn.setAttribute('aria-pressed', bgm.muted ? 'true' : 'false');
    btn.setAttribute('title', bgm.muted ? '已靜音' : '環境音');
  }
}

function bgmUnlock() {
  if (bgm.unlocked) return;
  bgm.unlocked = true;
  document.removeEventListener('click', bgmUnlock, true);
  if (bgm.pending) bgmPlay(bgm.pending);
}

let _portraitSrc = '';

function setPortrait(speaker) {
  const figure = $('portrait-figure');
  const el     = $('dialogue-portrait');
  const area   = $('dialogue-area');
  if (!figure || !el || !area) return;
  setDialoguePresentation(speaker);

  const normalized = normalizeSpeakerName(speaker);
  const src = PORTRAITS[normalized] || '';
  if (src === _portraitSrc) return;

  function applyPortrait(newSrc) {
    _portraitSrc = newSrc;
    if (newSrc) {
      el.src = newSrc;
      el.alt = normalized;
      area.classList.add('portrait-active');
      figure.classList.remove('portrait-exiting');
      void figure.offsetWidth; // force reflow for animation restart
      figure.classList.add('portrait-entering');
      figure.addEventListener('animationend', () => {
        figure.classList.remove('portrait-entering');
      }, { once: true });
    } else {
      // 移除 src 避免 Safari 顯示破圖；CSS 控制 display
      el.removeAttribute('src');
      el.alt = '';
      area.classList.remove('portrait-active');
    }
  }

  if (_portraitSrc) {
    figure.classList.remove('portrait-entering');
    figure.classList.add('portrait-exiting');
    figure.addEventListener('animationend', () => {
      figure.classList.remove('portrait-exiting');
      applyPortrait(src);
    }, { once: true });
  } else {
    applyPortrait(src);
  }
}

// ── 條件判斷 ───────────────────────────────────────
// requires: { 's1_1': 'B', 's2_1': 'A' } → 全部需符合
function meetsRequires(item) {
  if (!item || !item.requires) return true;
  for (const sceneKey in item.requires) {
    if (state.decisions[sceneKey] !== item.requires[sceneKey]) return false;
  }
  return true;
}

// 說服追蹤（每場景只用一次說服）
// 已使用的論據（evidence id）/ 組合（label）
let persuasionUsedEvidences = new Set();
let persuasionUsedCombos    = new Set();
// 打字計時器
let typingTimer    = null;
let typingFullText = '';
// 繼續按鈕回調
let continueCallback = null;

// ── 工具 ─────────────────────────────────────────────
const $  = id => document.getElementById(id);
const qs = sel => document.querySelector(sel);

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}

// ── 初始化 ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  bindMenu();
  bindToolbar();
  bindDialogueContinue();
  bindEvidenceDrawer();

  // 預備選單 BGM；iOS Safari 需等首次用戶點擊才能播放
  bgm.pending = 'menu';
  document.addEventListener('click', bgmUnlock, true);

  // 校準模式：直接進入校準畫面
  if (new URLSearchParams(location.search).get('calibrate')) {
    initCalibration();
    return;
  }

  // 路由邏輯：
  //   有存檔 → 跳過引言，直入主選單 + 顯示「繼續上次」彈窗
  //   無存檔 → 顯示引言頁面（首次入場儀式）
  const save = loadProgress();
  if (save) {
    showScreen('main-menu');
    setTimeout(() => showResumeModal(save), 500);
  } else {
    showScreen('epigraph-screen');
  }

  // 引言「繼續」按鈕 → 進入主選單（Noise Burn 轉場）
  const epiContinue = $('btn-epigraph-continue');
  if (epiContinue) {
    epiContinue.addEventListener('click', () => {
      const epi = $('epigraph-screen');
      playNoiseBurn(() => {
        epi.classList.add('fading-out');
        showScreen('main-menu');
        setTimeout(() => epi.classList.remove('fading-out'), 700);
      }, { duration: 1100, peakRatio: 0.32 });
    });
  }
});

// ── Noise Burn 轉場：可在任何畫面切換時呼叫 ──────────────
// onMidpoint：在雜訊最濃時呼叫（此時切換畫面內容，玩家看不到突變）
function playNoiseBurn(onMidpoint, options) {
  const opts     = options || {};
  const duration = opts.duration  || 1100;   // 整段毫秒數
  const peakRatio = opts.peakRatio || 0.35;  // 何時切換內容（0-1）
  const overlay  = document.getElementById('noise-burn-overlay');
  if (!overlay) { if (onMidpoint) onMidpoint(); return; }

  // 每次重隨機 turbulence seed，避免雜訊紋路一樣
  const turb = overlay.querySelector('feTurbulence');
  if (turb) turb.setAttribute('seed', String(Math.floor(Math.random() * 100)));

  overlay.classList.add('active');
  // Force reflow
  void overlay.offsetWidth;
  overlay.classList.add('burn-peak');

  // 高峰時切畫面
  setTimeout(() => {
    if (onMidpoint) onMidpoint();
  }, duration * peakRatio);

  // 動畫結束後收場
  setTimeout(() => {
    overlay.classList.remove('burn-peak');
    overlay.classList.remove('active');
  }, duration + 50);
}

// ── 校準模式 ──────────────────────────────────────────
function initCalibration() {
  // ── 1. 直接跳至目標場景（不經章節過場）──
  const params   = new URLSearchParams(location.search);
  const targetSc = params.get('scene') || 's1_1';

  // 根據場景 ID 推算所屬章
  const chMap = { s1:'chapter1', s2:'chapter2', s3:'chapter3', s4:'chapter4' };
  const chKey = chMap[targetSc.slice(0,2)] || 'chapter1';
  state.chapterKey = chKey;
  state.sceneQueue = [...GAME_DATA[chKey].scenes];
  state.sceneIdx   = state.sceneQueue.indexOf(targetSc);
  if (state.sceneIdx < 0) state.sceneIdx = 0;
  showScreen('game-screen');
  renderScene(state.sceneQueue[state.sceneIdx]);

  // ── 2. 建立校準 UI 面板 ──
  const panel = document.createElement('div');
  panel.id = 'calibrate-overlay';
  panel.innerHTML = `
    <div id="cal-toolbar">
      <span id="cal-coords">x: —  y: —</span>
      <select id="cal-scene-select"></select>
      <button id="cal-clear">清除標記</button>
      <button id="cal-toggle-boxes">顯示物件框</button>
      <span id="cal-clipboard">✔ 已複製</span>
    </div>
    <div id="cal-dots-layer"></div>
    <div id="cal-boxes-layer"></div>`;
  $('scene-frame').appendChild(panel);

  // ── 3. 場景選擇器 ──
  const sel = panel.querySelector('#cal-scene-select');
  Object.values(chMap).forEach(ck => {
    GAME_DATA[ck].scenes.forEach(sid => {
      const sc = GAME_DATA.scenes[sid];
      const opt = document.createElement('option');
      opt.value = sid;
      opt.textContent = `${sid}  ${sc.title}`;
      if (sid === targetSc) opt.selected = true;
      sel.appendChild(opt);
    });
  });
  sel.addEventListener('change', () => {
    const sid = sel.value;
    const ck2 = chMap[sid.slice(0,2)] || 'chapter1';
    state.chapterKey = ck2;
    state.sceneQueue = [...GAME_DATA[ck2].scenes];
    state.sceneIdx   = state.sceneQueue.indexOf(sid);
    renderScene(sid);
    drawBoxes(sid);
    panel.querySelector('#cal-dots-layer').innerHTML = '';
    // 更新網址（不刷新頁面）
    history.replaceState(null,'',`?calibrate=1&scene=${sid}`);
  });

  // ── 4. 物件框疊層 ──
  let boxesVisible = false;
  function drawBoxes(sid) {
    const bl = panel.querySelector('#cal-boxes-layer');
    bl.innerHTML = '';
    if (!boxesVisible) return;
    const sc = GAME_DATA.scenes[sid];
    (sc.objects || []).forEach(obj => {
      const b = document.createElement('div');
      b.className = 'cal-box' + (obj.isCharacter ? ' cal-char' : '');
      b.style.cssText = `left:${obj.x}%;top:${obj.y}%;width:${obj.w||10}%;height:${obj.h||10}%`;
      b.title = `${obj.label}\nx:${obj.x} y:${obj.y} w:${obj.w} h:${obj.h}`;
      const lbl = document.createElement('span');
      lbl.textContent = obj.label;
      b.appendChild(lbl);
      bl.appendChild(b);
    });
  }
  panel.querySelector('#cal-toggle-boxes').addEventListener('click', () => {
    boxesVisible = !boxesVisible;
    panel.querySelector('#cal-toggle-boxes').textContent = boxesVisible ? '隱藏物件框' : '顯示物件框';
    drawBoxes(state.sceneQueue[state.sceneIdx] || targetSc);
  });

  // ── 5. 滑鼠座標追蹤 ──
  $('scene-frame').addEventListener('mousemove', e => {
    const r = $('scene-frame').getBoundingClientRect();
    const x = Math.round((e.clientX - r.left) / r.width  * 100);
    const y = Math.round((e.clientY - r.top)  / r.height * 100);
    panel.querySelector('#cal-coords').textContent = `x: ${x}  y: ${y}`;
  });

  // ── 6. 點擊標記 + 自動複製 ──
  const clip = panel.querySelector('#cal-clipboard');
  $('scene-frame').addEventListener('click', e => {
    if (e.target.closest('#calibrate-overlay')) return;
    const r = $('scene-frame').getBoundingClientRect();
    const x = Math.round((e.clientX - r.left) / r.width  * 100);
    const y = Math.round((e.clientY - r.top)  / r.height * 100);
    const dot = document.createElement('div');
    dot.className = 'calibrate-dot';
    dot.style.left = x + '%';
    dot.style.top  = y + '%';
    const tip = document.createElement('span');
    tip.textContent = `${x},${y}`;
    dot.appendChild(tip);
    panel.querySelector('#cal-dots-layer').appendChild(dot);
    const txt = `x: ${x}, y: ${y}`;
    console.log(`{ ${txt} }`);
    navigator.clipboard?.writeText(txt).then(() => {
      clip.style.opacity = '1';
      setTimeout(() => clip.style.opacity = '0', 1200);
    }).catch(() => {});
  }, true);

  // ── 7. 清除標記 ──
  panel.querySelector('#cal-clear').addEventListener('click', () => {
    panel.querySelector('#cal-dots-layer').innerHTML = '';
  });

  // 初次繪製物件框（如已開啟）
  drawBoxes(targetSc);
}

// ── 登陸頁面 視差互動 ────────────────────────────────
function bindLandingParallax() {
  const menu = document.getElementById('main-menu');
  if (!menu) return;
  const crack = menu.querySelector('.landing-crack');
  const title = menu.querySelector('.landing-title');
  if (!crack || !title) return;

  const MAX_DRIFT = 10; // 最大視差幅度 (px)
  let raf = null;
  let pendingMx = 0, pendingMy = 0;

  const onMove = (e) => {
    const rect = menu.getBoundingClientRect();
    pendingMx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
    pendingMy = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      const dx = pendingMx * MAX_DRIFT;
      const dy = pendingMy * MAX_DRIFT * 0.4;
      // 裂痕跟隨：相反方向（製造「劃開」感）
      crack.style.transform = `translate(${-dx * 0.7}px, calc(-50% + ${-dy * 0.4}px))`;
      // 標題輕微順向視差
      title.style.transform = `translate(${dx * 0.4}px, ${-dy * 0.3}px)`;
    });
  };

  const onLeave = () => {
    crack.style.transform = '';
    title.style.transform = '';
  };

  menu.addEventListener('mousemove', onMove);
  menu.addEventListener('mouseleave', onLeave);
}

// ── 主選單綁定 ────────────────────────────────────────
function bindMenu() {
  // 「進入歷史」CTA — 裂痕撕裂 → 主選單與章節過場 crossfade（方案 A）
  $('btn-start-new').addEventListener('click', () => {
    // 若未登入則先彈登入框；否則直接進遊戲
    const student = (window.Analytics && Analytics.getStudent()) || null;
    if (!student || !student.class) {
      showLoginModal(() => beginStartSequence());
    } else {
      beginStartSequence();
    }
  });

  function beginStartSequence() {
    clearProgress();
    resetState();
    // 先顯示案卷說明，讀完再開始遊戲
    showBriefingThenStart();
  }

  function showBriefingThenStart() {
    const startBtn = $('about-start');
    const nextBtn  = $('about-next');
    const backBtn  = $('about-back');
    const tabs     = Array.from(document.querySelectorAll('.dt-tab'));
    const panels   = Array.from(document.querySelectorAll('.dp-panel'));

    // 引導模式：隱藏「返回主選單」，顯示「下一頁」
    backBtn.style.display  = 'none';
    startBtn.style.display = 'none';
    nextBtn.style.display  = '';

    showScreen('about-screen');

    // 重置至首頁
    let currentIdx = 0;
    const showIndex = (idx) => {
      currentIdx = idx;
      tabs.forEach((t, i) => t.classList.toggle('active', i === idx));
      panels.forEach((p, i) => p.classList.toggle('active', i === idx));
      const sc = document.querySelector('.dossier-panels');
      if (sc) sc.scrollTop = 0;
      // 最後一頁：切換為「開始遊戲」
      if (idx === tabs.length - 1) {
        nextBtn.style.display  = 'none';
        startBtn.style.display = '';
      } else {
        nextBtn.style.display  = '';
        startBtn.style.display = 'none';
      }
    };

    showIndex(0);

    const onNext = () => showIndex(Math.min(currentIdx + 1, tabs.length - 1));
    const onTabClick = (e) => {
      const idx = tabs.indexOf(e.currentTarget);
      if (idx >= 0) showIndex(idx);
    };
    const onStart = () => {
      // 解除事件
      nextBtn.removeEventListener('click', onNext);
      tabs.forEach(t => t.removeEventListener('click', onTabClick));
      startBtn.removeEventListener('click', onStart);
      // 恢復按鈕原狀
      backBtn.style.display  = '';
      nextBtn.style.display  = 'none';
      startBtn.style.display = 'none';

      const menu = $('main-menu');
      menu.classList.add('exiting');
      setTimeout(() => {
        menu.classList.add('fading-out');
        startGame('chapter1');
        setTimeout(() => menu.classList.remove('exiting', 'fading-out'), 700);
      }, 650);
    };

    nextBtn.addEventListener('click', onNext);
    tabs.forEach(t => t.addEventListener('click', onTabClick));
    startBtn.addEventListener('click', onStart);
  }

  // ── 學生登入 modal ─────────────────────────────
  function showLoginModal(onDone) {
    const modal = $('student-login-modal');
    const classSel = $('login-class');
    const idInput = $('login-student-id');
    const submitBtn = $('login-submit');
    const skipBtn = $('login-skip');

    modal.style.display = 'flex';
    setTimeout(() => classSel.focus(), 100);

    const cleanup = () => {
      modal.style.display = 'none';
      submitBtn.onclick = null;
      skipBtn.onclick = null;
      idInput.onkeydown = null;
    };

    submitBtn.onclick = () => {
      const cls = classSel.value.trim();
      const sid = idInput.value.trim();
      if (!cls) { classSel.focus(); classSel.style.borderColor = '#a8322a'; return; }
      if (!sid) { idInput.focus(); idInput.style.borderColor = '#a8322a'; return; }
      if (window.Analytics) Analytics.login(cls, sid);
      cleanup();
      onDone && onDone();
    };

    skipBtn.onclick = () => {
      // 略過：仍會用匿名 sessionId 收集數據，但 class/studentId 為 null
      if (window.Analytics) Analytics.custom('login_skipped', {});
      cleanup();
      onDone && onDone();
    };

    idInput.onkeydown = (e) => {
      if (e.key === 'Enter') submitBtn.click();
    };
  }

  // 滑鼠移動 → 裂痕與標題輕微視差
  bindLandingParallax();

  // 環境音切換 — 圓形圖示按鈕（SVG 切換 on/off）
  const audioBtn = $('btn-landing-audio');
  if (audioBtn) {
    const setBtnState = (on) => {
      audioBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      audioBtn.setAttribute('title', on ? '靜音' : '環境音');
    };
    setBtnState(false);
    audioBtn.addEventListener('click', () => {
      const on = audioBtn.getAttribute('aria-pressed') === 'true';
      if (on) {
        bgm.muted = true;
        if (bgm.audio) bgm.audio.volume = 0;
        setBtnState(false);
      } else {
        bgm.muted = false;
        bgm.unlocked = true;
        if (bgm.audio) bgm.audio.volume = 1;
        bgmPlay('menu');
        setBtnState(true);
      }
    });
  }

  // 案卷說明連結（防止 href="#" 跳到頁首）
  const aboutLink = $('btn-about');
  if (aboutLink) {
    aboutLink.addEventListener('click', (e) => {
      if (aboutLink.tagName === 'A') e.preventDefault();
      showScreen('about-screen');
    });
  }
  // 翻閱回憶錄連結
  const memoirsLink = $('btn-memoirs');
  if (memoirsLink) {
    memoirsLink.addEventListener('click', (e) => {
      e.preventDefault();
      showMemoirsScreen();
    });
  }
  const memoirsBack = $('memoirs-back');
  if (memoirsBack) memoirsBack.addEventListener('click', () => showScreen('main-menu'));
  $('about-back').addEventListener('click', () => showScreen('main-menu'));

  // 案卷檔案卡：分頁切換
  document.querySelectorAll('.dt-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.dt-tab').forEach(t => t.classList.toggle('active', t === tab));
      document.querySelectorAll('.dp-panel').forEach(p => {
        p.classList.toggle('active', p.dataset.panel === target);
      });
      // 重置滾動位置
      const panels = document.querySelector('.dossier-panels');
      if (panels) panels.scrollTop = 0;
    });
  });
  $('quiz-continue').addEventListener('click', onQuizContinue);

  // 存檔提示 modal
  $('resume-continue').addEventListener('click', () => {
    const save = loadProgress();
    hideResumeModal();
    if (save && save.nextChapter) {
      // 還原決策記錄、奏摺記錄，讓後期回響仍然成立
      state.decisions = save.decisions || {};
      state.completedChapters = save.completedChapters || [];
      state.memorials = save.memorials || {};
      startGame(save.nextChapter);
    } else {
      startGame('chapter1');
    }
  });
  $('resume-restart').addEventListener('click', () => {
    clearProgress();
    resetState();
    hideResumeModal();
  });

  // 章節筆記摺疊按鈕（事件委派）
  document.addEventListener('click', e => {
    const btn = e.target.closest('.note-toggle');
    if (!btn) return;
    toggleNoteSection(btn.dataset.target);
  });
  $('transition-continue').addEventListener('click', onTransitionContinue);
  // transition-skip 按鈕已移除
  // 整個過場區也可點擊跳過（不影響 continue 按鈕）
  $('chapter-transition').addEventListener('click', e => {
    if (e.target.id === 'transition-continue') return;
    // 雙擊任意位置可加速到第三幕末
    jumpTransitionToEnd();
  });
  $('ending-restart').addEventListener('click', () => {
    // 進入通關成就頁，而非直接回主選單
    showAchievementScreen();
  });
  // 成就頁的「重新開始」與「列印」按鈕
  const achvReplay = $('achv-replay');
  if (achvReplay) achvReplay.addEventListener('click', () => {
    clearProgress();
    resetState();
    showScreen('main-menu');
    bgmPlay('menu');
  });
  const achvPrint = $('achv-print');
  if (achvPrint) achvPrint.addEventListener('click', () => {
    playSFX('click');
    document.body.classList.add('print-mode-achievement');
    window.print();
    setTimeout(() => document.body.classList.remove('print-mode-achievement'), 500);
  });
}

// 存檔提示 modal 控制
function showResumeModal(save) {
  const meta = `上次進行至 ${CHAPTER_LABELS[save.lastChapter] || ''}`;
  $('resume-meta').textContent = meta;
  $('resume-modal').classList.add('active');
  $('resume-modal').setAttribute('aria-hidden', 'false');
}
function hideResumeModal() {
  $('resume-modal').classList.remove('active');
  $('resume-modal').setAttribute('aria-hidden', 'true');
}

function bindToolbar() {
  $('btn-mute').addEventListener('click', bgmToggleMute);
  $('btn-hint').addEventListener('click', showHint);
  $('btn-menu').addEventListener('click', () => {
    if (confirm('確定返回主選單？目前進度將不會儲存。')) {
      resetState();
      showScreen('main-menu');
      bgmPlay('menu');
    }
  });
}

function bindDialogueContinue() {
  $('dialogue-continue').addEventListener('click', () => {
    // Tap to skip typing first
    if (typingTimer) {
      skipTyping();
      return;
    }
    $('dialogue-continue').classList.remove('pulsing');
    if (continueCallback) {
      const cb = continueCallback;
      continueCallback = null;
      cb();
    }
  });

  // 全域點擊跳過：在對白區或場景區點擊任意處（非按鈕）即跳過打字
  function tapToSkip(e) {
    if (typingTimer && !e.target.closest('button') && !e.target.closest('.scene-object')) {
      skipTyping();
    }
  }
  $('dialogue-area').addEventListener('click', tapToSkip);
  $('scene-frame').addEventListener('click', tapToSkip);
}

// ── 史料庫抽屜（Portrait 模式）────────────────────────
function bindEvidenceDrawer() {
  const handle  = $('evidence-drawer-handle');
  const panel   = $('evidence-panel');
  const overlay = $('evidence-overlay');
  const game    = $('game-screen');

  function toggleDrawer() {
    const isPortrait = window.matchMedia('(orientation: portrait)').matches;
    if (isPortrait) {
      const isOpen = panel.classList.toggle('drawer-open');
      overlay.classList.toggle('active', isOpen);
      handle.setAttribute('aria-label', isOpen ? '收起史料庫' : '展開史料庫');
      return;
    }

    const collapsed = panel.classList.toggle('evidence-collapsed');
    if (game) game.classList.toggle('evidence-collapsed', collapsed);
    handle.setAttribute('aria-label', collapsed ? '展開史料庫' : '收起史料庫');
  }
  handle.addEventListener('click', toggleDrawer);
  overlay.addEventListener('click', toggleDrawer);
}

// ── 重置 ─────────────────────────────────────────────
function resetState() {
  stopAmbient(); // 重置時關閉環境音
  state.chapterKey = null;
  state.sceneQueue = [];
  state.sceneIdx = 0;
  state.phase = 'idle';
  state.evidenceBank = new Set();
  state.puzzleHits = new Set();
  state.puzzleDone = false;
  state.decisions = {};
  state.memorials = {};
  state.completedChapters = [];
  state.chapterEvidence = new Set();
  state.tutorialHintShown = false;
  $('evidence-list').innerHTML = '';
  $('evidence-badge').textContent = '0';
  continueCallback = null;
  if (typingTimer) clearTimeout(typingTimer);
  typingTimer = null;
}

// ══════════════════════════════════════════════════════
// 遊戲開始
// ══════════════════════════════════════════════════════
function startGame(startChapterKey, options = {}) {
  showScreen('game-screen');
  if (options.skipTransition) {
    const chapterKey = startChapterKey || 'chapter1';
    bgmPlay(chapterKey);
    state.chapterKey      = chapterKey;
    state.sceneQueue      = [...GAME_DATA[chapterKey].scenes];
    state.sceneIdx        = 0;
    state.chapterEvidence = new Set();
    renderScene(state.sceneQueue[0]);
    return;
  }
  startChapter(startChapterKey || 'chapter1');
}

const CHAPTER_BG = {
  chapter1: 'ch1-transition',
  chapter2: 'ch2-transition',
  chapter3: 'ch3-transition',
  chapter4: 'ch4-transition'
};

function startChapter(chapterKey) {
  bgmPlay(chapterKey);
  state.chapterKey      = chapterKey;
  state.sceneQueue      = [...GAME_DATA[chapterKey].scenes];
  state.sceneIdx        = 0;
  state.chapterEvidence = new Set(); // 重置章節累積史料
  const ch = GAME_DATA[chapterKey];

  // Parse year from subtitle for the transition year display
  const yearMatch = ch.subtitle.match(/\d{4}/);
  showChapterTransition({
    year:     yearMatch ? yearMatch[0] : '',
    title:    ch.title,
    subtitle: ch.subtitle,
    text:     ch.intro,
    bgImage:  CHAPTER_BG[chapterKey]
  }, () => renderScene(state.sceneQueue[0]));
}

// ══════════════════════════════════════════════════════
// 過場（三幕：年份落下 → 標題分裂 → 敘述模糊到清晰）
// ══════════════════════════════════════════════════════
const TRANSITION_SEEN_KEY = 'ziqiang_seen_transitions_v1';
function getSeenTransitions() {
  try {
    const raw = localStorage.getItem(TRANSITION_SEEN_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}
function markTransitionSeen(key) {
  try {
    const seen = getSeenTransitions();
    seen[key] = true;
    localStorage.setItem(TRANSITION_SEEN_KEY, JSON.stringify(seen));
  } catch (e) {}
}

let _chapterTypeTimer = null;
function showChapterTransition(data, onComplete) {
  // 先讓 Noise Burn 接管畫面，再切到章節過場
  playNoiseBurn(() => {
    _renderChapterTransition(data, onComplete);
  }, { duration: 1100, peakRatio: 0.32 });
}

function _renderChapterTransition(data, onComplete) {
  $('transition-year').textContent       = data.year     || '';
  // 把標題拆成上下兩半（依字數平均切，奇數時上半多一字）
  const title = data.title || '';
  const mid = Math.ceil(title.length / 2);
  $('transition-title-top').textContent  = title.slice(0, mid);
  $('transition-title-bot').textContent  = title.slice(mid);
  $('transition-subtitle').textContent   = data.subtitle || '';
  $('transition-continue').textContent   = '開始';

  // 描述文字：清空，稍後用打字機展開
  const textEl = $('transition-text');
  textEl.textContent = '';
  textEl.dataset.fullText = data.text || '';

  const el  = $('chapter-transition');
  const inner = el.querySelector('.transition-content');
  el.style.backgroundImage = data.bgImage ? `url('images/${data.bgImage}.jpg')` : '';

  // 重置動畫類別
  inner.classList.remove('act-1', 'act-2', 'act-3');
  void inner.offsetWidth;

  showScreen('chapter-transition');
  continueCallback = null;
  $('transition-continue')._cb = onComplete;

  // 跳過按鈕已移除

  // 三幕順序播放
  inner.classList.add('act-1');
  setTimeout(() => inner.classList.add('act-2'), 400);
  setTimeout(() => {
    inner.classList.add('act-3');
    // 描述文字用打字機呈現（act-3 觸發後 0.5s 開始）
    setTimeout(() => typeChapterIntroText(textEl), 500);
  }, 1200);
}

function typeChapterIntroText(textEl) {
  // 移除打字機效果：一次性顯示，避免 lag 感
  if (_chapterTypeTimer) { clearTimeout(_chapterTypeTimer); _chapterTypeTimer = null; }
  textEl.classList.remove('typewriting');
  textEl.textContent = textEl.dataset.fullText || '';
}

function jumpTransitionToEnd() {
  const inner = $('chapter-transition').querySelector('.transition-content');
  inner.classList.add('act-1', 'act-2', 'act-3');
  // 立即完成打字機內容
  if (_chapterTypeTimer) { clearTimeout(_chapterTypeTimer); _chapterTypeTimer = null; }
  const textEl = $('transition-text');
  if (textEl) {
    textEl.textContent = textEl.dataset.fullText || textEl.textContent;
    textEl.classList.remove('typewriting');
  }
}

function onTransitionContinue() {
  const cb = $('transition-continue')._cb;
  $('transition-continue')._cb = null;
  showScreen('game-screen');
  if (cb) cb();
}

// ══════════════════════════════════════════════════════
// 場景渲染
// ══════════════════════════════════════════════════════
function renderScene(sceneId) {
  const scene = GAME_DATA.scenes[sceneId];
  if (window.Analytics) Analytics.enterScene(sceneId, state.chapterKey);
  stopVoice();
  state.puzzleHits  = new Set();
  state.puzzleDone  = false;
  persuasionUsedEvidences = new Set();
  persuasionUsedCombos    = new Set();
  state.phase       = 'explore';
  state.evidenceBank = new Set();
  $('evidence-badge').textContent = '0';
  $('evidence-list').innerHTML    = '';
  // 進入新場景時 evidence panel 自動摺疊（使用既有系統）
  const _panel = $('evidence-panel');
  const _game  = $('game-screen');
  if (_panel) _panel.classList.add('evidence-collapsed');
  if (_game)  _game.classList.add('evidence-collapsed');
  // 時間軸
  updateTimeline(scene.year);
  // 啟動該場景的環境音（程序化生成，極輕音量與 BGM 共存）
  startAmbient(SCENE_AMBIENT[scene.bg] || null);
  // 首次進入第一場景：onboarding 提示
  if (sceneId === 's1_1') {
    setTimeout(() => showOnboardingTip('first_scene',
      '**書記要做的事**：點擊場景中發光的物件以蒐證。蒐齊本場關鍵卷宗，李公方會與你議事。', '📜'), 1000);
  }
  $('current-year').textContent    = scene.year + ' 年';
  $('current-chapter').textContent = GAME_DATA[state.chapterKey].title;
  // 場景進度指示：「場景 X／Y」
  const totalScenes = state.sceneQueue.length;
  const currentSceneNum = state.sceneIdx + 1;
  const progressEl = $('scene-progress');
  if (progressEl) progressEl.textContent = `場景 ${currentSceneNum} / ${totalScenes}`;

  // 背景 — crossfade between two bg-layer divs
  const layerA = $('bg-layer-a');
  const layerB = $('bg-layer-b');
  const activeLayer = layerA.classList.contains('bg-active') ? layerA : layerB;
  const inactiveLayer = activeLayer === layerA ? layerB : layerA;

  const sceneBgURL = sceneBgUrl(scene.bg);

  // 路徑 ②：將當前場景圖 URL 寫入 scene-area，供 ::before 模糊背景延伸層使用
  const sceneAreaEl = $('scene-area');
  if (sceneAreaEl) {
    sceneAreaEl.style.setProperty('--scene-bg-url', `url('${sceneBgURL}')`);
  }

  // 等新圖片載入後才執行 crossfade，避免舊場景圖閃現
  inactiveLayer.className = 'bg-layer has-img ' + scene.bg;
  const bgImg = inactiveLayer.querySelector('.bg-img');

  const doSwitch = () => {
    // Sync #scene-objects aspect-ratio to the image's actual rendered rect
    const r = bgImg ? bgImg.naturalWidth / bgImg.naturalHeight : 0;
    if (r > 0 && isFinite(r)) {
      $('scene-frame').style.setProperty('--img-aspect', r.toString());
    }
    // Force reflow so CSS transition triggers, then swap active layer
    void inactiveLayer.offsetWidth;
    inactiveLayer.classList.add('bg-active');
    activeLayer.classList.remove('bg-active');
  };

  if (bgImg) {
    bgImg.src = sceneBgURL;
    if (bgImg.complete && bgImg.naturalWidth > 0) {
      // Already cached — switch immediately
      doSwitch();
    } else {
      // Wait for load; fall back after 800 ms if onload never fires (e.g. error)
      let switched = false;
      const fallback = setTimeout(() => { if (!switched) { switched = true; doSwitch(); } }, 800);
      bgImg.onload = () => { if (!switched) { switched = true; clearTimeout(fallback); doSwitch(); } };
      bgImg.onerror = () => { if (!switched) { switched = true; clearTimeout(fallback); doSwitch(); } };
    }
  } else {
    doSwitch();
  }

  // 場景標題：左上角極簡呈現（原版位置）
  const titleEl = $('scene-title');
  titleEl.classList.remove('animate');
  titleEl.innerHTML = `<span class="title-text">${scene.title || ''}</span>`;
  void titleEl.offsetWidth;
  titleEl.classList.add('animate');

  // 清除物件 / 人物
  $('scene-objects').innerHTML    = '';
  $('scene-characters').innerHTML = '';

  // 謎題進度
  updatePuzzleProgress(scene);
  updateMissionStatus(scene);

  // 渲染物件（過濾不符合 requires 條件的條件式物件）
  scene.objects.forEach(obj => {
    if (meetsRequires(obj)) renderObject(obj, scene);
  });

  // 預載入：本場 closeup + 對白人物肖像 + 下一場場景
  preloadScene(sceneId);
  if (scene.dialogue && scene.dialogue.speaker) preloadPortrait(scene.dialogue.speaker);
  if (scene.rebuttal && scene.rebuttal.speaker) preloadPortrait(scene.rebuttal.speaker);
  const nextId = state.sceneQueue[state.sceneIdx + 1];
  if (nextId) preloadScene(nextId);

  // 描述文字回歸對話框（原版設計）
  setSceneSubtitle(''); // 清空底部字幕（不再使用）
  setDialogueCollapsed(false); // 對白區展開
  setDialogue('', scene.description || '', false);

  // 工具列提示
  setPhaseIndicator('蒐證');

  // 第一場極短教學提示：降低首次探索門檻
  if (scene.tutorialHint && !state.tutorialHintShown) {
    state.tutorialHintShown = true;
    setTimeout(() => showToast(scene.tutorialHint), 650);
  }

  // 場景轉場動畫
  const frame = $('scene-frame');
  frame.classList.remove('scene-entering');
  void frame.offsetWidth;
  frame.classList.add('scene-entering');
}

function renderObject(obj, scene) {
  const wrap = document.createElement('div');
  // Determine object type class for differentiated glow
  // isCharacter → warm pulsing aura; everything else → crisp gold shimmer
  const typeClass = obj.isCharacter ? ' obj-character' : ' obj-document';
  wrap.className   = 'scene-object' + typeClass + (obj.isPuzzleTarget ? ' puzzle-target' : '');
  wrap.dataset.id  = obj.id;
  wrap.dataset.verb = obj.isCharacter ? '✦ 端詳' : '✦ 細看';
  wrap.style.left  = obj.x + '%';
  wrap.style.top   = obj.y + '%';
  if (obj.w) wrap.style.width  = obj.w + '%';
  if (obj.h) wrap.style.height = obj.h + '%';
  wrap.setAttribute('role', 'button');
  wrap.setAttribute('tabindex', '0');
  wrap.setAttribute('aria-label', obj.label);

  const handler = () => handleObjectClick(obj, scene);
  wrap.addEventListener('click', handler);
  wrap.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handler(); });
  $('scene-objects').appendChild(wrap);
}

// ══════════════════════════════════════════════════════
// 物件特寫面板
// ══════════════════════════════════════════════════════
function openCloseup(obj, scene) {
  const panel = $('closeup-panel');
  const imgEl = $('closeup-img');
  const wrap = $('closeup-img-wrap');

  // Skeleton + fade-in：先顯示骨架，圖載入後再淡入
  imgEl.classList.remove('loaded');
  if (wrap) wrap.classList.add('loading');
  imgEl.onload = () => {
    imgEl.classList.add('loaded');
    if (wrap) wrap.classList.remove('loading');
  };
  imgEl.onerror = () => {
    if (wrap) wrap.classList.remove('loading');
  };
  imgEl.src = obj.closeup || '';
  // 若已快取（complete 即時為 true），直接顯示
  if (imgEl.complete && imgEl.naturalWidth > 0) {
    imgEl.classList.add('loaded');
    if (wrap) wrap.classList.remove('loading');
  }
  imgEl.alt = obj.label;
  $('closeup-label').textContent = obj.label;
  const rawContent = (GAME_DATA.evidence[obj.evidence] || {}).content || '';
  $('closeup-desc').innerHTML = highlightDSETerms(rawContent.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'));
  panel.removeAttribute('aria-hidden');
  panel.classList.add('active');

  const collectBtn = $('closeup-collect');
  const el = $('scene-objects').querySelector(`[data-id="${obj.id}"]`);
  const alreadyCollected = el && el.classList.contains('collected');
  const ev = obj.evidence ? GAME_DATA.evidence[obj.evidence] : null;
  collectBtn.disabled = alreadyCollected;
  collectBtn.textContent = alreadyCollected
    ? '已收入史料庫'
    : (ev && ev.inference ? '判斷史料意義' : '收入史料庫');

  collectBtn.onclick = () => collectObject(obj, scene);
  $('closeup-close').onclick = closeCloseup;
  $('closeup-backdrop').onclick = closeCloseup;
}

function collectObject(obj, scene) {
  const el = $('scene-objects').querySelector(`[data-id="${obj.id}"]`);
  if (!el || el.classList.contains('collected')) {
    closeCloseup();
    return;
  }
  const ev = obj.evidence ? GAME_DATA.evidence[obj.evidence] : null;

  // 思考門檻：**只有 puzzle target（關鍵線索）**才需要做推論題
  // 普通線索直接收入，降低學生疲勞
  if (ev && ev.inference && obj.isPuzzleTarget) {
    showInference(obj, scene, ev);
    return;
  }
  finalizeCollect(obj, scene, ev);
}

function finalizeCollect(obj, scene, ev) {
  const el = $('scene-objects').querySelector(`[data-id="${obj.id}"]`);
  if (el) el.classList.add('collected');

  // 1. 金光擴散（成就感）
  showCollectCelebration();

  // 2. 入檔儀式：蓋章 + 論點（在 closeup 內顯示，整合「解鎖史料」+「論點生成」）
  showCollectCeremony(obj, ev);

  // 3. 解鎖 evidence（更新狀態 + 渲染面板，但不再彈出舊 popup）
  if (obj.evidence) unlockEvidence(obj.evidence);

  // 4. 計入謎題進度（不依賴 isPuzzleTarget）
  const isPuzzleObj = (scene.puzzle && scene.puzzle.targets &&
                      scene.puzzle.targets.includes(obj.id)) || obj.isPuzzleTarget;
  if (isPuzzleObj) {
    state.puzzleHits.add(obj.id);
    updatePuzzleProgress(scene);
    updateMissionStatus(scene);
    checkPuzzle(scene);
  }

  // 5. 由用戶手動點「下一步」推進 → 飛行 → 關閉 closeup
  const nextBtn = $('cc-next-btn');
  if (nextBtn) {
    nextBtn.onclick = () => {
      playSFX('click');
      if (ev && ev.category) flyCategoryBadge(ev.category);
      closeCloseup();
    };
  }
}

// 入檔儀式：紅色印章帶 + 論點摘要
function showCollectCeremony(obj, ev) {
  const ceremony = $('collect-ceremony');
  if (!ceremony || !ev) return;

  // 隱藏推論題、收入按鈕（已完成）
  $('closeup-collect').style.display = 'none';
  const inf = $('closeup-inference');
  if (inf) inf.hidden = true;

  // 音效：印章蓋下（150ms 後與 CSS 動畫同步）
  setTimeout(() => playSFX('stamp'), 150);
  // 紙頁翻動（500ms 後與論點紙條浮現同步）
  setTimeout(() => playSFX('archive'), 500);

  // 生成論點句
  const point = inferEvidenceArgument(obj.evidence, ev, state.chapterKey);
  const sentence = point ? buildArgumentSentence(point, state.chapterKey) : '此卷可資佐證。';
  $('cc-argument').innerHTML =
    `<span class="cc-arg-prefix">臣以為</span>` +
    `<span class="cc-arg-sentence">${sentence}</span>`;

  // 重啟動畫
  ceremony.hidden = false;
  ceremony.classList.remove('show');
  void ceremony.offsetWidth;
  ceremony.classList.add('show');
}

// ══════════════════════════════════════════════════════
// 推論題（思考門檻）
// ══════════════════════════════════════════════════════
function showInference(obj, scene, ev) {
  $('closeup-collect').style.display = 'none';
  const inf = $('closeup-inference');
  inf.hidden = false;
  // 首次推論題：onboarding
  setTimeout(() => showOnboardingTip('first_inference',
    '**史料判讀**：此乃關鍵卷宗，需先判斷其歷史意義。答錯可再試。', '🔍'), 600);

  const inference = ev.inference;
  $('inf-question').textContent = inference.question;
  const fb = $('inf-feedback');
  fb.textContent = '';
  fb.className   = '';
  const label = qs('.inf-prompt-label');
  const prompt = qs('.inf-prompt-text');
  if (label) label.textContent = '史料判讀';
  if (prompt) prompt.textContent = '先判斷史料意義，再把它轉化成可用論點。';

  const optsEl = $('inf-options');
  optsEl.innerHTML = '';

  // 追蹤嘗試次數（第二次錯才揭示答案）
  let attempts = 0;

  const shuffled = [...inference.options]
    .map(o => ({ o, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(x => x.o);

  const renderOpts = () => {
    optsEl.innerHTML = '';
    shuffled.forEach(opt => {
      const btn = document.createElement('button');
      btn.className   = 'inf-opt';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => onInferenceAnswer(btn, opt, obj, scene, ev, attempts, () => { attempts++; }));
      optsEl.appendChild(btn);
    });
  };
  renderOpts();
}

function onInferenceAnswer(btn, opt, obj, scene, ev, attempts, incAttempts) {
  const nextBtn = $('inf-next');
  if (window.Analytics) Analytics.answerInference(state.sceneId, ev?.id || obj?.id, opt.text || '', !!opt.correct);
  if (opt.correct) {
    // 推論統計（成就「不負所學」用）
    if (!state.inferenceStats) state.inferenceStats = { total: 0, firstTry: 0 };
    state.inferenceStats.total++;
    if (attempts === 0) state.inferenceStats.firstTry++;
    btn.classList.add('opt-correct');
    [...$('inf-options').children].forEach(b => b.disabled = true);
    const fb = $('inf-feedback');
    fb.className = 'feedback-correct';

    // 文憑試 框架提示
    const dseHint = opt.dseHint ? `<br><span class="dse-hint-tag">💡 答題應用：${opt.dseHint}</span>` : '';
    fb.innerHTML = `✓ ${opt.feedback || '正解！'}${dseHint}`;

    // 顯示「下一步」按鈕，由學生自主推進
    nextBtn.hidden = false;
    nextBtn.textContent = '下一步 →';
    nextBtn.onclick = () => {
      nextBtn.hidden = true;
      showArgumentChoice(obj, scene, ev);
    };
  } else {
    incAttempts();
    btn.classList.add('opt-wrong');
    btn.disabled = true;
    const fb = $('inf-feedback');

    if (attempts === 0) {
      // 第一次錯：給提示，可再試（不出現「下一步」）
      fb.className = 'feedback-hint';
      fb.textContent = '✗ ' + (opt.hint || '再想想這份史料的歷史意義。');
      setTimeout(() => {
        btn.classList.remove('opt-wrong');
        btn.disabled = false;
      }, 600);
    } else {
      // 第二次錯：揭示正確答案 + 出現「下一步」
      fb.className = 'feedback-hint';
      const correct = (ev.inference.options || []).find(o => o.correct);
      fb.innerHTML = `✗ ${opt.hint || ''}　<span class="reveal-answer">正確答案：${correct ? correct.text : ''}</span>`;
      [...$('inf-options').children].forEach(b => b.disabled = true);
      nextBtn.hidden = false;
      nextBtn.textContent = '下一步 →';
      nextBtn.onclick = () => {
        nextBtn.hidden = true;
        showArgumentChoice(obj, scene, ev);
      };
    }
  }
}

function showLearningToast(evidenceId, ev) {
  // 已由入檔儀式（showCollectCeremony）取代，此函數保留為 no-op 以避免破壞舊呼叫點
  return;
}

function showArgumentChoice(obj, scene, ev) {
  const label = qs('.inf-prompt-label');
  const prompt = qs('.inf-prompt-text');
  if (label) label.textContent = '判斷問題';
  if (prompt) prompt.textContent = '根據剛才的推論，判斷這份史料反映出清朝哪方面的問題。';

  const correct = inferEvidenceArgument(obj.evidence, ev, state.chapterKey);
  const points = CHAPTER_ARGUMENTS[state.chapterKey] || [];
  const distractors = points.filter(p => p.id !== correct?.id).slice(0, 3);
  const options = [correct, ...distractors]
    .filter(Boolean)
    .map(point => ({ point, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(x => x.point);

  $('inf-question').textContent = '這份歷史資料，反映出當時清朝面對哪一方面的問題？';
  const fb = $('inf-feedback');
  fb.textContent = '';
  fb.className = '';
  const optsEl = $('inf-options');
  optsEl.innerHTML = '';

  options.forEach(point => {
    const btn = document.createElement('button');
    btn.className = 'inf-opt argument-opt';
    btn.innerHTML = `<strong>${escapeHTML(point.label)}</strong><span>可用於文憑試：${escapeHTML(point.dseUse)}</span>`;
    btn.addEventListener('click', () => {
      if (point.id === correct?.id) {
        btn.classList.add('opt-correct');
        [...optsEl.children].forEach(b => b.disabled = true);
        fb.className = 'feedback-correct';
        fb.innerHTML = `✓ 這份史料反映出「${escapeHTML(point.label)}」的問題。<br><span class="dse-hint-tag">可轉化成論點：${escapeHTML(buildArgumentSentence(point, state.chapterKey))}</span>`;
        // 手動「收入史料庫」按鈕，由學生自主推進
        const nextBtn = $('inf-next');
        nextBtn.hidden = false;
        nextBtn.textContent = '✓ 收入史料庫 →';
        nextBtn.onclick = () => {
          nextBtn.hidden = true;
          resetInferenceUI();
          finalizeCollect(obj, scene, ev);
        };
      } else {
        btn.classList.add('opt-wrong');
        btn.disabled = true;
        fb.className = 'feedback-hint';
        fb.textContent = `再想想：這份史料反映的是哪一方面的時代困局？`;
        setTimeout(() => {
          btn.classList.remove('opt-wrong');
          btn.disabled = false;
        }, 700);
      }
    });
    optsEl.appendChild(btn);
  });
}

function resetInferenceUI() {
  $('closeup-inference').hidden = true;
  $('closeup-collect').style.display = '';
  $('inf-options').innerHTML = '';
  $('inf-feedback').textContent = '';
  $('inf-feedback').className   = '';
  const nextBtn = $('inf-next');
  if (nextBtn) { nextBtn.hidden = true; nextBtn.onclick = null; }
  const label = qs('.inf-prompt-label');
  const prompt = qs('.inf-prompt-text');
  if (label) label.textContent = '史料判讀';
  if (prompt) prompt.textContent = '先判斷史料意義，再把它轉化成可用論點。';
}

// ══════════════════════════════════════════════════════
// 分類飛行徽章（潛意識歸類動畫）
// ══════════════════════════════════════════════════════
// DSE 框架四維分類：時代背景 → 前期強兵 → 後期富國（教育併入後期）
// 改革阻力使用 obstacle 標籤，不單獨列為主分類
const CATEGORY_LABELS = {
  'background':  '時代背景',
  'strengthen':  '前期強兵',
  'enrich':      '後期富國',
  // 向後相容（舊存檔/舊資料若仍存在）
  'strong':      '前期強兵',
  'rich':        '後期富國',
  'talent':      '後期富國',
  'thought':     '時代背景',
};
const CATEGORY_KEY_FROM_LABEL = {
  '時代背景':  'background',
  '前期強兵':  'strengthen',
  '後期富國':  'enrich',
  // 向後相容
  '強兵':  'strengthen',
  '求富':  'enrich',
  '育才':  'enrich',
  '思想':  'background',
};
function categoryKey(category) {
  if (!category) return null;
  return CATEGORY_KEY_FROM_LABEL[category] || category;
}

function archiveNumber(index, groupKey) {
  const drawerMap = {
    background: 'A', strengthen: 'B', enrich: 'C',
    // 向後相容
    thought: 'A', strong: 'B', talent: 'C', rich: 'C',
    other: 'Z'
  };
  const ch = (state.chapterKey || 'chapter0').replace('chapter', 'CH');
  const drawer = drawerMap[groupKey] || 'Z';
  return `${ch}-${drawer}${String(index + 1).padStart(3, '0')}`;
}

function extractEvidenceYear(content) {
  const match = String(content || '').match(/(?:18|19)\d{2}(?:\s*[—–-]\s*(?:18|19)?\d{2})?/);
  return match ? match[0].replace(/\s+/g, '') : '未標年';
}

function shortEvidenceLead(content) {
  const text = String(content || '')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > 92 ? text.slice(0, 92) + '…' : text;
}

function drawerCode(groupKey) {
  return {
    thought: 'DRAWER A',
    strong: 'DRAWER B',
    talent: 'DRAWER C',
    rich: 'DRAWER D',
    other: 'DRAWER Z'
  }[groupKey] || 'DRAWER Z';
}

const CHAPTER_ARGUMENTS = {
  chapter1: [
    // DSE 框架：「軍事敗因」統合清廷武備衰落與列強堅船利炮，
    // 這是 DSE 答「洋務興起背景」時最核心的一個論點（兩面一體）
    { id: 'military_defeat', label: '軍事敗因', dseUse: '背景',
      keywords: [
        // 清軍衰落面
        '槍', '武器', '火器', '騎兵', '弓', '射程', '戰敗', '清兵', '士官', '炮台',
        '前膛', '青銅', '彎刀', '冷兵器', '八十年',
        // 列強優勢面
        '阿姆斯特朗', '後膛', '黃銅', '彈殼', 'Armstrong', '鐵甲', '六磅',
        '聯軍', '條約', '南京', '北京', '割', '賠款', '列強', '通牒',
      ]
    },
    // 內憂外患：太平天國 + 常勝軍借助洋槍鎮亂，說明內部動盪亦推動洋務
    { id: 'domestic_crisis', label: '內憂外患', dseUse: '背景',
      keywords: ['太平', '常勝軍', '戈登', '華爾', '蘇州', '湘軍', '淮軍', '平亂', '鎮壓', '洋將', '金田', '天京', '半壁']
    },
    // 思想轉變：開明官員 / 學者提出「師夷長技」，是洋務的思想基礎
    { id: 'reform_thought', label: '思想轉變', dseUse: '背景',
      keywords: ['海國圖志', '師夷', '校邠盧', '中學為體', '文祥', '魏源', '馮桂芬', '夷情', '總理衙門']
    },
  ],
  chapter2: [
    { id: 'military_industry', label: '軍事工業', dseUse: '措施', keywords: ['江南', '機器', '炮管', '蒸汽', '齒輪', '煤鐵', '船政', '製造', '兵工'] },
    { id: 'new_training', label: '新式練兵', dseUse: '措施', keywords: ['練兵', '步槍', '恩菲爾德', '陣法', '戈登', '靶', '教官', '操練', '訓練'] },
    { id: 'diplomacy', label: '近代外交', dseUse: '措施', keywords: ['總理衙門', '外交', '地球儀', '文件盒', '使團', '蒲安臣', '列強', '照會'] },
    { id: 'talent_education', label: '育才翻譯', dseUse: '措施', keywords: ['同文館', '留美', '容閎', '學童', '譯', '英文', '課程', '六分儀', '傅蘭雅', '藍圖'] },
  ],
  chapter3: [
    { id: 'shift_to_rich', label: '求富轉向', dseUse: '原因', keywords: ['日本', '侵台', '海防', '利權', '洋貨', '轉向', '挽回', '富國'] },
    { id: 'shipping_trade', label: '航運商辦', dseUse: '措施', keywords: ['招商局', '輪船', '航運', '商辦', '營收', '唐廷樞', '洋商', '買辦'] },
    { id: 'telegraph_railway', label: '交通郵電', dseUse: '措施', keywords: ['電報', '鐵路', '唐胥', '盛宣懷', '海底電線', '通訊', '消息'] },
    { id: 'mining_industry', label: '工礦採煉', dseUse: '措施', keywords: ['開平', '漢陽', '大冶', '煤', '鐵', '礦', '高爐', '鋼鐵', '產量'] },
  ],
  chapter4: [
    { id: 'ideology_limit', label: '思想局限', dseUse: '原因／評價', keywords: ['倭仁', '中體西用', '禮義', '技藝', '科舉', '八股', '同文館', '算學', '制度改革'] },
    { id: 'fund_corruption', label: '經費腐敗', dseUse: '原因／評價', keywords: ['軍費', '頤和園', '慈禧', '李蓮英', '挪用', '石舫', '沙土', '貪污', '剋扣'] },
    { id: 'institution_split', label: '制度分裂', dseUse: '原因／評價', keywords: ['南洋', '北洋', '各省', '非我所轄', '水師', '指揮', '信號旗', '中央', '地方'] },
    { id: 'obsolete_navy', label: '軍備失效', dseUse: '原因／評價', keywords: ['北洋艦隊', '日本海軍', '黃海', '炮彈', '艦隊', '老', '更新', '丁汝昌', '甲午'] },
  ],
};

let evidenceSceneIndexCache = null;
function getEvidenceSceneIndex() {
  if (evidenceSceneIndexCache) return evidenceSceneIndexCache;
  const index = {};
  Object.entries(GAME_DATA.scenes || {}).forEach(([sceneId, scene]) => {
    (scene.objects || []).forEach(obj => {
      if (obj.evidence && !index[obj.evidence]) index[obj.evidence] = sceneId;
    });
  });
  evidenceSceneIndexCache = index;
  return index;
}

function chapterForEvidence(evidenceId) {
  const sceneId = getEvidenceSceneIndex()[evidenceId];
  const chapterEntry = Object.entries(GAME_DATA)
    .find(([, ch]) => ch && Array.isArray(ch.scenes) && ch.scenes.includes(sceneId));
  return chapterEntry ? chapterEntry[0] : state.chapterKey;
}

function inferEvidenceType(evidenceId, ev) {
  const hay = `${ev?.name || ''} ${ev?.content || ''}`;
  if (/條約|通牒|照會|章程|公文|奏摺|電報/.test(hay)) return '制度文件';
  if (/日記|日誌|筆記|口述|私函|遺書|語|信/.test(hay)) return '人物證言';
  if (/報告|戰報|表|名冊|簿|記錄|清單/.test(hay)) return '檔案記錄';
  if (/地圖|掛圖|圖|藍圖|沙盤|課程|教材/.test(hay)) return '圖像資料';
  if (/炮|槍|刀|彈|儀|齒輪|樣本|建材|殘件|旗/.test(hay)) return '器物史料';
  if (/人|官|教官|士官|學士|容閎|唐廷樞|盛宣懷|張之洞|倭仁|丁汝昌|李蓮英/.test(hay)) return '人物史料';
  return '文字史料';
}

function inferEvidenceArgument(evidenceId, ev, chapterKey = state.chapterKey) {
  const points = CHAPTER_ARGUMENTS[chapterKey] || [];
  const hay = `${ev?.name || ''} ${ev?.category || ''} ${ev?.content || ''}`;
  let best = points[0] || null;
  let bestScore = -1;
  points.forEach(point => {
    let score = 0;
    point.keywords.forEach(keyword => {
      if (hay.includes(keyword)) score += keyword.length > 2 ? 2 : 1;
    });
    // 新四維分類（含舊值向後相容）
    const cat = ev?.category;
    const sub = ev?.subCategory;
    if ((cat === '前期強兵' || cat === '強兵') && /軍事|練兵|軍備|工業|軍|外交/.test(point.label)) score += 1;
    if ((cat === '後期富國' || cat === '求富' || cat === '育才') && /求富|航運|交通|工礦|商辦|育才|教育|翻譯/.test(point.label)) score += 2;
    if ((cat === '時代背景' || cat === '思想') && /背景|內憂|外患|思潮|傳統|守舊|失敗|阻力/.test(point.label)) score += 1;
    // 副標籤加權：精確命中對應論點
    if (sub === '軍事工業' && /軍事|工業|機器/.test(point.label)) score += 2;
    if (sub === '編練新軍' && /練兵|新軍|軍隊/.test(point.label)) score += 2;
    if (sub === '外交政治' && /外交|總理衙門|使節/.test(point.label)) score += 3;
    if (sub === '興辦實業' && /實業|航運|工礦|商辦|電報|鐵路/.test(point.label)) score += 2;
    if (sub === '改革教育' && /教育|育才|學堂|翻譯|留學/.test(point.label)) score += 3;
    // 改革阻力專屬：直接對應「失敗原因」論點
    if (ev?.obstacle === true && /失敗|阻力|保守|腐敗|挪用|識見|局限/.test(point.label)) score += 4;
    if (score > bestScore) {
      best = point;
      bestScore = score;
    }
  });
  return best;
}

function evidenceLearningMeta(evidenceId) {
  const ev = GAME_DATA.evidence[evidenceId];
  const chapterKey = chapterForEvidence(evidenceId);
  const argument = inferEvidenceArgument(evidenceId, ev, chapterKey);
  return {
    type: inferEvidenceType(evidenceId, ev),
    argument,
    chapterKey,
    dseUse: argument?.dseUse || '史實',
  };
}

function buildArgumentSentence(point, chapterKey) {
  if (!point) return '此史料可作為相關史實，支撐答案中的分析。';
  // v80：每個論點提供 2-3 句變體，依「論點 id + 周目數」決定取哪一句，
  // 同一周目同一論點保持一致，跨周目自動換句，避免機械記憶。
  const openings = {
    chapter1: {
      // 合併舊 military_gap + foreign_pressure → military_defeat
      military_defeat: [
        '兩次鴉片戰爭中清軍以冷兵器抵禦堅船利炮，慘敗結局與不平等條約直接推動「師夷長技以制夷」之議。',
        '虎門炮台、八里橋接連潰敗，清廷武備落後與列強軍事優勢的懸殊對比，是洋務興起最直接的外部衝擊。',
        '清軍傳統武備不堪一擊，英法聯軍憑堅船利炮迫使清廷簽訂諸約——這場軍事與主權的雙重失敗，是洋務運動的起點。',
      ],
      domestic_crisis: [
        '太平天國等內憂迫使清廷倚重洋槍洋炮與地方督撫，推動洋務派思考自強之路。',
        '湘軍、淮軍因鎮壓太平軍而崛起，地方督撫掌握洋槍洋炮，奠定了洋務運動的人才與軍事基礎。',
        '內亂與外患交逼之下，曾國藩、李鴻章等漢人督撫透過實戰體會西器之利，順勢推動洋務。',
      ],
      reform_thought: [
        '魏源、馮桂芬等人的新思潮，為洋務運動提供「師夷長技」與「中體西用」的思想基礎。',
        '《海國圖志》《校邠廬抗議》等著作打開了士人眼界，使「師夷長技」由口號漸成共識。',
        '從魏源到馮桂芬，新思潮逐步形成「中學為體、西學為用」的折衷框架，支撐洋務派的改革論述。',
      ],
    },
    chapter2: {
      military_industry: [
        '洋務派以建立近代軍事工業為核心措施，試圖透過自製槍炮船艦達到自強。',
        '安慶內軍械所、江南製造總局、福州船政局相繼興辦，反映「自製器物」是求強階段的首要路徑。',
        '由曾國藩、李鴻章、左宗棠主導的軍工建設，標誌清廷首次以官辦形式系統引進西方近代工業。',
      ],
      new_training: [
        '洋務派引入西式操練和新式武器，嘗試改造傳統軍隊以提升戰鬥力。',
        '湘淮軍改用洋槍洋炮、聘西人教習操典，標誌清軍由舊式綠營向近代化部隊過渡。',
        '北洋、南洋的新軍與水師營建立西式編制與訓練，是「求強」由器物進一步觸及制度的嘗試。',
      ],
      diplomacy: [
        '總理衙門及出使活動反映清廷開始建立近代外交制度，回應列強壓力。',
        '1861 年總理各國事務衙門設立，使清廷首次有專責對外機關，標誌外交體制走向近代化。',
        '由蒲安臣使團到郭嵩燾駐英，洋務派試圖以近代外交手段周旋於列強之間，回應條約體系挑戰。',
      ],
      talent_education: [
        '同文館、譯書館及留美學童反映洋務派重視培養翻譯、工程和軍事人才。',
        '京師同文館與上海廣方言館的設立，標誌洋務派意識到「人才」是自強的根本，而非僅靠購器。',
        '容閎主持的留美幼童計劃將近代教育推向海外，是洋務人才培育最具前瞻性的嘗試。',
      ],
    },
    chapter3: {
      shift_to_rich: [
        '日本侵台與利權外流使洋務派意識到僅強兵不足，必須以求富支持國防。',
        '1874 年牡丹社事件後，李鴻章等深感「無餉則無兵」，遂由「求強」轉向「求富」階段。',
        '面對列強商戰，洋務派漸明白若無近代經濟基礎，軍備建設亦難持久，故倡求富以養強兵。',
      ],
      shipping_trade: [
        '輪船招商局等官督商辦企業反映洋務派希望以商業力量挽回利權。',
        '招商局與旗昌、太古、怡和爭運，是洋務派以官督商辦形式直接挑戰外資的標誌性嘗試。',
        '透過漕運、航運奪回部分利權，洋務派證明商業亦可成為「自強」工具，不限於船堅炮利。',
      ],
      telegraph_railway: [
        '電報與鐵路建設反映洋務後期重視交通通訊，以提升軍政效率和經濟能力。',
        '津滬電報、唐胥鐵路等基建反映洋務派意識到通訊與運輸是近代國防與經濟的命脈。',
        '盛宣懷主導的電報局與鐵路爭議顯示洋務後期已由器物深入到基礎設施層面。',
      ],
      mining_industry: [
        '開礦、鐵廠與煤鐵工業反映洋務派希望建立近代工業基礎，支撐強兵與求富。',
        '開平煤礦的成功與漢陽鐵廠的興辦，標誌洋務派從製造器物進一步深入到原料與重工業。',
        '煤鐵自給是近代工業的根基，洋務派的礦冶事業正是嘗試擺脫對外國原料依賴的關鍵一步。',
      ],
    },
    chapter4: {
      ideology_limit: [
        '守舊思想與「中體西用」局限，使洋務運動只停留在器物層面，未能推動制度改革。',
        '倭仁等保守派的反對與「中體西用」的折衷，使洋務派始終不敢觸及科舉、官制等根本問題。',
        '思想束縛使改革止於船炮機器，未能如日本明治維新般推動政治制度變革，埋下失敗伏筆。',
      ],
      fund_corruption: [
        '軍費不足和腐敗挪用削弱洋務建設，導致北洋海軍等成果難以持續。',
        '北洋海軍經費被挪作頤和園工程等用途，使艦隊更新停滯，是甲午潰敗的直接遠因之一。',
        '官辦與官督商辦企業普遍存在貪污浮報，使洋務成果受制於財政與吏治的雙重侵蝕。',
      ],
      institution_split: [
        '中央統籌不足與地方各自為政，使洋務軍事建設缺乏統一指揮和制度保障。',
        '南北洋海軍各自為政、缺乏統一海軍部，反映洋務軍事建設受制於督撫分權的結構性缺陷。',
        '中央未能整合資源、各省督撫各行其是，使洋務運動難以形成全國性的近代化合力。',
      ],
      obsolete_navy: [
        '北洋艦隊軍備老化與更新不足，反映洋務強兵成果未能經受甲午戰爭考驗。',
        '黃海一戰，定遠鎮遠雖噸位巨大但火力與航速已落後日艦，顯示洋務海軍已停步於 1880 年代水準。',
        '甲午之敗證明僅靠購艦而無持續更新與制度配套，洋務「強兵」終究是表面繁榮。',
      ],
    },
  };
  const variants = openings[chapterKey]?.[point.id];
  if (!variants) {
    return `此史料反映「${point.label}」的問題，可作為${point.dseUse}題的論據。`;
  }
  // 取周目數作為 seed：同周目同論點 → 同句；跨周目自動換句
  let runCount = 0;
  try {
    const memoirs = JSON.parse(localStorage.getItem('ziqiang_memoirs_v1') || '{}');
    runCount = (memoirs.runs || []).length;
  } catch (e) { /* fallback to 0 */ }
  // 簡單字串 hash（避免不同論點同 seed 取到同 index）
  let h = runCount;
  for (let i = 0; i < point.id.length; i++) h = (h * 31 + point.id.charCodeAt(i)) >>> 0;
  return variants[h % variants.length];
}

function getChapterArgumentProgress(chapterKey = state.chapterKey) {
  const points = CHAPTER_ARGUMENTS[chapterKey] || [];
  const buckets = points.map(point => ({ ...point, evidence: [] }));
  Array.from(state.chapterEvidence || []).forEach(id => {
    const ev = GAME_DATA.evidence[id];
    if (!ev) return;
    const meta = evidenceLearningMeta(id);
    const idx = buckets.findIndex(point => point.id === meta.argument?.id);
    if (idx >= 0) buckets[idx].evidence.push({ id, ev, meta });
  });
  return buckets;
}

function flyCategoryBadge(category) {
  const key = categoryKey(category);
  if (!key) return;
  const flyer = $('category-flyer');
  flyer.className = 'flying-v2 cat-' + key;
  flyer.textContent = CATEGORY_LABELS[key] || category;

  // 起點：closeup card 中央
  const card = $('closeup-card');
  const cardRect = card.getBoundingClientRect();
  const startX = cardRect.left + cardRect.width / 2;
  const startY = cardRect.top  + cardRect.height / 2;

  // 終點：優先選史料庫徽章（精確小目標），fallback 到 drawer-handle 或 panel
  const target = document.getElementById('evidence-badge')
                || document.getElementById('evidence-drawer-handle')
                || document.getElementById('evidence-panel');
  const tRect = target.getBoundingClientRect();
  const endX = tRect.left + tRect.width / 2;
  const endY = tRect.top  + tRect.height / 2;

  flyer.style.left = startX + 'px';
  flyer.style.top  = startY + 'px';
  flyer.style.setProperty('--fly-dx', (endX - startX) + 'px');
  flyer.style.setProperty('--fly-dy', (endY - startY) + 'px');

  // 重啟 animation
  flyer.style.animation = 'none';
  void flyer.offsetWidth;
  flyer.style.animation = '';

  // 音效：飛行起飛
  playSFX('flight');

  // 飛抵終點時，evidence panel handle 給予一個「接住」的脈動
  setTimeout(() => {
    playSFX('catch');
    const handle = document.getElementById('evidence-drawer-handle');
    const badge  = document.getElementById('evidence-badge');
    if (handle) {
      handle.classList.remove('catch-pulse');
      void handle.offsetWidth;
      handle.classList.add('catch-pulse');
      setTimeout(() => handle.classList.remove('catch-pulse'), 700);
    }
    if (badge) {
      badge.classList.remove('catch-pulse');
      void badge.offsetWidth;
      badge.classList.add('catch-pulse');
      setTimeout(() => badge.classList.remove('catch-pulse'), 700);
    }
  }, 1100);

  setTimeout(() => { flyer.className = ''; }, 1800);
}

// 線索收集成功時的成就感閃光（紙頁中央金光擴散）
function showCollectCelebration() {
  const card = document.getElementById('closeup-card');
  if (!card) return;
  card.classList.remove('collect-celebrate');
  void card.offsetWidth;
  card.classList.add('collect-celebrate');
  setTimeout(() => card.classList.remove('collect-celebrate'), 900);
}

function closeCloseup() {
  const panel = $('closeup-panel');
  panel.setAttribute('aria-hidden', 'true');
  panel.classList.remove('active');
  resetInferenceUI();
  // 重置入檔儀式
  const ceremony = $('collect-ceremony');
  if (ceremony) {
    ceremony.hidden = true;
    ceremony.classList.remove('show');
  }
}

function updatePuzzleProgress(scene) {
  if (!scene.puzzle) { $('puzzle-progress').textContent = ''; return; }
  const total    = scene.puzzle.targets.length;
  const hit      = scene.puzzle.targets.filter(t => state.puzzleHits.has(t)).length;
  const required = scene.puzzle.requiredCount;
  if (hit < required) {
    $('puzzle-progress').textContent = `${scene.puzzle.title}：已找到 ${hit} / ${required}`;
  } else {
    $('puzzle-progress').textContent = '';
  }
}

function currentScene() {
  return GAME_DATA.scenes[state.sceneQueue[state.sceneIdx]];
}

function updateMissionStatus(scene = currentScene()) {
  // Mission HUD removed — keep function as no-op so call sites stay intact
  return;
  // eslint-disable-next-line no-unreachable
  const box = $('mission-status');
  if (!box || !scene) return;
  const puzzle = scene.puzzle;
  const hit = puzzle ? puzzle.targets.filter(t => state.puzzleHits.has(t)).length : 0;
  const required = puzzle ? puzzle.requiredCount : 0;
  const stages = [
    { key: 'explore', label: '搜證' },
    { key: 'read', label: '判讀' },
    { key: 'argue', label: '辯論' },
    { key: 'note', label: '章末' },
  ];
  const active = state.phase === 'persuade' || state.phase === 'rebuttal'
    ? 'argue'
    : state.phase === 'dialogue' || state.phase === 'decision' || state.phase === 'outcome'
      ? 'read'
      : state.phase === 'feedback'
        ? 'note'
        : 'explore';
  const missionText = active === 'explore' && puzzle
    ? `${puzzle.title}：${Math.min(hit, required)} / ${required}`
    : active === 'argue'
      ? '用已收入的史料回應反對意見'
      : active === 'note'
        ? '整理本章史料，準備章末回顧'
        : '聽取人物立場，準備回應';
  box.innerHTML = `
    <div class="mission-line">
      <span>${escapeHTML(missionText)}</span>
      <em>${escapeHTML(scene.year)} · ${escapeHTML(state.phase === 'explore' ? '探索中' : '進行中')}</em>
    </div>
    <div class="mission-steps">
      ${stages.map(s => `<b class="${s.key === active ? 'active' : ''}">${s.label}</b>`).join('')}
    </div>`;
}

// ══════════════════════════════════════════════════════
// 物件點擊
// ══════════════════════════════════════════════════════
function handleObjectClick(obj, scene) {
  if (state.phase !== 'explore') return;
  if (obj.closeup) {
    openCloseup(obj, scene);
  } else {
    const el = $('scene-objects').querySelector(`[data-id="${obj.id}"]`);
    if (el && el.classList.contains('collected')) return;
    if (el) el.classList.add('collected');
    if (obj.evidence) unlockEvidence(obj.evidence);
    if (obj.isPuzzleTarget) {
      state.puzzleHits.add(obj.id);
      updatePuzzleProgress(scene);
      checkPuzzle(scene);
    }
  }
}

// ══════════════════════════════════════════════════════
// 史料解鎖
// ══════════════════════════════════════════════════════
function unlockEvidence(evidenceId) {
  // 章節層級累積（爭議庭用）
  state.chapterEvidence.add(evidenceId);
  // 跨章累積（成就「線索達人」用）
  const chKey = state.chapterKey;
  if (chKey) {
    if (!state.allEvidenceCollected[chKey]) state.allEvidenceCollected[chKey] = [];
    if (!state.allEvidenceCollected[chKey].includes(evidenceId)) {
      state.allEvidenceCollected[chKey].push(evidenceId);
    }
  }
  if (state.evidenceBank.has(evidenceId)) return;
  state.evidenceBank.add(evidenceId);
  if (window.Analytics) Analytics.clickEvidence(evidenceId, state.sceneId);

  const ev = GAME_DATA.evidence[evidenceId];
  if (!ev) return;

  // 更新角標
  $('evidence-badge').textContent = state.evidenceBank.size;

  // 舊版彈窗已被「入檔儀式」取代，不再使用 #evidence-popup

  // 更新史料列表
  renderEvidencePanel();
}

function renderEvidencePanel() {
  const list = $('evidence-list');
  list.innerHTML = '';
  // 自動摺疊：使用既有 .evidence-collapsed 系統（避免與 line 4803-4828 衝突）
  // 空時自動摺疊，有史料時自動展開
  const panel = $('evidence-panel');
  const game  = $('game-screen');
  const shouldCollapse = state.evidenceBank.size === 0;
  if (panel) panel.classList.toggle('evidence-collapsed', shouldCollapse);
  if (game)  game.classList.toggle('evidence-collapsed', shouldCollapse);
  const groups = [
    { key: 'thought', label: '思想／背景' },
    { key: 'strong',  label: '強兵措施' },
    { key: 'talent',  label: '育才措施' },
    { key: 'rich',    label: '求富措施' },
    { key: 'other',   label: '其他史料' },
  ];
  const grouped = new Map(groups.map(g => [g.key, []]));

  state.evidenceBank.forEach(id => {
    const ev = GAME_DATA.evidence[id];
    if (!ev) return;
    const catKey = categoryKey(ev.category) || 'other';
    const groupKey = grouped.has(catKey) ? catKey : 'other';
    grouped.get(groupKey).push({ id, ev, catKey });
  });

  let archiveIdx = 0;
  groups.forEach(group => {
    const entries = grouped.get(group.key) || [];
    if (!entries.length) return;

    const section = document.createElement('section');
    section.className = `evidence-group cat-${group.key}`;

    const heading = document.createElement('div');
    heading.className = 'evidence-group-title';
    heading.innerHTML = `
      <span><small>${drawerCode(group.key)}</small>${group.label}</span>
      <em>${entries.length}</em>`;
    section.appendChild(heading);

    entries.forEach(({ id, ev, catKey }) => {
      const item = document.createElement('article');
      item.className  = 'evidence-item museum-card' + (catKey ? ' cat-' + catKey : '');
      item.dataset.id = id;
      const archiveId = archiveNumber(archiveIdx, group.key);
      const year = extractEvidenceYear(ev.content);
      archiveIdx++;
      // 博物館典藏卡風格：頂部年份+分類印章 → 標題 → 描述 → 底部蓋章+編號
      const catText = (ev.category || '史料') + (ev.subCategory ? ` · ${ev.subCategory}` : '');
      const obstacleTag = ev.obstacle ? `<span class="mc-cat-obstacle" title="改革阻力史料">⚠ 阻力</span>` : '';
      item.innerHTML  = `
        <header class="mc-head">
          <span class="mc-year">${year}</span>
          <span class="mc-cat-stamp">${catText}</span>
          ${obstacleTag}
        </header>
        <div class="mc-rule"></div>
        <h4 class="mc-title">${ev.name}</h4>
        <p class="mc-content">${shortEvidenceLead(ev.content)}</p>
        <footer class="mc-foot">
          <span class="mc-archive-stamp" aria-hidden="true">已編入館藏</span>
          <span class="mc-id">檔案編號　${archiveId}</span>
        </footer>`;
      section.appendChild(item);
    });

    list.appendChild(section);
  });
}

// ══════════════════════════════════════════════════════
// 謎題判定
// ══════════════════════════════════════════════════════
function checkPuzzle(scene) {
  if (state.puzzleDone) return;
  const puzzle = scene.puzzle;
  if (!puzzle) return;

  // 若有 dramaticMoment，則 puzzle 完成後先放震撼時刻，再進入對白
  const onPuzzleResolved = () => {
    if (scene.dramaticMoment) {
      showDramaticMoment(scene.dramaticMoment, () => startDialogue(scene));
    } else {
      startDialogue(scene);
    }
  };

  if (puzzle.type === 'sequence') {
    // 序列謎題：收集所有物件後才觸發
    const allCollected = scene.objects
      .filter(o => !o.requires)
      .every(o => state.puzzleHits.has(o.id) || $('scene-objects').querySelector(`[data-id="${o.id}"]`)?.classList.contains('collected'));
    if (allCollected) {
      state.puzzleDone = true;
      state.phase = 'puzzle-modal';
      showSequencePuzzle(puzzle, onPuzzleResolved);
    }
    return;
  }

  const hitCount = puzzle.targets.filter(t => state.puzzleHits.has(t)).length;
  if (hitCount >= puzzle.requiredCount) {
    state.puzzleDone = true;
    state.phase = 'puzzle-modal';
    showPuzzleModal(puzzle.title, puzzle.successMessage, onPuzzleResolved);
  }
}

// ══════════════════════════════════════════════════════
// 決策回響：依過往決策延伸後期對白
// ══════════════════════════════════════════════════════
function getDecisionEcho(currentSceneId) {
  const d = state.decisions;
  // === 回響 1：第一章定洋務綱領 → 第二章曾國藩開場感慨 ===
  if (currentSceneId === 's2_2') {
    if (d.s1_3 === 'A') {
      return '⊙當年朝廷議事廳那場議論，奕訢親王最終定下「**師夷長技以制夷**」——器物可學，倫常不動。老夫今日辦這江南製造局，正是循那條路走來的。';
    } else if (d.s1_3 === 'B') {
      return '⊙當年朝廷議事廳那一席議論，奕訢親王本擬走更深層之路——可惜倭仁諸老攔下了。**老夫今日只能在「中體西用」的框架內，盡量做更多事**。';
    }
  }
  // === 回響 2：第二章譯書局規模 → 第三章漢陽鐵廠張之洞感慨 ===
  if (currentSceneId === 's3_3') {
    if (d.s2_2 === 'A') {
      return '⊙傅蘭雅當年若能譯出更多冶金西書，今日這漢陽鐵廠的高爐，或許就不必處處仰賴洋技師了。**那一筆譯書銀子，省得不該。**';
    } else if (d.s2_2 === 'B') {
      return '⊙當年江南譯書局擴大規模那一仗，至今想來慶幸。**漢陽鐵廠的礦冶手冊，多半是當年譯出來的——這就是「百年大計」的回報**。';
    }
  }
  // === 回響 3：第二章留學生政策 → 第四章甲午前李鴻章感慨 ===
  if (currentSceneId === 's4_2') {
    if (d.s2_4 === 'A') {
      return '（停了停）⊙當年廣派留學生的議案，老夫沒堅持。**那些原本可以撐起新海軍的人才——我們只當他們是譯員。**這個錯，今天才看出代價。';
    } else if (d.s2_4 === 'B') {
      return '（看著遠處）⊙當年廣派留學生那一筆銀子，今天看來，是這三十年最對的一個決定。**詹天佑、唐紹儀——他們是少數老夫沒辜負的種子。**';
    }
  }
  // === 回響 4：第三章招商局態度 → 第四章軍費被挪用李鴻章自省 ===
  if (currentSceneId === 's4_2' && d.s3_1) {
    let echo = '';
    if (d.s3_1 === 'A') {
      echo = '⊙當年招商局走「官督商辦」的舊路，至今商辦難進。**若當年放手由商人主導，或許今日北洋軍費，不必全靠朝廷一隻手**。';
    } else if (d.s3_1 === 'B') {
      echo = '⊙當年硬推招商局純商辦那一仗，至今想來——若洋務全循此路，**今日北洋的命運，或許不必繫於慈禧一念之間**。';
    }
    return echo;
  }
  // === 回響 5：第三章電報鐵路 → 第四章甲午戰時通訊感慨 ===
  if (currentSceneId === 's4_3' && d.s3_2 === 'B') {
    // 只在「電報軍民兩用」決策下，第四章特別感慨
    // 注意：這段會與下方 s4_3 既有回響合併
  }
  // === 回響 2：同文館天文算學科 → 甲午海戰指揮室李鴻章戰後回顧 ===
  if (currentSceneId === 's4_3') {
    let extra = '';
    if (d.s4_1 === 'A') {
      extra += '⊙\n當年同文館的算學科，老夫沒推。**多少年後才明白——一支看不懂炮術圖、算不清彈道的艦隊，再多鐵甲也沒用。**';
    } else if (d.s4_1 === 'B') {
      extra += '⊙\n當年硬推同文館算學科那一仗，倭仁罵了老夫半生。但今日這支艦隊——他們算得出彈道，看得懂洋圖。**這已是老夫能留下的，最後一點底氣。**';
    }
    // === 回響 3：軍費挪用態度 → 甲午海戰指揮室戰後回顧 ===
    if (d.s4_2 === 'A') {
      extra += '⊙\n（沉默）⊙\n那年三千萬軍費被挪去修頤和園，老夫沒上摺。**今天看丁汝昌的遺書——這份沉默，是老夫一輩子洗不掉的。**';
    } else if (d.s4_2 === 'B') {
      extra += '⊙\n（沉默）⊙\n那年老夫上了摺，換來一個月的冷遇。**今日看來，那道摺子救不了北洋——但救了老夫自己一點良心。**';
    }
    return extra || null;
  }
  return null;
}

// ══════════════════════════════════════════════════════
// 震撼時刻 Overlay（時機 Y：探索完成後、決策前）
// ══════════════════════════════════════════════════════
function showDramaticMoment(dm, onDone) {
  $('dm-date').textContent     = dm.date  || '';
  $('dm-place').textContent    = dm.place || '';
  $('dm-signoff').textContent  = dm.signoff || '';

  // 構造遺書段落（每行一個 <p>，逐行淡入）
  const letterEl = $('dm-letter');
  letterEl.innerHTML = '';
  (dm.letter || []).forEach(line => {
    const p = document.createElement('p');
    // 套用 **bold** 解析
    p.innerHTML = String(line).replace(/\*\*([^*]+)\*\*/g, '<strong style="color:var(--gold-light)">$1</strong>');
    letterEl.appendChild(p);
  });

  const overlay = $('dramatic-moment');
  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
  // 沉船音效（甲午黃海震撼時刻）
  setTimeout(() => playSFX('dramatic'), 400);

  const continueBtn = $('dm-continue');
  // 確保只綁定一次
  const handler = () => {
    continueBtn.removeEventListener('click', handler);
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    if (onDone) onDone();
  };
  continueBtn.addEventListener('click', handler);
}

function showSequencePuzzle(puzzle, onSuccess) {
  $('puzzle-title').textContent = puzzle.title;
  $('puzzle-description').textContent = puzzle.description || '請將以下事件按先後次序排列：';
  $('puzzle-status').textContent = '';

  const area = $('puzzle-area');
  area.innerHTML = '';

  // 洗牌顯示
  let items = [...puzzle.items].map(o => ({ ...o }))
    .sort(() => Math.random() - 0.5);

  let selected = null;

  const renderItems = () => {
    area.innerHTML = '';
    items.forEach((item, idx) => {
      const btn = document.createElement('div');
      btn.className = 'seq-item' + (selected === idx ? ' seq-selected' : '');
      btn.innerHTML = `<span class="seq-num">${idx + 1}</span><span class="seq-label">${item.label}</span>`;
      btn.addEventListener('click', () => {
        if (selected === null) {
          selected = idx;
        } else if (selected === idx) {
          selected = null;
        } else {
          // 互換
          [items[selected], items[idx]] = [items[idx], items[selected]];
          selected = null;
        }
        renderItems();
      });
      area.appendChild(btn);
    });

    const hint = document.createElement('p');
    hint.className = 'seq-hint';
    hint.textContent = '點擊兩個項目互換位置';
    area.appendChild(hint);

    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'puzzle-close-btn';
    confirmBtn.textContent = '確認排序';
    confirmBtn.addEventListener('click', () => checkSequenceAnswer(items, puzzle, onSuccess));
    area.appendChild(confirmBtn);
  };
  renderItems();
  $('puzzle-modal').classList.add('active');
}

function checkSequenceAnswer(items, puzzle, onSuccess) {
  const correctOrder = [...puzzle.items].sort((a, b) => a.order - b.order).map(i => i.id);
  const playerOrder  = items.map(i => i.id);
  const isCorrect    = correctOrder.every((id, i) => id === playerOrder[i]);

  const status = $('puzzle-status');
  if (isCorrect) {
    status.textContent = '';
    $('puzzle-modal').classList.remove('active');
    showPuzzleModal(puzzle.title, puzzle.successMessage, onSuccess);
  } else {
    status.textContent = '次序有誤，請再試。提示：留意年份先後。';
    status.className = 'seq-error';
    setTimeout(() => { status.textContent = ''; status.className = ''; }, 2000);
  }
}

function showPuzzleModal(title, message, onClose) {
  $('puzzle-title').textContent       = title;
  $('puzzle-description').textContent = '';
  $('puzzle-area').innerHTML          = `<p class="puzzle-success">${message}</p>`;
  $('puzzle-status').textContent      = '';

  const closeBtn = document.createElement('button');
  closeBtn.className   = 'puzzle-close-btn';
  closeBtn.textContent = '繼續';
  closeBtn.addEventListener('click', () => {
    $('puzzle-modal').classList.remove('active');
    if (onClose) onClose();
  });
  $('puzzle-area').appendChild(closeBtn);
  $('puzzle-modal').classList.add('active');
}

// ══════════════════════════════════════════════════════
// 對白系統
// ══════════════════════════════════════════════════════
function setDialogue(speaker, text, showContinue) {
  $('dialogue-speaker').textContent = speaker || '';
  setPortrait(speaker);
  $('dialogue-choices').innerHTML   = '';
  $('dialogue-continue').style.display = showContinue ? 'block' : 'none';
  continueCallback = null;

  typeText($('dialogue-text'), text, 28);
}

// ── 富文本 typewriter（支援 **金句** 與 ⊙ 停頓）───────
function parseRichText(text) {
  const tokens = [];
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (c === '⊙') { tokens.push({ type: 'pause' }); i++; continue; }
    if (text.slice(i, i + 2) === '**') {
      const end = text.indexOf('**', i + 2);
      if (end !== -1) {
        for (const k of text.slice(i + 2, end)) tokens.push({ type: 'char', value: k, bold: true });
        i = end + 2; continue;
      }
    }
    tokens.push({ type: 'char', value: c });
    i++;
  }
  return tokens;
}
function escapeHTML(s) {
  return s.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}
function renderTokens(tokens, upTo) {
  let html = ''; let inBold = false;
  for (let j = 0; j < upTo; j++) {
    const t = tokens[j];
    if (t.type !== 'char') continue;
    if (t.bold && !inBold) { html += '<strong class="key-quote">'; inBold = true; }
    if (!t.bold && inBold) { html += '</strong>'; inBold = false; }
    html += escapeHTML(t.value);
  }
  if (inBold) html += '</strong>';
  return html;
}

function typeText(el, text, speed) {
  // 一次性顯示（取消打字機效果，避免 lag 感）
  // 保留 parseRichText/renderTokens 處理 **金句** 與 ⊙ 停頓符號的渲染
  if (typingTimer) { clearTimeout(typingTimer); typingTimer = null; }
  typingFullText = text;
  const tokens = parseRichText(text);
  el.innerHTML = renderTokens(tokens, tokens.length);
  $('dialogue-continue').classList.remove('pulsing');
  maybePulseContinue();
}

function skipTyping() {
  if (!typingTimer) return;
  clearTimeout(typingTimer);
  typingTimer = null;
  const tokens = parseRichText(typingFullText);
  $('dialogue-text').innerHTML = renderTokens(tokens, tokens.length);
  maybePulseContinue();
}

// 打字結束時，若繼續按鈕可見，觸發脈動引導
function maybePulseContinue() {
  const btn = $('dialogue-continue');
  if (btn && getComputedStyle(btn).display !== 'none') {
    btn.classList.add('pulsing');
  }
}

function setContinue(cb) {
  continueCallback = cb;
  $('dialogue-continue').style.display = 'block';
}

function setPhaseIndicator(label) {
  $('phase-indicator').textContent = label || '';
}

// ══════════════════════════════════════════════════════
// 階段：對白
// ══════════════════════════════════════════════════════
function startDialogue(scene) {
  state.phase = 'dialogue';
  setPhaseIndicator('對白');
  // 進入對白：收起場景字幕，展開對白區
  setSceneSubtitle('');
  setDialogueCollapsed(false);
  // 對白開始時自動收起史料庫，避免遮蓋對話框（portrait 模式）
  const _ep = $('evidence-panel');
  const _gs = $('game-screen');
  if (_ep && !_ep.classList.contains('evidence-collapsed')) {
    _ep.classList.add('evidence-collapsed');
    if (_gs) _gs.classList.add('evidence-collapsed');
  }
  updateMissionStatus(scene);
  const dl = scene.dialogue;

  // 停止任何計時
  if (typingTimer) clearTimeout(typingTimer);
  typingTimer = null;

  $('dialogue-speaker').textContent = dl.speaker || '';
  setPortrait(dl.speaker);
  const dialogueArea = $('dialogue-area');
  if (dialogueArea) {
    dialogueArea.classList.remove('speaker-cut');
    void dialogueArea.offsetWidth;
    dialogueArea.classList.add('speaker-cut');
  }
  $('dialogue-choices').innerHTML   = '';
  $('dialogue-continue').style.display = 'block';

  // 決策回響：依過往決策延伸對白末尾
  const sceneId = state.sceneQueue[state.sceneIdx];
  let dialogueText = dl.text;
  const echoText = getDecisionEcho(sceneId);
  if (echoText) dialogueText = dialogueText + '⊙\n' + echoText;

  // 重要歷史人物：播放 AI 配音首句
  playVoice(sceneId);

  // 按 ⊙\n 自動拆段，每段 ≤ 80 字元（避免對白區裁切）
  const segments = splitDialogueIntoSegments(dialogueText, 80);

  let segIdx = 0;
  const showSegment = () => {
    typeText($('dialogue-text'), segments[segIdx], 30);
    setContinue(() => {
      segIdx++;
      if (segIdx < segments.length) {
        showSegment();
      } else {
        stopVoice();
        showDecision(scene);
      }
    });
  };
  showSegment();
}

// 將長對白按 ⊙\n 自然斷點切分成短段（每段 ≤ maxChars，避免對白區 overflow:hidden 裁切）
function splitDialogueIntoSegments(text, maxChars) {
  if (!text) return [''];
  if (text.length <= maxChars) return [text];
  const beats = text.split('⊙\n');
  const segments = [];
  let current = '';
  for (const beat of beats) {
    const candidate = current ? current + '⊙\n' + beat : beat;
    if (candidate.length > maxChars && current) {
      segments.push(current);
      current = beat;
    } else {
      current = candidate;
    }
  }
  if (current) segments.push(current);
  return segments;
}

// ══════════════════════════════════════════════════════
// 階段：決策
// ══════════════════════════════════════════════════════
function showDecision(scene) {
  state.phase = 'decision';
  setPhaseIndicator('進諫');
  updateMissionStatus(scene);
  const dec = scene.decision;

  if (typingTimer) { clearTimeout(typingTimer); typingTimer = null; }
  $('dialogue-speaker').textContent        = '你向重臣進言';
  setPortrait('');
  $('dialogue-text').textContent           = dec.prompt;
  $('dialogue-continue').style.display     = 'none';
  continueCallback = null;

  // 進入決策階段時，撐高對白區避免選項被裁切
  $('dialogue-area').classList.add('decision-expand');

  const choices = $('dialogue-choices');
  choices.innerHTML = '';

  // 指引標題
  const label = document.createElement('div');
  label.className   = 'choices-label';
  label.textContent = '你的進諫';
  choices.appendChild(label);

  const mkBtn = (text, cls, handler) => {
    const btn = document.createElement('button');
    btn.className   = `dialogue-choice ${cls}`;
    btn.textContent = text;
    btn.addEventListener('click', handler);
    choices.appendChild(btn);
  };

  mkBtn(dec.choiceA, 'choice-a', () => handleDecision('A', scene));
  mkBtn(dec.choiceB, 'choice-b', () => handleDecision('B', scene));
}

function handleDecision(choice, scene) {
  const key = state.sceneQueue[state.sceneIdx];
  state.decisions[key] = choice;
  // 決策完成後恢復對白區高度
  $('dialogue-area').classList.remove('decision-expand');
  triggerDecisionFeedback(choice, scene);
  showOutcome(choice, scene);
}

function showOutcome(choice, scene) {
  const dec = scene.decision;
  const outcomeText = choice === 'A' ? dec.outcomeA : dec.outcomeB;
  if (!outcomeText) {
    showRebuttal(scene);
    return;
  }
  state.phase = 'outcome';
  setPhaseIndicator('回響');
  updateMissionStatus(scene);
  $('dialogue-speaker').textContent = '旁白';
  setPortrait('');
  $('dialogue-choices').innerHTML   = '';
  typeText($('dialogue-text'), outcomeText, 26);
  setContinue(() => showRebuttal(scene));
}

function triggerDecisionFeedback(choice, scene) {
  // 全螢幕短暫色閃 overlay
  const overlay = document.createElement('div');
  overlay.className = `decision-flash-overlay decision-flash-${choice.toLowerCase()}`;
  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 800);

  // 時間軸標記永久標記 + 一次性脈動
  const marker = document.querySelector(`.timeline-marker[data-year="${scene.year}"]`);
  if (marker) {
    marker.classList.add('decided', `decided-${choice.toLowerCase()}`);
    marker.classList.remove('just-decided');
    void marker.offsetWidth;
    marker.classList.add('just-decided');
    setTimeout(() => marker.classList.remove('just-decided'), 800);
  }
}

// ══════════════════════════════════════════════════════
// 階段：反駁
// ══════════════════════════════════════════════════════
function showRebuttal(scene) {
  state.phase = 'rebuttal';
  setPhaseIndicator('歷史人物反駁');
  updateMissionStatus(scene);

  // rebuttal can be at scene level or nested inside decision (s1_1)
  const rebuttal = scene.rebuttal || (scene.decision && scene.decision.rebuttal);
  if (!rebuttal) { showPersuasion(scene); return; }

  $('dialogue-speaker').textContent    = rebuttal.speaker || '';
  setPortrait(rebuttal.speaker);
  $('dialogue-choices').innerHTML      = '';
  typeText($('dialogue-text'), rebuttal.text, 28);
  setContinue(() => showPersuasion(scene));
}

// ══════════════════════════════════════════════════════
// 階段：說服
// ══════════════════════════════════════════════════════
function showPersuasion(scene) {
  state.phase = 'persuade';
  setPhaseIndicator('援引卷宗');
  updateMissionStatus(scene);

  const persuasion = scene.persuasion || (scene.decision && scene.decision.persuasion) || [];

  // 過濾：條件式 + 玩家擁有 evidence
  // 單選模式：不再依使用過濾（每場只能選一次，選後直接結束）
  let available = persuasion
    .filter(p => meetsRequires(p))
    .filter(p => state.evidenceBank.has(p.evidence));

  // 全無可用：直接進入 feedback
  if (available.length === 0) {
    $('dialogue-speaker').textContent = '旁白';
    setPortrait('旁白');
    $('dialogue-choices').innerHTML   = '';
    typeText($('dialogue-text'),
      '你暫無可用的卷宗援引……此次爭辯只能作罷。');
    setContinue(() => showFeedback(scene));
    return;
  }

  $('dialogue-speaker').textContent = '';
  setPortrait('');
  if (typingTimer) { clearTimeout(typingTimer); typingTimer = null; }
  $('dialogue-text').textContent = '從你蒐集的卷宗中，**選一件最有力的**援引以駁對方：';
  $('dialogue-continue').style.display = 'none';
  continueCallback = null;

  const choices = $('dialogue-choices');
  choices.innerHTML = '';

  available.forEach(p => {
    const ev = GAME_DATA.evidence[p.evidence];
    if (!ev) return;
    const btn = document.createElement('button');
    btn.className = 'dialogue-choice evidence-choice';
    btn.textContent = ev.name;
    btn.addEventListener('click', () => usePersuasion(p, scene));
    choices.appendChild(btn);
  });
  // 註：移除「保持沉默」與「結束辯論」按鈕——玩家必須選一件
}

function usePersuasion(entry, scene) {
  persuasionUsedEvidences.add(entry.evidence);
  if (window.Analytics) {
    const ev = GAME_DATA.evidence[entry.evidence];
    Analytics.persuasionChoice(state.sceneId, entry.evidence, ev?.argument?.id || ev?.aspect || null, entry.strength || null);
  }
  $('dialogue-choices').innerHTML = '';

  // weak 條目：先顯示反駁，按繼續才顯示反思 → 直接進 feedback
  if (entry.strength === 'weak' && entry.rebuttal) {
    const speaker = entry.rebuttalSpeaker || '旁白';
    $('dialogue-speaker').textContent = speaker;
    setPortrait(speaker);
    typeText($('dialogue-text'), entry.rebuttal, 28);
    setContinue(() => {
      $('dialogue-speaker').textContent = '';
      setPortrait('');
      typeText($('dialogue-text'), entry.response, 28);
      setContinue(() => showFeedback(scene));   // 單選後直接結束爭辯
    });
    return;
  }

  $('dialogue-speaker').textContent = '';
  setPortrait('');
  typeText($('dialogue-text'), entry.response, 28);
  setContinue(() => showFeedback(scene));        // 單選後直接結束爭辯
}

// 組合論據：高額點數 + 特殊回應
function useCombo(combo, scene) {
  const key = combo.label || JSON.stringify(combo.requires);
  persuasionUsedCombos.add(key);
  // 同時標記組合內單件，避免重覆使用
  if (Array.isArray(combo.requires)) {
    combo.requires.forEach(ev => persuasionUsedEvidences.add(ev));
  }
  $('dialogue-choices').innerHTML   = '';
  $('dialogue-speaker').textContent = '';
  setPortrait('');
  typeText($('dialogue-text'), combo.response, 28);
  setContinue(() => showPersuasion(scene));        // 返回辯論選單
}

// ══════════════════════════════════════════════════════
// 階段：回饋
// ══════════════════════════════════════════════════════
function showFeedback(scene) {
  state.phase = 'feedback';
  setPhaseIndicator('');
  updateMissionStatus(scene);

  // 旁白語氣依「玩家在此場景的決策」決定（非積分制，純敘事）
  const choice = state.decisions[state.sceneQueue[state.sceneIdx]];
  const text = choice === 'B'
    ? '你已盡力推動更深的變革。然而朝廷的車輪，從來不為一人而轉……'
    : '這一切，將在日後的歲月中慢慢發酵，造就更深重的危機。';

  $('dialogue-speaker').textContent = '旁白';
  setPortrait('旁白');
  $('dialogue-choices').innerHTML   = '';
  typeText($('dialogue-text'), text, 28);
  setContinue(() => advanceScene());
}

// ══════════════════════════════════════════════════════
// 推進場景 / 章節
// ══════════════════════════════════════════════════════
function advanceScene() {
  state.sceneIdx++;
  if (state.sceneIdx < state.sceneQueue.length) {
    renderScene(state.sceneQueue[state.sceneIdx]);
  } else {
    showChapterQuiz();
  }
}

// ══════════════════════════════════════════════════════
// 章末活動輪換規則 — 每章最多一個練習活動
// Ch1: 輕量結尾（僅 quiz + 筆記）— 學生剛入門，避免立即測驗轟炸
// Ch2: 速答閃卡 — 鞏固「強兵」階段關鍵史實
// Ch3: 文憑試工作台 — 練習「求富」論證結構
// Ch4: 輕量結尾（僅 quiz + 筆記）— 直入結局，保留情感衝擊
// ══════════════════════════════════════════════════════
// 所有章節統一使用奏摺工作坊（取代原速答／工作台輪換）
const CHAPTER_ACTIVITY = {
  chapter1: 'memorial',
  chapter2: 'memorial',
  chapter3: 'memorial',
  chapter4: 'memorial',
};

// 章節歷史回響：玩家奏摺呈上後，揭示歷史上類似奏摺的真實結局
const CHAPTER_HISTORY_ECHO = {
  chapter1: '歷史上，魏源《海國圖志》在中國反應冷淡，發行不過千本，反在日本翻印二十餘版，成為明治維新的思想養分。馮桂芬《校邠盧抗議》亦壓於書箱，直至光緒帝戊戌變法時才被重新提起。你此刻所寫的奏摺，恐怕亦難逃同樣命運——天朝積習，非一紙文書所能撼動。',
  chapter2: '歷史上，曾國藩、李鴻章奏設江南製造局、招商局，雖獲准辦理，但每每受戶部刁難、地方掣肘。容閎留學生計劃推行十年即被守舊派叫停，全部召回。你的奏摺即使呈上，亦只能在「中體西用」的框架內爭得些許空間——體之不變，用之難張。',
  chapter3: '歷史上，李鴻章為北洋海軍奏請軍費，多次被慈禧以「修頤和園」之名挪走。張之洞辦漢陽鐵廠，朝廷只給開辦費而無維持費。求富之路，每步皆受制於「政出多門」與「皇權無制衡」。你的奏摺，亦難跳出此一結構性困局。',
  chapter4: '歷史上，黃海海戰前後，李鴻章奏摺如雪片般送入紫禁城，警告日本擴軍、籲請增撥軍費——皆石沉大海。戰敗之後，朝中言官反而群起彈劾李鴻章「養寇自重」。你此刻寫下的奏摺，或許就是李文忠公一生「裱糊匠」生涯的最後註腳——盡其在我，無愧於史。'
};

// ══════════════════════════════════════════════════════
// 章末：奏摺工作坊（取代原章末問答）
// ══════════════════════════════════════════════════════
function showChapterQuiz() {
  const ch = GAME_DATA[state.chapterKey];
  $('quiz-chapter-title').textContent = ch.quiz.title;
  $('quiz-question').textContent      = ch.quiz.question;

  // 啟動奏摺工作坊（取代舊速答／工作台）
  renderMemorialWorkshop(ch);

  showScreen('quiz-screen');
  const quiz = $('quiz-screen');
  quiz.classList.remove('study-card-enter');
  void quiz.offsetWidth;
  quiz.classList.add('study-card-enter');
}

// ══════════════════════════════════════════════════════
// 奏摺工作坊 — 四階段論點建構
// ══════════════════════════════════════════════════════
let _wsState = null;
function renderMemorialWorkshop(ch) {
  // 首次進入工作坊：onboarding
  setTimeout(() => showOnboardingTip('first_workshop',
    '**奏摺工作坊**：將你蒐集的卷宗整理成奏摺。每個面向選一件最有力的，方能構成完整論證。', '📜'), 800);
  // 重置狀態
  _wsState = {
    selectedByAspect: new Map(), // label → evId（每個面向只能選一件）
    chapterKey: state.chapterKey,
    ch,
    aspects: [],
    requiredAspectCount: 0,
  };
  // 重置 UI
  $('memorial-workshop').style.display = '';
  ['1','2','3','4'].forEach(n => {
    const el = $('ws-phase-' + n);
    if (el) el.hidden = (n !== '1');
  });
  document.querySelectorAll('.ws-step').forEach(s => {
    s.classList.toggle('active', s.dataset.step === '1');
    s.classList.remove('done');
  });

  // 依據 inferEvidenceArgument 取得 point.label 做為面向分組
  // 過濾 workshopExclude 的卷宗（例如第 3 章武備學堂的軍事卷宗，內容不貼合該章「求富」主題）
  const collected = Array.from(state.chapterEvidence || []).filter(eid => {
    const ev = GAME_DATA.evidence[eid];
    return !ev?.workshopExclude;
  });
  if (collected.length === 0) {
    $('ws-evidence-grid').innerHTML = '<p class="ws-empty">本章未蒐集任何卷宗——工作坊無法啟動。</p>';
    $('ws-to-phase-2').disabled = true;
    return;
  }

  const aspectMap = new Map(); // label → [{ evId, ev, point }]
  const unassigned = [];
  collected.forEach(evId => {
    const ev = GAME_DATA.evidence[evId];
    if (!ev) return;
    const point = inferEvidenceArgument(evId, ev, state.chapterKey);
    if (!point) {
      unassigned.push({ evId, ev });
      return;
    }
    const label = point.label || '其他';
    if (!aspectMap.has(label)) aspectMap.set(label, []);
    aspectMap.get(label).push({ evId, ev, point });
  });

  // 若有未分類卷宗，歸入「其他史料」
  if (unassigned.length > 0) {
    aspectMap.set('其他史料', unassigned);
  }

  // 容錯：3 個面向 → 各選 1；2 個面向 → 各選 1（共 2 件）
  const aspectCount = aspectMap.size;
  const requiredCount = Math.min(3, aspectCount);
  _wsState.aspects = Array.from(aspectMap.keys());
  _wsState.requiredAspectCount = requiredCount;

  // 更新指引文字
  $('ws-instruction').innerHTML = aspectCount >= 3
    ? `要寫好一份奏摺，臣不可只說一面之詞。<br>請從以下 <strong>${requiredCount}</strong> 個面向，<strong>各選一件最具說服力的卷宗</strong>，方能構成完整論證。`
    : aspectCount === 2
      ? `你蒐集到 ${aspectCount} 個面向的卷宗。<br>請從這 <strong>${requiredCount}</strong> 個面向中，<strong>各選一件最具說服力的卷宗</strong>。<br><em>（多蒐集一個面向的卷宗，論證會更完整）</em>`
      : `你只蒐集到 ${aspectCount} 個面向的卷宗——論證將略嫌單薄。<br>請選一件最具說服力的卷宗。`;

  // 渲染分組
  const grid = $('ws-evidence-grid');
  grid.innerHTML = '';
  let aspectIdx = 0;
  aspectMap.forEach((entries, label) => {
    const section = document.createElement('section');
    section.className = 'ws-aspect-section';
    section.dataset.aspect = label;
    const CN_NUMS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    const aspectNum = CN_NUMS[aspectIdx] || String(aspectIdx + 1);
    section.innerHTML = `
      <header class="ws-aspect-head">
        <span class="ws-aspect-num">面向${aspectNum}</span>
        <h4 class="ws-aspect-label">${label}</h4>
        <span class="ws-aspect-status" data-aspect-status="${label}">未選</span>
      </header>
      <div class="ws-aspect-cards"></div>`;
    const cardsContainer = section.querySelector('.ws-aspect-cards');
    entries.forEach(({ evId, ev }) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'ws-ev-card';
      card.dataset.id = evId;
      card.dataset.aspect = label;
      const wsCatText = (ev.category || '史料') + (ev.subCategory ? ` · ${ev.subCategory}` : '');
      card.innerHTML = `
        <span class="ws-ev-cat">${wsCatText}</span>
        <strong class="ws-ev-name">${ev.name}</strong>
        <span class="ws-ev-lead">${shortEvidenceLead(ev.content)}</span>`;
      card.addEventListener('click', () => wsSelectInAspect(label, evId));
      cardsContainer.appendChild(card);
    });
    grid.appendChild(section);
    aspectIdx++;
  });

  wsUpdateSelection();

  // 綁定階段切換按鈕
  $('ws-to-phase-2').onclick = () => wsGotoPhase(2);
  $('ws-to-phase-3').onclick = () => wsGotoPhase(3);
  $('ws-to-phase-4').onclick = () => wsGotoPhase(4);

  // 列印 / PDF 匯出按鈕（瀏覽器內建 print，選「儲存為 PDF」即可）
  const printBtn = $('ws-print-memorial');
  if (printBtn) printBtn.onclick = () => {
    playSFX('click');
    checkAchievements('memorial_printed');
    window.print();
  };
}

// 在某面向內選取一件卷宗（同面向內可切換，不同面向各自獨立）
function wsSelectInAspect(aspectLabel, evId) {
  if (_wsState.selectedByAspect.get(aspectLabel) === evId) {
    // 點同一件 → 取消
    _wsState.selectedByAspect.delete(aspectLabel);
  } else {
    // 切換到新選擇（取代舊的）
    _wsState.selectedByAspect.set(aspectLabel, evId);
  }
  wsUpdateSelection();
}

function wsGetOrderedSelectedIds() {
  // 依面向順序回傳 evId list
  return _wsState.aspects
    .map(label => _wsState.selectedByAspect.get(label))
    .filter(Boolean);
}

function wsUpdateSelection() {
  const orderedIds = wsGetOrderedSelectedIds();
  const filledAspects = _wsState.selectedByAspect.size;
  const required = _wsState.requiredAspectCount;

  // 更新計數
  $('ws-selected-count').textContent = `${filledAspects} / ${required}`;

  // 更新每張卡片的 selected 狀態
  document.querySelectorAll('.ws-ev-card').forEach(c => {
    const aspect = c.dataset.aspect;
    const evId   = c.dataset.id;
    c.classList.toggle('selected', _wsState.selectedByAspect.get(aspect) === evId);
  });

  // 更新每個面向的狀態提示
  document.querySelectorAll('[data-aspect-status]').forEach(el => {
    const aspect = el.dataset.aspectStatus;
    const filled = _wsState.selectedByAspect.has(aspect);
    el.textContent = filled ? '✓ 已選' : '未選';
    el.classList.toggle('filled', filled);
  });

  // 更新已選 chips
  const chipsEl = $('ws-selected-chips');
  chipsEl.innerHTML = '';
  orderedIds.forEach((id, idx) => {
    const ev = GAME_DATA.evidence[id];
    const chip = document.createElement('span');
    chip.className = 'ws-chip';
    const CN_BIG = ['壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖', '拾'];
    const chipNum = CN_BIG[idx] || String(idx + 1);
    chip.innerHTML = `<span class="ws-chip-num">${chipNum}</span>${ev?.name || id}`;
    chipsEl.appendChild(chip);
  });

  // 是否可進入下一階段：所有必要面向都已涵蓋
  $('ws-to-phase-2').disabled = filledAspects < required;
}

function wsGotoPhase(phase) {
  if (window.Analytics) Analytics.workshopPhase(_wsState.chapterKey, phase);
  ['1','2','3','4'].forEach(n => {
    const el = $('ws-phase-' + n);
    if (el) el.hidden = (n !== String(phase));
  });
  document.querySelectorAll('.ws-step').forEach(s => {
    const n = parseInt(s.dataset.step, 10);
    s.classList.toggle('active', n === phase);
    s.classList.toggle('done', n < phase);
  });
  if (phase === 2) wsRenderArguments();
  if (phase === 3) wsRenderMemorial();
  if (phase === 4) {
    // 進入「歷史回響」即代表奏摺已呈交——保存到 state.memorials
    const selectedIds = wsGetOrderedSelectedIds();
    state.memorials[_wsState.chapterKey] = selectedIds;
    saveProgress();
    wsRenderVerdict();
    // analytics: 完成工作坊（含選擇與 aspect 覆蓋）
    if (window.Analytics) {
      const aspectsUsed = [...new Set(selectedIds
        .map(id => GAME_DATA.evidence[id]?.argument?.id)
        .filter(Boolean))];
      Analytics.workshopComplete(_wsState.chapterKey, selectedIds, aspectsUsed, selectedIds.length);
    }
    // 成就觸發
    checkAchievements('memorial_complete');
  }
  // 滾到頂部
  document.querySelector('.quiz-scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
}

function wsRenderArguments() {
  const container = $('ws-arguments');
  container.innerHTML = '';
  wsGetOrderedSelectedIds().forEach((id, idx) => {
    const ev = GAME_DATA.evidence[id];
    if (!ev) return;
    const point = inferEvidenceArgument(id, ev, _wsState.chapterKey);
    const sentence = point ? buildArgumentSentence(point, _wsState.chapterKey) : '臣以為，此卷可資佐證。';
    const div = document.createElement('article');
    div.className = 'ws-argument';
    div.innerHTML = `
      <div class="ws-arg-num">論點 ${(['壹','貳','參','肆','伍','陸','柒','捌','玖','拾'])[idx] || (idx + 1)}</div>
      <div class="ws-arg-body">
        <p class="ws-arg-source">依據　《${ev.name}》</p>
        <p class="ws-arg-text">${sentence}</p>
        ${point ? `<p class="ws-arg-label">所反映：<strong>${point.label}</strong></p>` : ''}
      </div>`;
    container.appendChild(div);
  });
}

function wsRenderMemorial() {
  const el = $('ws-memorial-content');
  const ch = _wsState.ch;
  const args = wsGetOrderedSelectedIds().map(id => {
    const ev = GAME_DATA.evidence[id];
    if (!ev) return null;
    const point = inferEvidenceArgument(id, ev, _wsState.chapterKey);
    const sentence = point ? buildArgumentSentence(point, _wsState.chapterKey) : '';
    return { ev, sentence };
  }).filter(Boolean);

  const memorialHtml = `
    <div class="ws-mem-head">
      <span class="ws-mem-seal">奏</span>
      <h4>臣自沿海書記，謹奏為時局事</h4>
    </div>
    <p class="ws-mem-question">所議　：${ch.quiz.question}</p>
    <p class="ws-mem-opening">伏察今日時局——臣自隨諸公巡視，蒐集卷宗，得三事可呈御覽：</p>
    ${args.map((a, i) => `
      <p class="ws-mem-arg">
        <span class="ws-mem-num">其${(['一','二','三','四','五','六','七','八','九','十'])[i] || (i + 1)}</span>
        ${a.sentence}
        <span class="ws-mem-cite">（據《${a.ev.name}》一卷）</span>
      </p>`).join('')}
    <p class="ws-mem-closing">以此三事為據，臣之愚見已具。是否可採，伏乞睿鑒。</p>
    <div class="ws-mem-foot">
      <span>沿海書記　${_wsState.ch.title || ''}</span>
    </div>`;
  el.innerHTML = memorialHtml;
}

function wsRenderVerdict() {
  // DSE 評分要點
  const dsePoints = $('ws-dse-points');
  dsePoints.innerHTML = '';
  (_wsState.ch.quiz.keyPoints || []).forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'ws-dse-point';
    div.innerHTML = `<span class="ws-dse-num">${i + 1}</span><span>${p}</span>`;
    dsePoints.appendChild(div);
  });

  // 歷史回響
  $('ws-history-echo').textContent = CHAPTER_HISTORY_ECHO[_wsState.chapterKey] || '';
}

function renderDseWorkbench(ch) {
  const root = $('dse-workbench');
  if (!root) return;

  const points = (ch.quiz?.keyPoints || []).slice(0, 5);
  const collected = Array.from(state.chapterEvidence || [])
    .map(id => ({ id, ev: GAME_DATA.evidence[id] }))
    .filter(x => x.ev)
    .slice(0, 6);

  const pointButtons = points.map((point, i) => `
    <button class="dse-build-chip" data-build-point="${i}">
      <span>論點 ${i + 1}</span>${escapeHTML(extractDsePoint(point))}
    </button>
  `).join('');

  const evidenceButtons = collected.length ? collected.map(({ id, ev }, i) => `
    <button class="dse-build-chip evidence-chip" data-build-evidence="${escapeHTML(id)}">
      <span>史料 ${i + 1}</span>${escapeHTML(ev.name)}
    </button>
  `).join('') : '<p class="dse-empty">本章尚未收集到足夠史料，先以章末評分要點練習組句。</p>';

  root.innerHTML = `
    <section class="dse-workbench">
      <div class="dse-workbench-head">
        <span>文憑試答題工作台</span>
        <h3>用史料組成一段答案</h3>
      </div>
      <div class="dse-build-grid">
        <div>
          <h4>選論點</h4>
          <div class="dse-chip-list">${pointButtons}</div>
        </div>
        <div>
          <h4>選史料</h4>
          <div class="dse-chip-list">${evidenceButtons}</div>
        </div>
      </div>
      <div class="dse-answer-preview" id="dse-answer-preview">
        <span>答案預覽</span>
        <p>先選一個論點，再選一件史料，系統會組成「論點－史實－解釋－扣題」句式。</p>
      </div>
    </section>`;

  const selected = { point: null, evidence: null };
  root.querySelectorAll('[data-build-point]').forEach(btn => {
    btn.addEventListener('click', () => {
      root.querySelectorAll('[data-build-point]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selected.point = Number(btn.dataset.buildPoint);
      updateDsePreview(ch, selected);
    });
  });
  root.querySelectorAll('[data-build-evidence]').forEach(btn => {
    btn.addEventListener('click', () => {
      root.querySelectorAll('[data-build-evidence]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selected.evidence = btn.dataset.buildEvidence;
      updateDsePreview(ch, selected);
    });
  });
}

function updateDsePreview(ch, selected) {
  const preview = $('dse-answer-preview');
  if (!preview) return;
  const point = (ch.quiz?.keyPoints || [])[selected.point] || (ch.quiz?.keyPoints || [])[0] || '';
  const ev = selected.evidence ? GAME_DATA.evidence[selected.evidence] : null;
  const title = extractDsePoint(point);
  const evidence = ev ? `${ev.name}：${shortEvidenceLead(ev.content)}` : extractDseEvidence(point);
  const question = ch.quiz?.question || '';

  preview.innerHTML = `
    <span>答案預覽</span>
    <p><strong>論點：</strong>${escapeHTML(title)}</p>
    <p><strong>史實：</strong>${escapeHTML(evidence)}</p>
    <p><strong>解釋：</strong>${escapeHTML(makeLinkBackSentence(title, question))}</p>
    <p><strong>扣題：</strong>${escapeHTML(buildDseClosing(question))}</p>`;
}

function renderQuizSpeedCard(ch) {
  const root = $('quiz-speed-card');
  if (!root) return;

  const question = ch.quiz?.question || '';
  const note = ch.note || {};
  const keyPoints = ch.quiz?.keyPoints || [];
  const gems = note.writingGems || [];
  const thesis = buildDseOpening(question, note.summary);
  const closing = buildDseClosing(question);

  const skeleton = keyPoints.slice(0, 4).map((point, i) => {
    const title = extractDsePoint(point);
    const gist = extractDseEvidence(point);
    return `
      <li class="speed-step">
        <span class="speed-step-num">${i + 1}</span>
        <div>
          <strong>${escapeHTML(title)}</strong>
          <p>${escapeHTML(shortenText(gist, 58))}</p>
        </div>
      </li>`;
  }).join('');

  const details = keyPoints.slice(0, 4).map((point, i) => {
    const title = extractDsePoint(point);
    const evidence = extractDseEvidence(point);
    const explain = gems[i] || point;
    return `
      <details class="speed-detail">
        <summary>
          <span class="detail-index">${i + 1}</span>
          <span>${escapeHTML(title)}</span>
        </summary>
        <div class="detail-body">
          <p><strong>論點：</strong>${escapeHTML(title)}</p>
          <p><strong>史實：</strong>${escapeHTML(evidence)}</p>
          <p><strong>解釋：</strong>${escapeHTML(explain)}</p>
          <p><strong>扣題：</strong>${escapeHTML(makeLinkBackSentence(title, question))}</p>
        </div>
      </details>`;
  }).join('');

  const gemCards = gems.slice(0, 3).map((gem, i) => `
    <p><span>${i + 1}</span>${escapeHTML(gem)}</p>
  `).join('');

  root.innerHTML = `
    <section class="speed-card">
      <div class="speed-card-head">
        <span class="speed-eyebrow">30 秒速讀</span>
        <h3>答案骨架</h3>
      </div>
      <div class="speed-thesis">
        <span>中心論點</span>
        <p>${escapeHTML(thesis)}</p>
      </div>
      <ol class="speed-skeleton">${skeleton}</ol>
      <div class="speed-closer">
        <span>結尾方向</span>
        <p>${escapeHTML(closing)}</p>
      </div>
    </section>
    <section class="speed-expand">
      <div class="speed-expand-head">
        <span>展開史實</span>
        <em>點開每段可見作答四步</em>
      </div>
      ${details}
    </section>
    <section class="speed-gems">
      <div class="speed-expand-head">
        <span>考前速背句</span>
        <em>可直接改寫入答案</em>
      </div>
      ${gemCards || '<p class="note-empty">本章暫無速背句。</p>'}
    </section>`;
}

// ── 章節筆記（極簡版 + 摺疊）─────────────────────────
function renderChapterNote(ch) {
  const noteBox = $('chapter-note');
  if (!ch.note) { noteBox.style.display = 'none'; return; }
  noteBox.style.display = '';

  const note = ch.note;
  $('note-title').textContent   = note.title;
  $('note-summary').textContent = note.summary;

  // 必背史實
  const factsEl = $('note-facts');
  factsEl.innerHTML = '';
  (note.coreFacts || []).forEach(f => {
    const row = document.createElement('div');
    row.className = 'note-fact';
    row.innerHTML = `
      <div class="fact-head">
        <span class="fact-year">${f.year}</span>
        <span class="fact-who">${f.who}</span>
      </div>
      <div class="fact-what">${highlightDSETerms(f.what)}</div>
      <div class="fact-why">${highlightDSETerms(f.why)}</div>`;
    factsEl.appendChild(row);
  });

  // 答題金句
  const gemsEl = $('note-gems');
  gemsEl.innerHTML = '';
  (note.writingGems || []).forEach((g, i) => {
    const p = document.createElement('p');
    p.className = 'note-gem';
    p.innerHTML = `<span class="gem-mark">${i + 1}</span>${highlightDSETerms(g)}`;
    gemsEl.appendChild(p);
  });

  renderDseTemplate(ch);

  // 你的決策回顧（動態）
  const decEl = $('note-decision');
  decEl.innerHTML = '';
  const chapterScenes = ch.scenes || [];
  const decisions = chapterScenes
    .map(sId => ({ sId, choice: state.decisions[sId] }))
    .filter(d => d.choice);
  if (decisions.length === 0) {
    decEl.innerHTML = '<p class="note-empty">本章未有決策紀錄。</p>';
  } else {
    decisions.forEach(d => {
      const scene = GAME_DATA.scenes[d.sId];
      if (!scene || !scene.decision) return;
      const choiceText = d.choice === 'A'
        ? scene.decision.choiceA
        : scene.decision.choiceB;
      const row = document.createElement('div');
      row.className = 'note-decision-row';
      row.innerHTML = `
        <div class="dec-scene">${scene.title}</div>
        <div class="dec-line"><span class="dec-pill ${d.choice === 'A' ? 'pill-a' : 'pill-b'}">${d.choice}</span> ${choiceText}</div>`;
      decEl.appendChild(row);
    });
  }

  // 全運動總整理（只第四章顯示）
  const masterSec = $('note-section-master');
  if (note.masterSheet) {
    masterSec.style.display = '';
    renderMasterSheet(note.masterSheet);
  } else {
    masterSec.style.display = 'none';
  }

  // 重置摺疊狀態（必背史實預設展開，其餘預設收起）
  setNoteCollapsed('note-facts', false);
  setNoteCollapsed('note-gems', true);
  setNoteCollapsed('note-dse-template', true);
  setNoteCollapsed('note-decision', true);
  setNoteCollapsed('note-master', true);
}

function renderDseTemplate(ch) {
  const root = $('note-dse-template');
  if (!root) return;
  root.innerHTML = '';

  const question = ch.quiz?.question || '';
  const note = ch.note || {};
  const keyPoints = ch.quiz?.keyPoints || [];
  const gems = note.writingGems || [];

  const opener = document.createElement('div');
  opener.className = 'dse-template-opener';
  opener.innerHTML = `
    <span class="template-label">開首句</span>
    <p>${escapeHTML(buildDseOpening(question, note.summary))}</p>`;
  root.appendChild(opener);

  const body = document.createElement('div');
  body.className = 'dse-template-body';
  keyPoints.slice(0, 4).forEach((point, i) => {
    const row = document.createElement('div');
    row.className = 'dse-template-row';
    row.innerHTML = `
      <span class="template-step">段落 ${i + 1}</span>
      <p><strong>論點：</strong>${escapeHTML(extractDsePoint(point))}</p>
      <p><strong>史實：</strong>${escapeHTML(extractDseEvidence(point))}</p>
      <p><strong>解釋：</strong>${escapeHTML(gems[i] || point)}</p>`;
    body.appendChild(row);
  });
  root.appendChild(body);

  const closer = document.createElement('div');
  closer.className = 'dse-template-closer';
  closer.innerHTML = `
    <span class="template-label">結尾扣題</span>
    <p>${escapeHTML(buildDseClosing(question))}</p>`;
  root.appendChild(closer);
}

function buildDseOpening(question, summary) {
  if (question.includes('失敗')) {
    return '洋務運動的失敗並非單一事件所致，而是思想局限、制度積弊、經費不足與外來阻力交織的結果。';
  }
  if (question.includes('措施')) {
    return '洋務運動的措施可按軍事、外交、教育與工商業等方面分析，並須配合具體人物及年份作答。';
  }
  if (question.includes('原因') || question.includes('背景')) {
    return '洋務運動的興起或轉向，應從外患刺激、內部危機、思想轉變及開明官員推動等方面分析。';
  }
  return summary || '作答時應先提出清晰論點，再以具體史實說明，最後扣回題目要求。';
}

function buildDseClosing(question) {
  if (question.includes('失敗')) {
    return '總括而言，洋務運動雖奠定近代化基礎，但在「中體西用」框架下未能觸及制度根本，故難以避免甲午戰敗。';
  }
  if (question.includes('措施')) {
    return '由此可見，洋務運動並非單一軍事改革，而是由強兵、育才至求富的近代化嘗試。';
  }
  return '因此，相關史實顯示洋務運動是清廷面對內憂外患時的務實回應，亦揭示其後改革深度受限。';
}

function extractDsePoint(point) {
  const text = String(point).replace(/^【[^】]+】/, '');
  const idx = text.indexOf('：');
  if (idx > 0 && idx < 18) return text.slice(0, idx);
  return text.split(/[；。]/)[0];
}

function extractDseEvidence(point) {
  const text = String(point).replace(/^【[^】]+】/, '');
  const parts = text.split(/[；。]/).filter(Boolean);
  return parts.slice(0, 2).join('；') || text;
}

function shortenText(text, maxChars) {
  const clean = String(text).replace(/\s+/g, '');
  return clean.length > maxChars ? clean.slice(0, maxChars - 1) + '…' : clean;
}

function makeLinkBackSentence(point, question) {
  if (question.includes('失敗')) {
    return `${point}反映洋務運動未能突破體制與思想限制，是其失敗的重要原因。`;
  }
  if (question.includes('措施')) {
    return `${point}顯示洋務派嘗試以具體建設推動近代化，回應自強需要。`;
  }
  if (question.includes('原因') || question.includes('背景')) {
    return `${point}說明清廷面對內外危機時，逐漸產生推行洋務的需要。`;
  }
  return `${point}可扣回題目，說明洋務運動的發展與局限。`;
}

function renderMasterSheet(ms) {
  const root = $('note-master');
  root.innerHTML = '';

  // 失敗原因
  const causesH = document.createElement('h4');
  causesH.className = 'master-h';
  causesH.textContent = '一、失敗原因（四方面）';
  root.appendChild(causesH);
  (ms.failureCauses || []).forEach(c => {
    const row = document.createElement('div');
    row.className = 'master-cause';
    row.innerHTML = `<span class="cause-area">${c.area}</span><span class="cause-text">${c.text}</span>`;
    root.appendChild(row);
  });

  // 整體評價
  const evalH = document.createElement('h4');
  evalH.className = 'master-h';
  evalH.textContent = '二、整體評價';
  root.appendChild(evalH);
  const evalEl = document.createElement('div');
  evalEl.className = 'master-eval';
  const ev = ms.evaluation || {};
  evalEl.innerHTML = `
    <div class="eval-col eval-pos"><div class="eval-cap">功</div><ul>${(ev.achievements || []).map(t => `<li>${t}</li>`).join('')}</ul></div>
    <div class="eval-col eval-neg"><div class="eval-cap">過</div><ul>${(ev.failures || []).map(t => `<li>${t}</li>`).join('')}</ul></div>`;
  root.appendChild(evalEl);

  // 中日比較
  const cmpH = document.createElement('h4');
  cmpH.className = 'master-h';
  cmpH.textContent = '三、中日比較速查';
  root.appendChild(cmpH);
  const tbl = document.createElement('table');
  tbl.className = 'master-cmp';
  tbl.innerHTML = `<thead><tr><th>面向</th><th>中國洋務</th><th>日本明治</th></tr></thead>`;
  const tb = document.createElement('tbody');
  (ms.compareJapan || []).forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.aspect}</td><td>${r.china}</td><td>${r.japan}</td>`;
    tb.appendChild(tr);
  });
  tbl.appendChild(tb);
  root.appendChild(tbl);
}

function setNoteCollapsed(bodyId, collapsed) {
  const body = document.getElementById(bodyId);
  if (!body) return;
  const btn = document.querySelector(`.note-toggle[data-target="${bodyId}"]`);
  if (collapsed) body.classList.add('collapsed');
  else body.classList.remove('collapsed');
  if (btn) {
    btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    const icon = btn.querySelector('.toggle-icon');
    if (icon) icon.textContent = collapsed ? '▸' : '▾';
  }
}

function toggleNoteSection(bodyId) {
  const body = document.getElementById(bodyId);
  if (!body) return;
  setNoteCollapsed(bodyId, !body.classList.contains('collapsed'));
}

function onQuizContinue() {
  // 章節完成 — 記錄並儲存進度
  const wasNew = !state.completedChapters.includes(state.chapterKey);
  if (wasNew) {
    state.completedChapters.push(state.chapterKey);
  }
  saveProgress();
  // analytics: 章節完成（僅首次推進時觸發）
  if (wasNew && window.Analytics) {
    Analytics.chapterFinish(state.chapterKey, null);
  }
  // 成就檢查：章節完成觸發
  checkAchievements('chapter_complete');

  const proceedToNext = () => {
    showScreen('game-screen');
    const next = {
      chapter1: () => startChapter('chapter2'),
      chapter2: () => show1874Transition(),
      chapter3: () => startChapter('chapter4'),
      chapter4: () => showEnding()
    };
    const fn = next[state.chapterKey];
    if (fn) fn();
  };

  // 若本章有書記私函（章節間插頁），先顯示私函再進入下一章
  if (SECRETARY_LETTERS[state.chapterKey]) {
    showSecretaryLetter(state.chapterKey, proceedToNext);
  } else {
    proceedToNext();
  }
}

// markdown **bold** → <strong> 簡易轉換
function mdBoldToHtml(text) {
  return String(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

// 阿拉伯數字 → 中文數字（用於場景標題年份的儀式感呈現）
const CN_DIGITS = ['零', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖'];
function arabicToChinese(numStr) {
  return numStr.split('').map(d => CN_DIGITS[parseInt(d, 10)] || d).join('');
}
function formatSceneTitle(raw) {
  // 嘗試匹配「YYYY年　地名」格式
  const m = raw.match(/^(\d{4})年\s*(.*)$/);
  if (m) {
    const yearCN = arabicToChinese(m[1]);
    const place  = m[2].trim();
    return `<span class="title-year-en">${m[1]}</span>` +
           `<span class="title-year-cn">${yearCN}</span>` +
           `<span class="title-divider"></span>` +
           `<span class="title-place">${place}</span>`;
  }
  return `<span class="title-place">${raw}</span>`;
}

// 方向 X 輔助函數：場景字幕 + 對白區摺疊控制
// 場景字幕已回歸對話框，此函數保留但僅用於 fallback；不再啟用打字機
function setSceneSubtitle(text) {
  const sub = $('scene-subtitle');
  if (!sub) return;
  const span = sub.querySelector('.subtitle-text');
  if (span) span.textContent = text || '';
  // 既然字幕在 CSS 已隱藏，這個函數只在歷史代碼路徑使用
}
function setDialogueCollapsed(collapsed) {
  const area = $('dialogue-area');
  if (!area) return;
  area.classList.toggle('dialogue-collapsed', !!collapsed);
}

// ══════════════════════════════════════════════════════
// 1874 特殊過場
// ══════════════════════════════════════════════════════
function show1874Transition() {
  const t = GAME_DATA.transition;
  showChapterTransition({
    year:     t.year,
    title:    t.title,
    subtitle: t.subtitle,
    text:     t.text,
    bgImage:  'pivot-1874',
  }, () => startChapter('chapter3'));
  // 自訂按鈕字
  $('transition-continue').textContent = '繼續旅程';
}

// ══════════════════════════════════════════════════════
// 首次玩家引導（onboarding hints）
// 用 localStorage 記錄已看過的 hint，避免重複展示
// ══════════════════════════════════════════════════════
const ONBOARDING_KEY = 'ziqiang_onboarding_v1';
function getOnboardingShown() {
  try { return JSON.parse(localStorage.getItem(ONBOARDING_KEY) || '{}'); }
  catch (e) { return {}; }
}
function markOnboardingShown(id) {
  try {
    const shown = getOnboardingShown();
    shown[id] = true;
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(shown));
  } catch (e) {}
}
function showOnboardingTip(id, text, icon = '💡') {
  const shown = getOnboardingShown();
  if (shown[id]) return;
  const tip = $('onboarding-tip');
  if (!tip) return;
  $('ob-tip-icon').textContent = icon;
  $('ob-tip-text').innerHTML = mdBoldToHtml(text);
  tip.hidden = false;
  tip.classList.remove('show');
  void tip.offsetWidth;
  tip.classList.add('show');
  const closeBtn = $('ob-tip-close');
  closeBtn.onclick = () => {
    playSFX('click');
    markOnboardingShown(id);
    tip.classList.remove('show');
    setTimeout(() => { tip.hidden = true; }, 400);
  };
}

// ══════════════════════════════════════════════════════
// 永久回憶錄存檔（與遊戲進度存檔分離）
// 每次通關後將完整紀錄保存於此，主選單可隨時翻閱
// ══════════════════════════════════════════════════════
const MEMOIR_KEY = 'ziqiang_memoirs_v1';

function loadMemoirArchive() {
  try {
    const raw = localStorage.getItem(MEMOIR_KEY);
    return raw ? JSON.parse(raw) : { runs: [], achievements: [], stats: {} };
  } catch (e) {
    return { runs: [], achievements: [], stats: {} };
  }
}
function saveMemoirArchive(data) {
  try { localStorage.setItem(MEMOIR_KEY, JSON.stringify(data)); }
  catch (e) { /* localStorage 可能滿了 */ }
}

// 通關時將當前 state 寫入 memoir archive 作為一個 run
function archiveRun() {
  const archive = loadMemoirArchive();
  const decisions = state.decisions || {};
  const memorials = state.memorials || {};
  const aCount = Object.values(decisions).filter(c => c === 'A').length;
  const bCount = Object.values(decisions).filter(c => c === 'B').length;
  const run = {
    id: Date.now(),
    completedAt: new Date().toISOString(),
    decisions,
    memorials,
    aCount,
    bCount,
    decisionCount: Object.keys(decisions).length,
    memorialCount: Object.keys(memorials).length,
    // 統計各章蒐證進度（如果有保存）
    evidenceCollected: state.allEvidenceCollected || {}
  };
  archive.runs = archive.runs || [];
  // 最多保留 10 次通關
  archive.runs.unshift(run);
  if (archive.runs.length > 10) archive.runs = archive.runs.slice(0, 10);
  saveMemoirArchive(archive);
}

// ══════════════════════════════════════════════════════
// 成就系統
// ══════════════════════════════════════════════════════
const ACHIEVEMENTS = [
  // 進度成就
  { id: 'ch1_done', name: '時代見證者', desc: '完成第一章「時代困局」', icon: '⚔', cat: 'progress' },
  { id: 'ch2_done', name: '自強之鑄',   desc: '完成第二章「強兵之路」', icon: '⚙', cat: 'progress' },
  { id: 'ch3_done', name: '求富啟程',   desc: '完成第三章「求富轉向」', icon: '🚢', cat: 'progress' },
  { id: 'all_done', name: '三十年見證', desc: '完成全 4 章，親歷洋務興衰', icon: '📜', cat: 'progress' },
  // 蒐證成就
  { id: 'evidence_master', name: '線索達人', desc: '蒐齊全 4 章所有 70+ 件卷宗', icon: '🔍', cat: 'evidence' },
  { id: 'chapter_complete_collection', name: '鐵筆書記', desc: '單章蒐齊所有線索', icon: '✒', cat: 'evidence' },
  // 決策成就（互斥三選一）
  { id: 'all_reform', name: '鐵血直諫', desc: '14 次進諫全部選激進改革（B）', icon: '🔥', cat: 'decision' },
  { id: 'all_conservative', name: '折衝樽俎', desc: '14 次進諫全部選穩妥之策（A）', icon: '⚖', cat: 'decision' },
  { id: 'balanced', name: '兼聽則明', desc: 'A/B 進諫均衡（差距 ≤ 2）', icon: '☯', cat: 'decision' },
  // 奏摺成就
  { id: 'first_memorial', name: '文以載道', desc: '完成第一份奏摺', icon: '📃', cat: 'memorial' },
  { id: 'four_memorials', name: '摺底煙火', desc: '完成全 4 份奏摺', icon: '🗂', cat: 'memorial' },
  { id: 'comprehensive', name: '面面俱到', desc: '任一章工作坊涵蓋所有 3 個面向', icon: '🎯', cat: 'memorial' },
  // 特殊成就
  { id: 'first_try_inference', name: '不負所學', desc: '所有推論題首次答對', icon: '🌟', cat: 'special' },
  { id: 'historian', name: '史筆如刀', desc: '列印或保存任一份奏摺', icon: '🖋', cat: 'special' },
];

function getAchievementById(id) {
  return ACHIEVEMENTS.find(a => a.id === id);
}

function unlockAchievement(id) {
  const archive = loadMemoirArchive();
  if (!archive.achievements) archive.achievements = [];
  if (archive.achievements.includes(id)) return; // 已解鎖過
  archive.achievements.push(id);
  saveMemoirArchive(archive);
  showAchievementToast(id);
  if (window.Analytics) Analytics.achievementUnlock(id);
}

function showAchievementToast(id) {
  const a = getAchievementById(id);
  if (!a) return;
  const toast = $('achievement-toast');
  if (!toast) return;
  toast.innerHTML = `
    <div class="ach-toast-inner">
      <span class="ach-toast-icon">${a.icon}</span>
      <div class="ach-toast-body">
        <span class="ach-toast-label">成就解鎖</span>
        <strong class="ach-toast-name">${a.name}</strong>
        <span class="ach-toast-desc">${a.desc}</span>
      </div>
    </div>`;
  toast.classList.remove('show');
  void toast.offsetWidth;
  toast.classList.add('show');
  playSFX('catch'); // 重用接住音效作為解鎖音
  setTimeout(() => toast.classList.remove('show'), 3800);
}

// 成就檢查：依據當前 state 觸發可解鎖的成就
function checkAchievements(trigger) {
  const archive = loadMemoirArchive();
  const decisions = state.decisions || {};
  const memorials = state.memorials || {};

  // 進度
  if (state.completedChapters?.includes('chapter1')) unlockAchievement('ch1_done');
  if (state.completedChapters?.includes('chapter2')) unlockAchievement('ch2_done');
  if (state.completedChapters?.includes('chapter3')) unlockAchievement('ch3_done');
  if (state.completedChapters?.length >= 4) unlockAchievement('all_done');

  // 奏摺
  if (Object.keys(memorials).length >= 1) unlockAchievement('first_memorial');
  if (Object.keys(memorials).length >= 4) unlockAchievement('four_memorials');

  // 工作坊面面俱到（某一份奏摺涵蓋 3 個不同面向）
  if (trigger === 'memorial_complete' && _wsState) {
    const aspectsUsed = new Set();
    Object.keys(_wsState.selectedByAspect || {}).forEach(a => aspectsUsed.add(a));
    if (aspectsUsed.size >= 3) unlockAchievement('comprehensive');
  }

  // 決策（僅在全部 14 場景都決定後判定）
  const dCount = Object.keys(decisions).length;
  if (dCount >= 14) {
    const aCount = Object.values(decisions).filter(c => c === 'A').length;
    const bCount = Object.values(decisions).filter(c => c === 'B').length;
    if (bCount === 14) unlockAchievement('all_reform');
    else if (aCount === 14) unlockAchievement('all_conservative');
    else if (Math.abs(aCount - bCount) <= 2) unlockAchievement('balanced');
  }

  // 蒐證成就：trigger 'evidence_unlocked' 時檢查
  if (trigger === 'evidence_unlocked') {
    const scene = GAME_DATA.scenes[state.sceneQueue[state.sceneIdx]];
    if (scene && state.evidenceBank.size >= scene.objects.length) {
      // 單場景全蒐——這個算章節成就的子條件
    }
  }
  // 鐵筆書記：通關時計算
  if (trigger === 'chapter_complete') {
    const ch = GAME_DATA[state.chapterKey];
    if (ch?.scenes) {
      const allObjs = ch.scenes.flatMap(sid => (GAME_DATA.scenes[sid]?.objects || []).map(o => o.evidence)).filter(Boolean);
      const collectedAll = allObjs.every(eid => state.chapterEvidence?.has(eid));
      if (collectedAll && allObjs.length > 0) unlockAchievement('chapter_complete_collection');
    }
  }
  // 線索達人：全部 4 章通關 + 蒐齊全部 evidence
  if (state.completedChapters?.length >= 4) {
    const allEvidenceIds = Object.keys(GAME_DATA.evidence);
    const collectedSet = state.allEvidenceCollected ? new Set(Object.values(state.allEvidenceCollected).flat()) : null;
    if (collectedSet && allEvidenceIds.every(id => collectedSet.has(id))) {
      unlockAchievement('evidence_master');
    }
  }

  // 史筆如刀：trigger 'memorial_printed' 時直接解鎖
  if (trigger === 'memorial_printed') unlockAchievement('historian');

  // 不負所學：trigger 'inference_correct_first_try'，需要 state.inferenceStats
  if (trigger === 'chapter_complete') {
    const stats = state.inferenceStats || { total: 0, firstTry: 0 };
    if (stats.total >= 8 && stats.firstTry === stats.total && state.completedChapters?.length >= 4) {
      unlockAchievement('first_try_inference');
    }
  }
}

// ══════════════════════════════════════════════════════
// 書記私函（章節間插頁，補強 DSE 缺失考點）
// 採用白話為主，保留少量時代用詞，便於 DSE 學生理解
// ══════════════════════════════════════════════════════
const SECRETARY_LETTERS = {
  // 章 1 → 章 2：漢族督撫崛起 + 銜接李鴻章登場
  // 內容緊扣 ch1 三場景（虎門炮台、八里橋、朝廷議事廳）
  chapter1: {
    date: '一八六一年　初春',
    place: '京中寓所',
    opening: '致　仲文兄：',
    quiz: {
      prompt: '對了，仲文兄——你還記得那年八里橋上，僧格林沁的三萬蒙古鐵騎敗於甚麼武器嗎？',
      options: [
        { text: '燧發槍', correct: false, feedback: '燧發槍是更早期的步兵武器。八里橋之役中，聯軍使用的是更先進的後膛炮。' },
        { text: '阿姆斯特朗線膛炮', correct: true, feedback: '正是。射程逾三千碼，**清軍未及衝鋒便已盡墨**——一個時代的結束，只用了三個小時。' },
        { text: '鐵甲蒸汽戰艦', correct: false, feedback: '鐵甲艦主要用於海上。八里橋是陸地戰場，主角是線膛火炮。' },
      ],
    },
    paragraphs: [
      '兩日前才從朝廷議事廳出來。奕訢親王的話還在耳邊——**「這把火，燒的不只是圓明園，燒的是我們幾百年的自大。」**',
      '倭仁大人在旁不發一言，只低聲嘆息。',
      '回到寓所，我把這幾年蒐集的卷宗重新翻過。從一八四二年虎門炮台耆英手中的《南京條約》，到一八六〇年八里橋——**僧格林沁的三萬蒙古鐵騎，在阿姆斯特朗炮前不過半日**。割了又割，賠了又賠。',
      '但兄長，我想說的不只是這些。',
      '我跟著朝廷走動這幾年，最大的震動，不在洋人，而在朝中——',
      '太平天國席捲半壁江山時，**朝廷發現旗人八旗已經不能打仗了**。最後平定的，不是滿洲正規軍，而是**曾國藩在湖南募的湘軍、李鴻章在安徽辦的淮軍**——這兩支軍隊是漢人大臣自己招、自己練、自己統的私募部隊。',
      '戰後，朝廷不得不把地方軍政實權，交給這些**漢族督撫**。這是一個三百年來，旗人從未經歷過的局面。',
      '朝中現在最有實權的，是這幾位漢人——**曾國藩、左宗棠、李鴻章**。聽聞李鴻章已從曾國藩幕中獨當一面，常勝軍華爾、戈登都在他麾下，對洋務的態度比朝中任何人都認真。',
      '奕訢親王所說的「自強」，未來怕是要落到這幾位漢族督撫身上。',
      '我已收到通知——下個月將轉入李府繼續書記之職。',
      '師夷之長技以制夷——魏源這句話，**書桌上的《海國圖志》擺了二十年，朝廷一直當它是書生空談**。今日卻成了上下不得不為之事。',
      '下一個三十年，會是怎樣的局面？我不敢預測。**只能繼續記錄**。',
    ],
  },
  // 章 2 → 章 3（1874 過場前）：強兵反思 + 留學/廣方言館 + 中體西用辯論 + 預示日本崛起
  // 內容緊扣 ch2 四場景（總理衙門、江南製造、練兵場、同文館）
  chapter2: {
    date: '一八七二年　深秋',
    place: '上海　李公（李鴻章）幕中',
    opening: '致　仲文兄：',
    quiz: {
      prompt: '對了——同文館論爭中，奕訢親王援引哪部著作來抵擋倭仁「奉夷為師」的指責？',
      options: [
        { text: '魏源《海國圖志》', correct: false, feedback: '《海國圖志》確是洋務思想源頭，但奕訢當時援引的是更具體的「中體西用」綱領。' },
        { text: '馮桂芬《校邠盧抗議》', correct: true, feedback: '正是。**「中學為體，西學為用」**——朝廷的態度從此定調：器物可學，倫常不動。' },
        { text: '曾國藩《家書》', correct: false, feedback: '曾國藩家書多論修身齊家，並非洋務綱領性文獻。' },
      ],
    },
    paragraphs: [
      '十年了。自隨李公入幕，仲文兄你在京中怕已不認得我。',
      '上個月，我陪李公親自走訪**江南製造總局**——廠房擴增了三倍，傅蘭雅在譯書局譯出的西書已逾百種。李公對他敬如師。',
      '這幾年，洋務的版圖鋪開了——**江南造槍炮，福州造蒸汽戰艦，金陵與天津兩局南北並肩**。李公說：「自此中國不必再每月向洋人開單子。」',
      '但兄長，最讓我感動的是**留學一事**。',
      '**容閎**——少時即在美國耶魯求學，比朝中所有人都早見過西方。他多年來說服曾公、李公，**派遣百二十名幼童赴美**，學機械、學造船、學算學、學法政。如今他們分布在美國各州的學校、工廠裡。「人才之培育，是百年大計」——奕訢親王在京中如是說。',
      '京中同文館、上海廣方言館、廣州同文館——**三館並立**，通譯西語、研習算學。**倭仁大人**曾上奏「奉夷為師，有傷國體」，朝中爭論不下兩月。',
      '我親見奕訢親王怎樣應對：他不正面駁倭仁，只在奏摺旁附了《校邠盧抗議》一冊——**「中學為體，西學為用」**。朝廷的態度從此定調：器物可學，倫常不動。',
      '仲文兄，這些年最大的感觸是——**改革的速度，總是慢於問題出現的速度**。',
      '我們造了輪船，洋人造得更快；我們設了同文館，倭仁的話仍在朝中迴盪。三十年所練的兵、所造的廠、所譯的書——是否真的能撐住明天？',
      '聽聞日本剛派**岩倉使團**出洋——將從西方學回更多東西。**我們慢嗎？我覺得，怕是慢的。**',
      '李公已著手籌設輪船招商局——強兵之後，下一步是「**求富**」。下封信，再與兄長詳述。',
    ],
  },
  // 章 3 → 章 4（甲午前夕）：求富完成的陰影 + 官督商辦評價 + 預示甲午
  // 內容緊扣 ch3 四場景（招商局、電報、煤礦、武備學堂）
  chapter3: {
    date: '一八九三年　歲末',
    place: '天津　北洋大臣行轅',
    opening: '致　仲文兄：',
    quiz: {
      prompt: '對了仲文兄——「**官督商辦**」這四個字，最關鍵的弊端是什麼？',
      options: [
        { text: '資金短缺，無法持續經營', correct: false, feedback: '資金有挑戰，但根本問題不是錢——而是體制。' },
        { text: '官不放手、商不放心，效率低落且貪腐叢生', correct: true, feedback: '正是。**官員把企業當衙門辦，商人不敢真正投入**——招商局、開平、漢陽皆受此弊。「官督商辦」是洋務「求富」的根本性局限。' },
        { text: '無法引進西方技術', correct: false, feedback: '技術不是問題——傅蘭雅譯書、洋技師指導皆有。問題在於制度。' },
      ],
    },
    paragraphs: [
      '二十年了。仲文兄，從一八六二年隨李公入幕至今，三十一載春秋過去。',
      '這二十年走過——**招商局、開平煤礦、唐胥鐵路、漢陽鐵廠、武備學堂**——李公的志向，從「強兵」擴展到「求富」。',
      '我記得一八七四年日本侵台時，李公在書房徹夜未眠。他說：**「徒有兵而無錢，兵亦不可恃」**。從那時起，二十年來造輪船、辦電報、開煤礦、煉鋼鐵——一切，都為「求富」二字。',
      '但仲文兄，我想跟你說的，是這二十年看見的**陰影**。',
      '**招商局**奪回了長江航運，但官商之間的紛爭至今未息。**開平**的煤、**漢陽**的鐵——產量遠不及預期，多半因為「**官督商辦**」四字：官不放手，商不放心，錢往何處去，誰也說不清。',
      '**電報**拉到了天津，但朝廷的決策遠比電報慢——一八八四年中法戰事，傳訊已快，朝中議事仍見遲滯。',
      '我曾以為，把器物學來了，就一切可解。二十年走下來——**才發現器物可學，但用器物的人、養器物的錢、護器物的制度——這些我們學不來，也改不了**。',
      '去年（一八八八），**北洋艦隊正式成軍**。定遠、鎮遠購自德國，火力之強，亞洲第一。武備學堂的學員陸續分配進入北洋。表面看來，洋務三十年，大成在望。',
      '但太后那邊⋯⋯**頤和園的工程，三千萬軍費被挪去修園**。李公的奏摺早遞了，朝廷至今未回。',
      '不知為何，這幾日總想起一八六〇年的八里橋。當年我以為，敗於洋人是因為我們**炮不夠強**。',
      '如今才明白：**敵人不在洋人，敵人在自己**。',
      '日本若於來年（一八九四）挑釁——以朝鮮為餌，或許就是衝著北洋來的。李公已著手備戰。**我能做的，仍只是繼續記錄**。',
    ],
  },
};

function showSecretaryLetter(chapterKey, onContinue) {
  const letter = SECRETARY_LETTERS[chapterKey];
  if (!letter) { onContinue && onContinue(); return; }

  $('letter-date').textContent = letter.date || '';
  $('letter-opening').textContent = letter.opening || '';
  $('letter-place').textContent = letter.place || '';

  // 段落渲染（支援 **粗體** 標記重點 DSE 詞）
  const bodyEl = $('letter-body');
  bodyEl.innerHTML = '';
  letter.paragraphs.forEach((para, i) => {
    const p = document.createElement('p');
    p.className = 'letter-para';
    p.style.animationDelay = (0.4 + i * 0.18) + 's';
    p.innerHTML = mdBoldToHtml(para);
    bodyEl.appendChild(p);
  });

  // 附筆：複習題（spaced repetition）
  const quizEl = $('letter-quiz');
  if (letter.quiz && quizEl) {
    quizEl.hidden = false;
    $('letter-quiz-prompt').textContent = letter.quiz.prompt;
    const optsEl = $('letter-quiz-options');
    optsEl.innerHTML = '';
    const fbEl = $('letter-quiz-feedback');
    fbEl.textContent = '';
    fbEl.className = 'letter-quiz-feedback';
    letter.quiz.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'letter-quiz-opt';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        playSFX('click');
        if (window.Analytics) Analytics.letterQuiz(state.chapterKey, letter.quiz.id || 'q1', opt.text, !!opt.correct);
        [...optsEl.children].forEach(b => b.disabled = true);
        if (opt.correct) {
          btn.classList.add('opt-correct');
          fbEl.className = 'letter-quiz-feedback feedback-correct';
          fbEl.innerHTML = mdBoldToHtml(opt.feedback);
        } else {
          btn.classList.add('opt-wrong');
          // 第一次錯：可再選一次（找出正確的）
          fbEl.className = 'letter-quiz-feedback feedback-wrong';
          fbEl.innerHTML = mdBoldToHtml(opt.feedback) + '<br><span class="quiz-retry-hint" style="font-size:0.82rem;opacity:0.7">請再選一次。</span>';
          btn.disabled = true;
          [...optsEl.children].forEach(b => { if (b !== btn) b.disabled = false; });
        }
      });
      optsEl.appendChild(btn);
    });
  } else if (quizEl) {
    quizEl.hidden = true;
  }

  // 繼續按鈕
  $('letter-continue').onclick = () => {
    playSFX('click');
    if (onContinue) onContinue();
  };

  showScreen('letter-screen');
  // 滾到頂部
  document.querySelector('.letter-scroll')?.scrollTo({ top: 0 });
}

// ══════════════════════════════════════════════════════
// 翻閱回憶錄頁面（從主選單進入）
// 顯示所有歷次通關 + 成就解鎖
// ══════════════════════════════════════════════════════
function showMemoirsScreen() {
  const archive = loadMemoirArchive();
  const unlockedIds = archive.achievements || [];

  // 成就總數與已解鎖
  $('memoirs-ach-count').textContent = unlockedIds.length;
  $('memoirs-ach-total').textContent = ACHIEVEMENTS.length;

  // 渲染成就牆（按類別分組）
  const achvEl = $('memoirs-achievements');
  achvEl.innerHTML = '';
  const cats = [
    { key: 'progress', label: '進度成就' },
    { key: 'evidence', label: '蒐證成就' },
    { key: 'decision', label: '決策成就' },
    { key: 'memorial', label: '奏摺成就' },
    { key: 'special',  label: '特殊成就' },
  ];
  cats.forEach(cat => {
    const items = ACHIEVEMENTS.filter(a => a.cat === cat.key);
    if (items.length === 0) return;
    const section = document.createElement('div');
    section.className = 'achv-cat';
    section.innerHTML = `<h4 class="achv-cat-title">${cat.label}</h4>
      <div class="achv-grid"></div>`;
    const grid = section.querySelector('.achv-grid');
    items.forEach(a => {
      const unlocked = unlockedIds.includes(a.id);
      const card = document.createElement('div');
      card.className = 'achv-badge' + (unlocked ? ' unlocked' : ' locked');
      card.innerHTML = `
        <span class="achv-badge-icon">${unlocked ? a.icon : '🔒'}</span>
        <strong class="achv-badge-name">${unlocked ? a.name : '？？？'}</strong>
        <span class="achv-badge-desc">${unlocked ? a.desc : '尚未解鎖'}</span>`;
      grid.appendChild(card);
    });
    achvEl.appendChild(section);
  });

  // 渲染歷次通關記錄
  const runsEl = $('memoirs-runs');
  runsEl.innerHTML = '';
  const runs = archive.runs || [];
  if (runs.length === 0) {
    runsEl.innerHTML = '<p class="memoirs-empty">尚未完成任何通關——啟程後完成全 4 章，此處便會出現你的回憶錄。</p>';
  } else {
    runs.forEach((run, idx) => {
      const date = new Date(run.completedAt);
      const dateStr = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
      let stanceLabel = '兼聽則明';
      if (run.bCount > run.aCount + 2) stanceLabel = '鐵血直諫派';
      else if (run.aCount > run.bCount + 2) stanceLabel = '折衝樽俎派';
      const card = document.createElement('article');
      card.className = 'memoirs-run-card';
      card.innerHTML = `
        <header class="run-head">
          <span class="run-num">第 ${runs.length - idx} 次回憶</span>
          <span class="run-date">${dateStr}</span>
        </header>
        <div class="run-stats">
          <span><strong>${run.decisionCount}</strong> 進諫</span>
          <span><strong>${run.memorialCount}</strong> 奏摺</span>
          <span>立場：<strong>${stanceLabel}</strong></span>
        </div>`;
      runsEl.appendChild(card);
    });
  }

  showScreen('memoirs-screen');
  document.querySelector('.memoirs-scroll')?.scrollTo({ top: 0 });
}

// ══════════════════════════════════════════════════════
// 通關成就頁：三十年見證總結
// ══════════════════════════════════════════════════════
function showAchievementScreen() {
  const decisions = state.decisions || {};
  const memorials = state.memorials || {};
  const decisionCount = Object.keys(decisions).length;
  const memorialCount = Object.keys(memorials).length;
  const evidenceTotal = Object.values(memorials).reduce((sum, arr) => sum + (arr?.length || 0), 0);
  // 蒐集總數（不只奏摺）— 從決策數推估場景數，每場約 5 件
  const totalEvidenceAcrossGame = decisionCount * 5; // 粗略估計
  $('achv-decisions-count').textContent = decisionCount;
  $('achv-evidence-count').textContent = Math.max(evidenceTotal, totalEvidenceAcrossGame);
  $('achv-memorials-count').textContent = memorialCount;
  $('achv-years-count').textContent = '53'; // 1842 → 1895

  // 三十年軌跡：4 章一覽
  const tlEl = $('achv-timeline');
  tlEl.innerHTML = '';
  const chapterMeta = [
    { key: 'chapter1', year: '1842 — 1860', title: '時代困局', role: '入耆英、奕訢幕下' },
    { key: 'chapter2', year: '1861 — 1872', title: '強兵之路', role: '轉曾、李幕下記錄總理衙門諸事' },
    { key: 'chapter3', year: '1873 — 1893', title: '求富轉向', role: '隨李鴻章奔走南北洋' },
    { key: 'chapter4', year: '1894 — 1895', title: '帝國之殤', role: '見證北洋艦隊覆滅、馬關之恥' },
  ];
  chapterMeta.forEach(ch => {
    const completed = (state.completedChapters || []).includes(ch.key);
    const div = document.createElement('div');
    div.className = 'achv-tl-item' + (completed ? ' done' : '');
    div.innerHTML = `
      <span class="tl-year">${ch.year}</span>
      <div class="tl-body">
        <strong>${ch.title}</strong>
        <span>${ch.role}</span>
      </div>
      <span class="tl-status">${completed ? '✓' : '·'}</span>`;
    tlEl.appendChild(div);
  });

  // 進諫足跡：列出所有決策
  const decEl = $('achv-decisions');
  decEl.innerHTML = '';
  const sceneOrder = ['s1_1','s1_2','s1_3','s2_1','s2_2','s2_3','s2_4','s3_1','s3_2','s3_3','s3_4','s4_1','s4_2','s4_3'];
  let aCount = 0, bCount = 0;
  sceneOrder.forEach(sid => {
    const choice = decisions[sid];
    if (!choice) return;
    const scene = GAME_DATA.scenes[sid];
    if (!scene) return;
    const dec = scene.decision || {};
    const choiceText = choice === 'A' ? dec.choiceA : dec.choiceB;
    const outcome = choice === 'A' ? dec.outcomeA : dec.outcomeB;
    if (choice === 'A') aCount++; else bCount++;
    const row = document.createElement('article');
    row.className = 'achv-dec-row choice-' + choice.toLowerCase();
    row.innerHTML = `
      <header class="dec-head">
        <span class="dec-scene">${scene.title || sid}</span>
        <span class="dec-pill pill-${choice.toLowerCase()}">${choice}</span>
      </header>
      <p class="dec-choice">${choiceText || ''}</p>
      <p class="dec-outcome">${outcome || ''}</p>`;
    decEl.appendChild(row);
  });

  // 呈交奏摺：列出每章選的核心卷宗
  const memEl = $('achv-memorials');
  memEl.innerHTML = '';
  const chapterLabels = {
    chapter1: '第一章 · 時代困局',
    chapter2: '第二章 · 強兵之路',
    chapter3: '第三章 · 求富轉向',
    chapter4: '第四章 · 帝國之殤',
  };
  ['chapter1','chapter2','chapter3','chapter4'].forEach(chKey => {
    const evIds = memorials[chKey];
    if (!evIds || evIds.length === 0) return;
    const ch = GAME_DATA[chKey];
    const card = document.createElement('article');
    card.className = 'achv-mem-card';
    const evCards = evIds.map((eid, idx) => {
      const ev = GAME_DATA.evidence[eid];
      if (!ev) return '';
      const num = ['壹','貳','參'][idx] || '·';
      return `<div class="achv-mem-evidence"><span class="mem-num">${num}</span><span class="mem-name">${ev.name}</span><span class="mem-cat">${ev.category || ''}</span></div>`;
    }).join('');
    card.innerHTML = `
      <header class="mem-card-head">
        <span class="mem-card-seal">奏</span>
        <h4>${chapterLabels[chKey]}</h4>
      </header>
      <p class="mem-card-question">所議：${ch?.quiz?.question || ''}</p>
      <div class="achv-mem-list">${evCards}</div>`;
    memEl.appendChild(card);
  });

  // 你的史學立場：根據 A/B 傾向給結論
  let stance;
  if (decisionCount === 0) {
    stance = '你選擇了沉默——三十年身在歷史中，卻未留下任何進諫。歷史的判決，亦難為你說話。';
  } else if (bCount > aCount) {
    stance = `三十年間 ${decisionCount} 次進諫，你 ${bCount} 次主張更深刻的改革，${aCount} 次選擇穩妥折衷。你站在洋務派最激進的一翼——你親身體會到：個別書生之熱血，難敵整個體制之慣性。然而歷史會記下你的不甘。`;
  } else if (aCount > bCount) {
    stance = `三十年間 ${decisionCount} 次進諫，你 ${aCount} 次選擇穩妥之策，${bCount} 次主張深層改革。這正是史實上洋務派與守舊派妥協的軌跡——連「中體西用」這種折衷，都已是當時的極限。你的選擇，亦是李鴻章的選擇。`;
  } else {
    stance = `三十年間 ${decisionCount} 次進諫，你的立場在改革與保守之間反覆——${aCount} 次穩妥、${bCount} 次激進。這恰恰映照真實的洋務運動：一場在傳統與變革之間反覆拉扯、最終兩面不討好的悲劇。你的搖擺，正是時代的搖擺。`;
  }
  $('achv-stance-text').textContent = stance;

  showScreen('achievement-screen');
}

// ══════════════════════════════════════════════════════
// 結局
// ══════════════════════════════════════════════════════
function showEnding() {
  const ending = GAME_DATA.endings.historical;
  if (window.Analytics) {
    const archive = (typeof loadMemoirArchive === 'function') ? loadMemoirArchive() : {};
    const ach = archive.achievements || [];
    Analytics.gameComplete(state.completedChapters?.length || 0, null, ach);
  }
  $('ending-title').textContent = ending.title;

  // 主敘述
  const body = $('ending-text-body');
  body.innerHTML = '';
  ending.text.split('\n\n').forEach(para => {
    if (!para.trim()) return;
    const p = document.createElement('p');
    p.textContent = para.trim();
    body.appendChild(p);
  });

  // I. 你的歷史足跡 — 依玩家決策統計傾向
  const decisions = Object.values(state.decisions);
  const total = decisions.length;
  const aCount = decisions.filter(c => c === 'A').length;
  const bCount = decisions.filter(c => c === 'B').length;
  let footprint;
  if (total === 0) {
    footprint = '你選擇了沉默——但歷史從不會因為沉默而停步。';
  } else if (bCount > aCount) {
    footprint = `在三十年的關鍵抉擇中，你 ${total} 次決策中有 ${bCount} 次選擇了更激進的改革之路。你站在李鴻章、張之洞這一邊，相信只有更深的變革才能救中國。然而你親身體會到：個別官員的熱血，難敵整個體制的慣性。`;
  } else if (aCount > bCount) {
    footprint = `在三十年的關鍵抉擇中，你 ${total} 次決策中有 ${aCount} 次選擇了相對謹慎的路線——這正是史實上洋務派與守舊派妥協的軌跡。你親身體會到：在那個時代，連「中體西用」這種折衷方案，都已是改革者能爭取到的極限。`;
  } else {
    footprint = `在三十年的關鍵抉擇中，你的決策在改革與保守之間搖擺——${aCount} 次謹慎、${bCount} 次激進。這恰恰映照了真實的洋務運動：一場在傳統與變革之間反覆拉扯，最終兩面不討好的悲劇。`;
  }
  $('ending-footprint-text').textContent = footprint;

  // II. 史學評價 三段式
  $('voice-li-text').textContent = ending.voiceLi || '';
  $('voice-liang-text').textContent = ending.voiceLiang || '';
  $('voice-self-question').textContent = ending.voiceSelfQuestion || '';

  $('ending-screen').style.backgroundImage = "url('images/ending-historical.jpg')";
  showScreen('ending-screen');
  // 通關時封存當次 run 到永久回憶錄
  archiveRun();
  // 最後一輪成就檢查（會考慮所有累積狀態）
  checkAchievements('chapter_complete');
  // 注意：不在此處 clearProgress——成就頁需讀取 state 與 localStorage 才能呈現
  // 清除存檔由成就頁的「重新開始」按鈕觸發
}

// ══════════════════════════════════════════════════════
// 時間軸更新
// ══════════════════════════════════════════════════════
function updateTimeline(year) {
  const yearStr = String(year);
  const timeline = $('timeline');
  const markers = Array.from(document.querySelectorAll('.timeline-marker'));
  const activeIndex = markers.findIndex(m => m.dataset.year === yearStr);
  const progress = markers.length > 1 && activeIndex >= 0
    ? activeIndex / (markers.length - 1)
    : 0;

  if (timeline) {
    timeline.dataset.currentYear = yearStr;
    timeline.style.setProperty('--timeline-progress', progress.toFixed(4));
    timeline.classList.remove('timeline-advance');
    void timeline.offsetWidth;
    timeline.classList.add('timeline-advance');
  }

  markers.forEach(m => {
    const isActive = m.dataset.year === yearStr;
    const wasActive = m.classList.contains('active');
    if (isActive) {
      // Re-trigger bounce by removing + re-adding active
      m.classList.remove('active');
      void m.offsetWidth;
      m.classList.add('active');
      m.classList.remove('visited');
    } else {
      if (wasActive) {
        // Leaving this marker — mark as visited
        m.classList.remove('active');
        m.classList.add('visited');
      } else if (!m.classList.contains('visited')) {
        // Future markers stay unvisited
        m.classList.remove('active');
      }
    }
  });
}

// ══════════════════════════════════════════════════════
// 提示
// ══════════════════════════════════════════════════════
function showHint() {
  const scene = GAME_DATA.scenes[state.sceneQueue[state.sceneIdx]];

  // 探索階段：高亮未找到的謎題目標 2.5 秒
  if (state.phase === 'explore' && scene?.puzzle) {
    const remaining = scene.puzzle.targets.filter(t => !state.puzzleHits.has(t));
    remaining.forEach(id => {
      const el = $('scene-objects').querySelector(`[data-id="${id}"]`);
      if (!el) return;
      el.classList.add('hint-flash');
      setTimeout(() => el.classList.remove('hint-flash'), 2500);
    });
  }

  const hints = {
    explore: () => {
      if (!scene || !scene.puzzle) return scene?.sceneHint || '細心搜索場景中每一個角落。';
      const remaining = scene.puzzle.targets.filter(t => !state.puzzleHits.has(t)).length;
      if (remaining > 0) return `${scene.puzzle.title}：還有 ${remaining} 件關鍵物件未找到。`;
      return '你已找到所有關鍵物件！';
    },
    'puzzle-modal': () => '謎題解開！點擊「繼續」前進。',
    dialogue:       () => '閱讀對白後，點擊「▼ 繼續」。',
    decision:       () => '選擇你認為最合適的決策方向。',
    rebuttal:       () => '聆聽歷史人物的反駁，然後點擊「▼ 繼續」。',
    persuade:       () => '從史料庫選一件最有力的論據，說服對方。',
    feedback:       () => '點擊「▼ 繼續」推進到下一個場景。'
  };
  const fn = hints[state.phase];
  const msg = typeof fn === 'function' ? fn() : '仔細探索場景，點擊所有發光物件。';
  showToast(msg);
}

function showToast(msg) {
  let toast = document.getElementById('hint-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'hint-toast';
    document.getElementById('scene-frame').appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.remove('toast-hide');
  toast.classList.add('toast-show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.replace('toast-show', 'toast-hide');
  }, 3000);
}
