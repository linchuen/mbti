# function-detail.md

## 頁面目的

此頁面解釋「單一認知功能」的運作機制。

重點是讓讀者理解：

* 此功能如何處理資訊
* 為何會產生特定行為
* 與其他功能如何產生衝突

不得將內容寫成人格描述或優缺點分析。

---

## 路由

`/functions/:id`

id 對應 cognitive-function data 中的 function id

---

## 資訊架構（區塊順序不可變）

1. 功能標題區
2. 本質（Essence）
3. 內在處理流程（Process）
4. 日常表現（Manifestations）
5. 常見誤解（Misunderstandings）
6. 壓力狀態（Stress）
7. 功能衝突（Conflicts）
8. 使用此功能的類型（Related Types）

---

## 1. 功能標題區

### 顯示欄位

* name
* function_axis（例如 Fi–Te / Ne–Si）
* short_summary

### UI

標題 + 小型說明區塊
不可加入額外段落

---

## 2. 本質（Essence）

### 顯示

一段文字（1~3 句）

### 內容要求

解釋此功能在「判斷或感知」中負責什麼

不可包含：

* 行為建議
* 人格評價

資料來源：essence

---

## 3. 內在處理流程（Process）

### UI

步驟列表（ordered list）

### 資料來源

decision_flow（string[]）

### 要求

每一項代表心理處理的一個階段
不可寫成情境故事

---

## 4. 日常表現（Manifestations）

### UI

條列清單

### 資料來源

daily_manifestations（string[]）

### 說明

為外在可觀察行為
不可包含優缺點判斷語氣

---

## 5. 常見誤解（Misunderstandings）

### UI

兩欄對照：

左：他人看到的行為
右：實際內在原因

### 資料來源

misunderstandings（{ appearance, reason }[]）

---

## 6. 壓力狀態（Stress）

### UI

段落 + 條列

### 資料來源

stress_pattern

* description
* behaviors（string[]）

### 說明

描述功能過載或失衡時的處理方式變化
不得寫成病理或心理診斷

---

## 7. 功能衝突（Conflicts）

### UI

可展開列表（accordion）

### 資料來源

conflicts（{ target_function, reason }[]）

### 說明

描述認知策略不相容的原因
不可描述誰正確

---

## 8. 使用此功能的類型（Related Types）

### UI

類型卡片列表

### 顯示欄位

* type_code
* stack_position（dominant / auxiliary / tertiary / inferior）

### 點擊行為

導向 `/types/:type_code`

資料來源：type 模組 mapping query
不可硬編碼

---

## 資料依賴

需要 queries：

* useFunctionDetailQuery(id)
* useTypesByFunctionQuery(id)

不得直接 import data

---

## 禁止事項

* 不給建議
* 不寫人格特質形容詞列表
* 不比較優劣
* 不推測讀者類型
* 不加入測驗或互動分析
