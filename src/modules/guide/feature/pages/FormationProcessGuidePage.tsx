import { Alert, Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useGuideFunctionsQuery } from "../hooks/useGuideFunctionsQuery";

const orientationRows = [
  { direction: "外向 (Extraverted)", meaning: "從外界獲取資訊、與現實互動" },
  { direction: "內向 (Introverted)", meaning: "從內心模型理解世界" }
];

const functionRows = [
  { type: "感知", fn: "Sensing (S)", essence: "看見現實" },
  { type: "直覺", fn: "Intuition (N)", essence: "看見可能" },
  { type: "思考", fn: "Thinking (T)", essence: "判斷正確" },
  { type: "情感", fn: "Feeling (F)", essence: "判斷價值" }
];

const principles = ["以處理資訊方式為判斷對象", "以長期重複模式為判斷證據", "以壓力下的反應偏移做交叉驗證"];

const flowSteps = [
  {
    title: "Step 1 感知方式",
    bullets: ["外部即時訊號（Se / Ne 傾向）", "內部既有脈絡（Si / Ni 傾向）"]
  },
  {
    title: "Step 2 判斷方式",
    bullets: ["邏輯一致性（Ti / Te 傾向）", "價值一致性（Fi / Fe 傾向）"]
  },
  {
    title: "Step 3 功能排序",
    bullets: [
      "依自然使用頻率 + 壓力時失衡點推估",
      "優勢功能（dominant）",
      "輔助功能（auxiliary）",
      "第三功能（tertiary）",
      "劣勢功能（inferior）"
    ]
  },
  {
    title: "Step 4 人格傾向",
    bullets: ["輸出認知運作傾向摘要", "不輸出最終類型判定"]
  }
];

const records = ["情境描述（做了什麼決策）", "先感知到什麼", "最後用什麼標準下判斷", "事後壓力反應"];

const corrections = [
  { wrong: "我外向，所以一定是 Fe/Se", fix: "回到判斷標準，不看社交表現。" },
  { wrong: "我重感受，所以一定是 Fi", fix: "區分個人價值判斷與情緒強度。" },
  { wrong: "我工作理性，所以一定是 T 主導", fix: "分辨角色要求與自然偏好。" }
];

export function FormationProcessGuidePage() {
  const { data: functions, isLoading } = useGuideFunctionsQuery();

  return (
    <Stack spacing={5}>
      <Box sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 3, background: "linear-gradient(160deg, #fff8ee, #eef4ff)" }}>
        <Typography variant="h3" mb={1}>
          先判斷流程，再理解人格
        </Typography>
        <Typography color="text.secondary">你要找的不是「我像誰」，而是「我如何感知、判斷並形成穩定偏好」。</Typography>
      </Box>

      <Box>
        <Typography variant="h4" mb={2}>
          榮格的兩大方向
        </Typography>
        <Typography color="text.secondary" mb={2}>
          榮格認為人類理解世界有兩大方向：
        </Typography>
        <Box sx={{ border: "1px solid rgba(19,34,56,0.12)", borderRadius: 2, overflow: "hidden" }}>
          {orientationRows.map((row, idx) => (
            <Box
              key={row.direction}
              sx={{
                px: 2,
                py: 1.5,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.1fr 1.9fr" },
                gap: 1,
                backgroundColor: idx % 2 === 0 ? "rgba(255,255,255,0.9)" : "rgba(19,34,56,0.03)",
                borderTop: idx === 0 ? "none" : "1px solid rgba(19,34,56,0.08)"
              }}
            >
              <Typography fontWeight={600}>{row.direction}</Typography>
              <Typography color="text.secondary">{row.meaning}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography variant="h4" mb={2}>
          四種處理方式
        </Typography>
        <Box sx={{ border: "1px solid rgba(19,34,56,0.12)", borderRadius: 2, overflow: "hidden" }}>
          <Box
            sx={{
              px: 2,
              py: 1.25,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 1,
              backgroundColor: "rgba(19,34,56,0.05)"
            }}
          >
            <Typography fontWeight={700}>類型</Typography>
            <Typography fontWeight={700}>功能</Typography>
            <Typography fontWeight={700}>本質</Typography>
          </Box>
          {functionRows.map((row, idx) => (
            <Box
              key={row.fn}
              sx={{
                px: 2,
                py: 1.25,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                gap: 1,
                backgroundColor: idx % 2 === 0 ? "rgba(255,255,255,0.95)" : "rgba(19,34,56,0.02)",
                borderTop: "1px solid rgba(19,34,56,0.08)"
              }}
            >
              <Typography>{row.type}</Typography>
              <Typography>{row.fn}</Typography>
              <Typography color="text.secondary">{row.essence}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography variant="h4" mb={2}>
          判斷前提（先看認知，不看標籤）
        </Typography>
        <Stack spacing={1.25}>
          {principles.map((item) => (
            <Box key={item} sx={{ px: 2, py: 1.25, borderLeft: "3px solid", borderColor: "primary.main", bgcolor: "rgba(19,34,56,0.03)", borderRadius: 1 }}>
              <Typography>{item}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="h4" mb={1}>
          人格形成流程判斷
        </Typography>
        <Typography color="text.secondary" mb={2}>
          感知方式 → 判斷方式 → 功能排序 → 人格傾向
        </Typography>
        <Stack spacing={1.5}>
          {flowSteps.map((step, idx) => (
            <Box key={step.title}>
              <Box sx={{ p: 2, border: "1px solid rgba(19,34,56,0.12)", borderRadius: 2, bgcolor: "rgba(255,255,255,0.9)" }}>
                <Typography variant="h6" mb={1}>
                  {step.title}
                </Typography>
                <Stack component="ul" sx={{ pl: 2, m: 0 }} spacing={0.5}>
                  {step.bullets.map((item) => (
                    <Typography key={item} component="li" color="text.secondary">
                      {item}
                    </Typography>
                  ))}
                </Stack>
              </Box>
              {idx < flowSteps.length - 1 && (
                <Typography sx={{ textAlign: "center", py: 0.8 }} color="primary.main" fontWeight={700}>
                  ↓
                </Typography>
              )}
            </Box>
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="h4" mb={1}>
          判斷紀錄方式
        </Typography>
        <Typography color="text.secondary" mb={1.5}>
          至少記錄 3 筆，再看重複模式，不用單一事件下結論。
        </Typography>
        <Stack spacing={0.75}>
          {records.map((item) => (
            <Typography key={item}>• {item}</Typography>
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="h4" mb={2}>
          常見誤判修正
        </Typography>
        <Stack spacing={1.25}>
          {corrections.map((item) => (
            <Box key={item.wrong} sx={{ p: 2, borderRadius: 2, bgcolor: "rgba(19,34,56,0.03)" }}>
              <Typography fontWeight={600}>常見誤判：{item.wrong}</Typography>
              <Typography color="text.secondary">修正方式：{item.fix}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="h4" mb={1}>
          下一步入口
        </Typography>
        <Typography color="text.secondary" mb={2}>
          把上面的觀察，帶去功能與類型頁面交叉驗證。
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Typography color="text.secondary" mb={2}>
            目前可對照功能：{functions?.length ?? 0} 個
          </Typography>
        )}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button component={Link} to="/functions" variant="contained" size="large">
            查看認知功能細節
          </Button>
          <Button component={Link} to="/types" variant="outlined" size="large">
            對照類型功能堆疊
          </Button>
        </Stack>
      </Box>

      <Alert severity="info">人格傾向是長期偏好的認知策略，不是固定性格，也不是單一情境結果。</Alert>
    </Stack>
  );
}
