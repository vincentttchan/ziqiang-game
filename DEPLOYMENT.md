# 部署指引：Supabase + Vercel + GitHub

> **目標**：把《自強之路》部署到公網，讓學生能玩，並收集學習行為數據到 Supabase。
> **預估時間**：首次完整部署約 60–90 分鐘（含註冊帳號）。
> **費用**：全部使用免費額度，0 元起步。

---

## 0. 部署架構

```
[學生瀏覽器]
   ↓ 載入 HTML/CSS/JS
[Vercel CDN]──── 靜態檔案
   ↓ analytics.js 發送事件
[Vercel Serverless: /api/track]
   ↓ HTTPS + service_role_key
[Supabase PostgreSQL: game_events 表]
   ↑ 老師用網頁 UI 查看 / 匯出 CSV
[Supabase Studio]
```

**安全性要點**：
- Supabase **service role key** 只放 Vercel 環境變數，不會出現在前端
- 學生瀏覽器看不到任何 secret
- 所有事件透過 HTTPS 傳輸

---

## 1. 註冊三個帳號（10 分鐘）

| 服務 | 用途 | 註冊網址 |
|---|---|---|
| **GitHub** | 存放程式碼 | https://github.com |
| **Vercel** | 託管靜態網站 + Serverless API | https://vercel.com（用 GitHub 登入） |
| **Supabase** | 資料庫 | https://supabase.com（用 GitHub 登入） |

> 三個都用 GitHub 登入可省去額外密碼管理。

---

## 2. 建 Supabase 資料庫（15 分鐘）

### 2.1 建立 Project
1. 登入 Supabase Dashboard → **New Project**
2. 填寫：
   - Name：`ziqiang-game`
   - Database Password：**自己設一個強密碼，記下來**（這是 PostgreSQL 密碼，與服務 key 無關）
   - Region：選 **Tokyo** 或 **Singapore**（亞洲距離香港最近）
   - Plan：**Free**
3. 等約 2 分鐘 project 初始化完成

### 2.2 建立資料表（用 SQL）
1. 左側選單 → **SQL Editor** → **New query**
2. 貼以下 SQL 並按 **Run**：

```sql
-- 事件主表
create table game_events (
  id              bigserial primary key,
  event_name      text         not null,
  payload         jsonb        not null default '{}'::jsonb,
  client_timestamp timestamptz,
  server_received timestamptz  not null default now(),
  session_id      text,
  class_name      text,
  student_id      text,
  app_version     text,
  page_url        text,
  client_ip       text,
  user_agent      text
);

-- 索引：常用查詢加速
create index idx_event_name        on game_events(event_name);
create index idx_class_student     on game_events(class_name, student_id);
create index idx_session           on game_events(session_id);
create index idx_received          on game_events(server_received desc);

-- RLS：預設禁止匿名讀寫
-- service_role_key 會繞過 RLS，所以後端 API 可正常寫入
alter table game_events enable row level security;
```

> ✅ 成功會顯示 `Success. No rows returned`

### 2.3 取得連線資訊
1. 左側選單 → **Project Settings** → **API**
2. 記下兩個值（之後 Vercel 要用）：
   - **Project URL**：`https://xxxxxxxx.supabase.co`
   - **service_role secret**：點 `Reveal` 顯示一串長字串（⚠ 絕對保密）

---

## 3. 推 GitHub（10 分鐘）

### 3.1 建立 GitHub repo
1. 在 GitHub → 點右上 `+` → **New repository**
2. Name：`ziqiang-game`（或你喜歡的名字）
3. **Private** 或 **Public** 都可（教育用建議 Public，方便其他老師使用）
4. **不要** 勾 `Add README`（已有檔案）
5. 按 **Create repository**

### 3.2 在本機把專案推上去

開 Terminal，cd 到遊戲資料夾：

```bash
cd "/Users/vincentttchan99/Desktop/洋務運動遊戲"

# 初始化 git（若還沒）
git init
git branch -M main

# 加遠端
git remote add origin https://github.com/你的帳號/ziqiang-game.git

# 加入所有檔案（.gitignore 已過濾 .env 等敏感檔）
git add .
git commit -m "Initial commit: 自強之路 v80"

# 推上去
git push -u origin main
```

> ⚠ 若 `git push` 要求密碼，請用 **Personal Access Token**（GitHub Settings → Developer settings → Personal access tokens → 建一個 classic token，勾 `repo` 權限）

---

## 4. 部署到 Vercel（15 分鐘）

### 4.1 連接 GitHub repo
1. 登入 Vercel Dashboard → **Add New...** → **Project**
2. 選你剛建的 `ziqiang-game` repo → **Import**
3. **Framework Preset**：選 **Other**（純靜態 + Serverless）
4. **Root Directory**：留空（用根目錄）
5. **Build Command**：留空
6. **Output Directory**：留空

### 4.2 設定環境變數（重要！）
在 **Environment Variables** 區塊加兩個：

| Name | Value |
|---|---|
| `SUPABASE_URL` | 你在 §2.3 取得的 Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | 你在 §2.3 取得的 service_role secret |

兩個都勾 **Production**、**Preview**、**Development**

### 4.3 Deploy
1. 按 **Deploy** → 等約 1–2 分鐘
2. 完成後會給你網址：`https://ziqiang-game-xxx.vercel.app`
3. 點開測試遊戲能否載入

### 4.4 驗證數據有寫入
1. 在遊戲網址玩一兩個場景
2. 回 Supabase Dashboard → **Table Editor** → 選 `game_events`
3. 應該看到一堆事件 row（`login` / `scene_enter` / `evidence_click` 等）

