# AGENT.md

---

## 1. 文件定位

本文件定義本專案的開發規範與 Agent 行為準則。

目標：

* 維持一致的架構與分層
* 依 `specs/pages/*.md` 實作頁面
* 避免 AI 直接改壞專案結構

---

## 2. 技術棧

* Framework: React + TypeScript
* UI Library: MUI
* Icons: react-icons
* State (client UI state): Zustand（只放 UI state）
* Data fetching / cache: React Query（從 query layer 取資料）
* Routing: React Router
* Build: Vite
* Styling: MUI + emotion
* PWA: Vite PWA Plugin + Service Worker + Web App Manifest

Agent 不可任意替換以上技術棧。

---

## 3. 專案結構

採用 **Module First + Module Internal Layering (Vertical Slice)**。

```txt
/
  public/
  src/
    app/                # router / layout / providers / theme / pwa-register
    modules/            # 業務模組
    shared/             # 共用 UI / hooks / utils / icons
    assets/
  specs/                # 頁面規格 specs/pages/*.md
  package.json
  vite.config.ts
```

---

## 4. 模組結構

```txt
src/modules/
  cognitive-function/
    model/
    data/
    logic/
    ui/
    feature/

  personality-type/
    model/
    data/
    logic/
    ui/
    feature/

  home/
    feature/
```

---

## 5. 分層責任

### modules/*

| layer   | 責任 |
| ------- | ---- |
| model   | 型別定義（TS types/interfaces） |
| data    | 靜態資料來源（JSON/MD） |
| logic   | 業務邏輯、query adapter、轉換函式 |
| ui      | 可重用展示元件（props only） |
| feature | page 組裝、router 對接、hooks 使用 |

規則：

* 資料來源集中在 `data`
* UI 不可直接 import JSON
* 頁面資料一律走 query hooks

### shared/*

允許：

* UI primitives
* hooks
* utils
* icon wrapper

禁止放業務資料或領域邏輯。

### app/*

僅放：

* Router
* Layout
* Providers
* Theme
* PWA register

不可放業務模組邏輯。

---

## 6. Icon 規範（react-icons）

集中管理 icons，避免每個頁面散落 import。

```txt
src/shared/ui/icons/
  AppIcon.tsx
  iconMap.ts
```

規則：

* 頁面/元件不可直接 `import { FaXXX } from "react-icons/fa"`
* icon 對應與映射統一在 `iconMap.ts`
* 頁面透過 `AppIcon` 使用

範例：

```tsx
<AppIcon name="function.Fe" size={20} />
```

---

## 7. 狀態與資料

### Zustand

只放 UI state（如 sidebar、dialog、theme）。

不可放：

* 業務資料
* 取代 React Query cache

### React Query

* 所有資料讀取走 query hooks
* local JSON 透過 repository/query layer 暴露
* feature 不直接觸碰 data 檔案

---

## 8. PWA 規範

需支持：

* 可安裝
* 離線基本可用
* 首頁可快取
* 靜態資源快取
* 版本更新可控

Service Worker 策略：

| 資源 | 策略 |
| ---- | ---- |
| HTML | Network First |
| JSON | Cache First + version |
| Images | Cache First |
| Fonts | Cache First |
| API | Network First |

---

## 9. Specs 驅動開發

```txt
specs/pages/
  home.md
  function-detail.md
  type-detail.md
  formation-process-guide.md
```

Agent 流程：

1. 先讀對應 md 規格
2. 依規格拆成 UI 區塊
3. 接上 query hooks
4. 完成行為與路由

---

## 10. 資料放置規範

業務資料放在：

```txt
src/modules/**/data
```

禁止：

* UI 層硬編碼資料
* shared 放業務資料
* 在頁面直接讀 raw data 檔

---

## 11. Agent 可做 / 不可做

可做：

* 新增 page / feature
* 新增 MUI 展示元件
* 補齊型別
* 新增 query hooks
* 新增 Zustand UI store
* 補測試（若專案已有）

不可做：

* 任意改技術棧
* 無視 specs 自行發揮
* 跳過 query layer 直讀 data
* 破壞既有模組分層

---

## 12. 命名慣例

| 類型 | 路徑 |
| ---- | ---- |
| Page | `src/modules/<module>/feature/pages/<Name>Page.tsx` |
| Data | `src/modules/<module>/data/<id>.json` |
| Model | `src/modules/<module>/model/types.ts` |
| Logic | `src/modules/<module>/logic/*.ts` |
| UI | `src/shared/ui/*` |
| Query | `src/modules/<module>/logic/queries.ts` |
| Hooks | `src/modules/<module>/feature/hooks/useXYZQuery.ts` |

---

## 13. 教學頁獨立模組規範（Tutorial as Module）

教學相關頁面不可再掛在 `home` 模組下，需改為獨立模組（建議模組名：`guide` 或 `formation-guide`）。

### 模組結構要求

```txt
src/modules/guide/
  data/
  model/
  logic/
  feature/
    pages/
    hooks/
```

### 路由與頁面要求

* `AppRouter` 中教學主路由統一使用 `/guide`
* 若已有舊路由（如 `/formation-process-guide`），保留 redirect 到 `/guide`
* 教學頁元件路徑需為：`src/modules/guide/feature/pages/*Page.tsx`

### 內容邊界

* 教學頁仍遵守 specs，不可做測驗結果或人格最終判定
* 教學頁可使用 query hooks，但需從對應 module 的 `logic/queries.ts` 暴露
* `home` 僅保留入口與 CTA，不承載教學邏輯

### 既有專案遷移指引

* 已在 `src/modules/home/feature` 的教學頁，後續調整時應優先搬移到 `src/modules/guide/feature/pages`
* 搬移時保持同名 export，先更新 router/import，再調整資料與 hooks 分層
