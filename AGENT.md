# AGENT.md

---

## 1. 專案目標

本專案是一個介紹「榮格認知功能」的知識型網站。

本文件只規範：

* 專案目錄結構
* 開發規則
* AI 可操作範圍

各頁面內容規格請參考對應頁面的 `specs/pages/*.md` 文件。
Agent **不可自行發明頁面結構或頁面欄位**。

---

## 2. 技術棧（固定）

* Framework: React + TypeScript
* UI Library: MUI
* Icons: react-icons
* State (client UI state): Zustand（僅 UI 狀態）
* Data fetching / cache: React Query（即便是 local json，也透過 query layer）
* Routing: React Router
* Build: Vite
* Styling: MUI + emotion
* PWA: Vite PWA Plugin + Service Worker + Web App Manifest

Agent 不得引入未列出的主要框架或改變核心技術棧。

---

## 3. 專案目錄

採用 **Module First + Module Internal Layering (Vertical Slice)**

```
/
├─ public                # 靜態檔案：index.html、favicon、manifest、icons
├─ src
│  ├─ app                # router / layout / providers / theme / pwa-register
│  ├─ modules            # 領域模組
│  ├─ shared             # 全站共用（不可放領域知識）
│  └─ assets             # 可打包資源（svg/icons/images）
├─ specs                 # 頁面規格 (specs/pages/*.md)
├─ specs                 # 頁面規格 (specs/pages/*.md)
├─ package.json
└─ vite.config.ts
```

---

## 4. modules（領域模組）

```
src/modules
├─ cognitive-function
│   ├─ model
│   ├─ data
│   ├─ logic
│   ├─ ui
│   └─ feature
│
├─ personality-type
│   ├─ model
│   ├─ data
│   ├─ logic
│   ├─ ui
│   └─ feature
│
└─ home
    └─ feature
```

---

## 5. 分層規則（嚴格）

### modules/*

| layer   | 職責                       |
| ------- | ------------------------ |
| model   | 型別與領域模型（純 TS）            |
| data    | 心理學內容 JSON/MD（唯一知識來源）    |
| logic   | 純函式與資料轉換                 |
| ui      | 純展示元件（props only）        |
| feature | 頁面組裝（hooks/router/query） |

規則：

* 禁止跨模組讀取 `data`
* UI 不得直接 import JSON
* 必須透過 query hooks

---

### shared/*

只放：

* UI primitives
* hooks
* utils
* icon wrapper

禁止心理學知識。

---

### app/*

只負責：

* Router
* Layout
* Providers
* Theme
* PWA register

禁止領域邏輯。

---

## 6. Icon 使用規範（react-icons）

為避免 bundle 過大與 UI 不一致，icons 必須集中管理。

### 放置位置

```
src/shared/ui/icons/
  AppIcon.tsx
  iconMap.ts
```

### 使用規則

禁止：

* 在任何元件中直接 `import { FaXXX } from "react-icons/fa"`
* 各模組自行選 icon
* icon 帶語意（例如心理功能對應圖示寫死在 UI）

允許：

* 透過 `AppIcon` 使用

### 使用方式

```tsx
<AppIcon name="function.Fe" size={20} />
```

### 原則

* icon 與領域語意的 mapping 必須集中
* 若 specs 未定義 icon → 不顯示 icon
* UI 不得自行決定 icon 含義

---

## 7. 狀態與資料規則

### Zustand（只存 UI 狀態）

允許：

* sidebar
* dialog
* theme
* 表單暫存

禁止：

* 心理學資料
* 作為 cache 或資料來源

---

### React Query（資料層）

* 所有資料必須透過 query hooks
* local JSON 視為 API
* feature 不可直接讀取 data

---

## 8. PWA 規範

本專案必須可安裝為離線知識站。

### 必備能力

* 可安裝
* 離線瀏覽已看過頁面
* 首頁可離線載入
* 手機桌面啟動
* 資料快取版本控制

### Service Worker 策略

| 資源類型   | 策略                    |
| ------ | --------------------- |
| HTML   | Network First         |
| JSON   | Cache First + version |
| Images | Cache First           |
| Fonts  | Cache First           |
| API    | Network First         |

---

## 9. 頁面規格來源（specs）

```
specs/pages/
  home.md
  function-detail.md
  type-detail.md
```

Agent 規則：

1. 必讀 md
2. 僅依 md 建 UI
3. 不可新增欄位
4. 若缺欄位需回報

---

## 10. 內容來源限制

唯一來源：

```
src/modules/**/data
```

禁止：

* UI 硬編碼心理學文字
* shared 放知識
* 產生心理建議

---

## 11. Agent 可執行任務

允許：

* 建立 page / feature
* 建立 MUI 展示元件
* 建立型別
* 建立 query hooks
* 建立 Zustand UI store
* 建立測試

禁止：

* 更換技術棧
* 改 specs 規格
* 新增心理學字段
* 提供現實建議

---

## 12. 檔案命名與位置約定

| 類型    | 路徑                                              |
| ----- | ----------------------------------------------- |
| Page  | `modules/<module>/feature/<Name>Page.tsx`       |
| Data  | `modules/<module>/data/<id>.json`               |
| Model | `modules/<module>/model/types.ts`               |
| Logic | `modules/<module>/logic/*.ts`                   |
| UI    | `shared/ui/*`                                   |
| Query | `modules/<module>/logic/queries.ts`             |
| Hooks | `modules/<module>/feature/hooks/useXYZQuery.ts` |

---
