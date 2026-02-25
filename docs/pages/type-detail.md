# type-detail.md

## 頁面目的

此頁面說明「人格類型是如何由功能堆疊運作形成」。

重點：

* 類型是功能排序的結果
* 解釋處理流程，而非描述性格
* 說明動力與失衡，而非優缺點

不得寫成人格介紹文章或特質列表。

---

## 路由

`/types/:type_code`

type_code 對應 personality-type data 中的 id（如 intp、enfj）

---

## 資訊架構（區塊順序不可變）

1. 類型標題區
2. 功能堆疊（Stack）
3. 認知處理順序（Processing Flow）
4. 發展階段（Development）
5. 劣勢接管（Grip）
6. 互動誤會（Interaction Misunderstandings）

---

## 1. 類型標題區

### 顯示欄位

* type_code（四字母）
* stack_summary（一句話）

### UI

標題 + 小說明區塊

不得加入人格形容詞或刻板印象文字

---

## 2. 功能堆疊（Stack）

### UI

四層結構圖（由上到下）

1. Dominant
2. Auxiliary
3. Tertiary
4. Inferior

### 顯示資料

* function_id
* position

### 點擊

導向 `/functions/:function_id`

資料來源：type data
不可硬編碼

---

## 3. 認知處理順序（Processing Flow）

### 目的

說明此類型如何處理資訊與做決策

### UI

流程步驟（ordered list）

### 資料來源

processing_flow（string[]）

每一步為心理處理階段
不可寫情境故事

---

## 4. 發展階段（Development）

### UI

三段區塊

* early_stage
* balancing_stage
* mature_stage

### 資料來源

development

每段 2~4 句描述功能如何逐步參與運作
不得描述人生成功或成熟度評價

---

## 5. 劣勢接管（Grip）

### UI

段落 + 條列

### 資料來源

grip

* trigger
* behaviors（string[]）
* recovery（string）

### 說明

描述劣勢功能主導時的處理模式
不可使用心理疾病詞彙

---

## 6. 互動誤會（Interaction Misunderstandings）

### UI

對照列表

左：對方感受到的行為
右：此類型的內在動機

### 資料來源

interaction_misunderstandings（{ appearance, intention }[]）

不可寫成社交建議

---

## 資料依賴

需要 queries：

* useTypeDetailQuery(type_code)
* useFunctionsOfTypeQuery(type_code)

不得直接 import data

---

## 禁止事項

* 不列優缺點
* 不給職業建議
* 不給戀愛建議
* 不比較類型好壞
* 不推測讀者人格
* 不出現星座式描述