✅ 如果有資料，部署完成！

---

## 5. 後續：自訂域名（可選，15 分鐘）

### 5.1 買域名
推薦 **Cloudflare Registrar**（成本價，無加價）或 **Namecheap**
- `.com` 約 US$10/年
- `.hk` 約 HK$80–150/年
- `.app` 約 US$15/年（含強制 HTTPS）

### 5.2 在 Vercel 綁定
1. Vercel Project → **Settings** → **Domains**
2. 輸入你的域名（如 `ziqiang.example.com`）→ **Add**
3. Vercel 會給你 DNS 設定指示（通常一個 CNAME）
4. 到域名供應商的 DNS 面板加入該記錄
5. 等 10–60 分鐘 DNS 生效，Vercel 會自動發 SSL 證書

---

## 6. 老師端：查詢數據

### 6.1 在 Supabase Studio 視覺化查看
- **Table Editor**：像 Excel 一樣瀏覽 `game_events`
- 可篩選 `class_name = 'S4A'` 看單班
- 可按 `server_received` 排序看最新事件

### 6.2 常用 SQL 範例（在 SQL Editor 執行）

#### A. 班別總覽：每班通關人數
```sql
select class_name,
       count(distinct student_id) as 通關人數
from game_events
where event_name = 'game_complete'
group by class_name
order by class_name;
```

#### B. 卡關偵測：學生在哪場景流失最多
```sql
select payload->>'sceneId' as 場景,
       count(distinct session_id) as 進入人數
from game_events
where event_name = 'scene_enter'
group by payload->>'sceneId'
order by 進入人數 desc;
```

對照 `game_complete` 人數，可算出每場景流失率。

#### C. 推理題易錯排行
```sql
select payload->>'sceneId' as 場景,
       payload->>'questionId' as 題目,
       count(*) filter (where (payload->>'correct')::boolean = false) as 錯誤次數,
       count(*) as 總作答,
       round(100.0 * count(*) filter (where (payload->>'correct')::boolean = false) / count(*), 1) as 錯誤率
from game_events
where event_name = 'inference_answer'
group by 場景, 題目
order by 錯誤率 desc
limit 20;
```

#### D. 說服選擇分布：哪條線索最常被選為說服證據
```sql
select payload->>'sceneId' as 場景,
       payload->>'evidenceId' as 線索,
       count(*) as 選擇次數
from game_events
where event_name = 'persuasion_choice'
group by 場景, 線索
order by 場景, 選擇次數 desc;
```

#### E. 學生個人歷程：某學生的完整 timeline
```sql
select server_received, event_name, payload
from game_events
where class_name = 'S4A' and student_id = '12'
order by server_received asc;
```

### 6.3 匯出 CSV
- 在任何 SQL 查詢結果頁，右上角 **Download** → `.csv`
- 可直接在 Excel / Google Sheets 開啟做進一步分析

---

## 7. 維運注意事項

### 7.1 Supabase 免費額度
| 項目 | 限制 | 你的用量估計 |
|---|---|---|
| 資料庫大小 | 500 MB | 一個學生通關約 200 事件，每事件 ~0.5 KB → 1000 名學生才 100 MB |
| API 請求 | 50 萬/月 | 1000 學生 × 20 batch = 2 萬請求，遠遠夠用 |
| 暫停政策 | 連續 7 天無活動會暫停 | 學期使用無問題；長假期可能會暫停（重新打開即可） |

### 7.2 Vercel 免費額度
| 項目 | 限制 |
|---|---|
| 頻寬 | 100 GB/月 |
| Serverless 函數呼叫 | 10 萬/天 |
| 構建分鐘 | 6000/月 |

教育用途幾乎不可能超標。

### 7.3 更新部署
之後改動程式，只需：
```bash
git add .
git commit -m "你的修改說明"
git push
```
Vercel 偵測到 push 會自動重新部署（約 30 秒）。

### 7.4 安全建議
- **service_role_key 不要外洩**：只放 Vercel 環境變數
- **學生資料保護**：班別 + 學號屬個人資料，學期結束後可從 Supabase 刪除舊資料
- **DELETE 範例**：
  ```sql
  delete from game_events where server_received < now() - interval '6 months';
  ```

---

## 8. 故障排除

| 症狀 | 可能原因 | 解決 |
|---|---|---|
| `/api/track` 回 500 | 環境變數沒設或設錯 | Vercel Settings → Environment Variables 檢查 |
| Supabase 收不到資料 | service_role_key 錯 | 重新從 Supabase API 頁複製 |
| 學生說「無法登入」 | 通常瀏覽器禁用了 localStorage | 提示學生開無痕模式或改用其他瀏覽器 |
| 事件全部丟失 | 學生關閉了 JavaScript | 純 JS 遊戲無解，需 JS 啟用 |
| Supabase 顯示 project paused | 7 天沒活動 | Dashboard 點 Resume 即可 |

---

## 9. 開學前 Checklist

- [ ] Supabase project 建好，`game_events` 表存在
- [ ] Vercel 部署成功，遊戲網址能打開
- [ ] 環境變數 `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` 已設
- [ ] 自己完整玩一次，確認 Supabase 有收到事件
- [ ] 自訂域名（如有）已生效
- [ ] 在不同瀏覽器測試：Chrome / Safari / Edge / 手機 Safari
- [ ] 平板（iPad）橫向測試（學校常用）
- [ ] 把網址寄給 1–2 位試玩學生收集回饋
- [ ] 準備一份「學生使用指南」（含網址、登入填寫示範）

---

**文件版本**：v1
**對應遊戲版本**：v80
**最後更新**：2026-05-21
