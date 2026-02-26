import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import { useFunctionsQuery } from "../../cognitive-function/feature/hooks/useFunctionsQuery";

const principles = [
  "以處理資訊方式為判斷對象",
  "以長期重複模式為判斷證據",
  "以壓力下的反應偏移做交叉驗證"
];

const steps = [
  {
    title: "Step 1 感知方式",
    points: ["外部即時訊號（Se / Ne 傾向）", "內部既有脈絡（Si / Ni 傾向）"]
  },
  {
    title: "Step 2 判斷方式",
    points: ["邏輯一致性（Ti / Te 傾向）", "價值一致性（Fi / Fe 傾向）"]
  },
  {
    title: "Step 3 功能排序",
    points: [
      "依自然使用頻率 + 壓力時失衡點推估",
      "優勢功能（dominant）",
      "輔助功能（auxiliary）",
      "第三功能（tertiary）",
      "劣勢功能（inferior）"
    ]
  },
  {
    title: "Step 4 人格傾向",
    points: ["輸出認知運作傾向摘要", "不輸出最終類型判定"]
  }
];

const records = [
  {
    situation: "面對新任務時如何開始",
    perception: "先看外部訊號還是先對照內部既有框架",
    judgment: "最後用邏輯一致性或價值一致性下結論",
    stress: "時間壓力下是否切到不熟悉的處理方式"
  },
  {
    situation: "衝突討論時如何理解對方",
    perception: "先抓眼前事實或先推演深層脈絡",
    judgment: "優先系統效率或關係與價值一致",
    stress: "壓力時是否出現反常失衡的判斷"
  },
  {
    situation: "重大選擇前如何整理資訊",
    perception: "擴散探索可能性或聚焦收斂既有脈絡",
    judgment: "以可驗證邏輯或內在價值作為最後標準",
    stress: "若情境失控會出現哪種補償反應"
  }
];

const corrections = [
  {
    wrong: "我外向，所以一定是 Fe/Se",
    fix: "回到判斷標準，不看社交表現。"
  },
  {
    wrong: "我重感受，所以一定是 Fi",
    fix: "區分個人價值判斷與情緒強度。"
  },
  {
    wrong: "我工作理性，所以一定是 T 主導",
    fix: "分辨角色要求與自然偏好。"
  }
];

export function FormationProcessGuidePage() {
  const { data: functions, isLoading } = useFunctionsQuery();

  return (
    <Stack spacing={4}>
      <Card sx={{ p: { xs: 2.5, md: 4 }, background: "linear-gradient(160deg, #fffaf2, #f2f5ff)" }}>
        <Stack spacing={1.5}>
          <Typography variant="h3">先判斷流程，再理解人格</Typography>
          <Typography color="text.secondary">
            你要找的不是我像誰，而是我如何感知、判斷並形成穩定偏好。
          </Typography>
        </Stack>
      </Card>

      <Box>
        <Typography variant="h4" mb={2}>
          判斷前提（先看認知，不看標籤）
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }
          }}
        >
          {principles.map((item) => (
            <Card key={item} variant="outlined">
              <CardContent>
                <Typography>{item}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography variant="h4" mb={1}>
          人格形成流程判斷（四步）
        </Typography>
        <Typography color="text.secondary" mb={2}>
          感知方式 → 判斷方式 → 功能排序 → 人格傾向
        </Typography>
        <Stack spacing={2}>
          {steps.map((step) => (
            <Card key={step.title} variant="outlined">
              <CardContent>
                <Typography variant="h6" mb={1}>
                  {step.title}
                </Typography>
                <List dense disablePadding>
                  {step.points.map((point) => (
                    <ListItem key={point} disableGutters sx={{ py: 0.25 }}>
                      <ListItemText primary={`• ${point}`} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="h5" mb={1}>
          候選功能路徑參考
        </Typography>
        <Typography color="text.secondary" mb={2}>
          以下僅作為觀察標的，請用多次情境紀錄推估排序，不要用單一事件下結論。
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              display: "grid",
              gap: 1.5,
              gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" }
            }}
          >
            {functions?.map((item) => (
              <Card key={item.id} variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.short_summary}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      <Box>
        <Typography variant="h4" mb={2}>
          判斷紀錄表（可重複使用）
        </Typography>
        <Stack spacing={2}>
          {records.map((record) => (
            <Card key={record.situation} variant="outlined">
              <CardContent>
                <Stack spacing={0.75}>
                  <Typography variant="subtitle1">{record.situation}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    先感知：{record.perception}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    最後判斷：{record.judgment}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    壓力反應：{record.stress}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="h4" mb={2}>
          常見誤判修正
        </Typography>
        <Stack divider={<Divider flexItem />} spacing={0}>
          {corrections.map((item) => (
            <Box key={item.wrong} sx={{ py: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                常見誤判
              </Typography>
              <Typography>{item.wrong}</Typography>
              <Typography variant="subtitle2" color="text.secondary" mt={1}>
                修正方式
              </Typography>
              <Typography>{item.fix}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Alert severity="info">人格傾向是長期偏好的認知策略，不是固定性格或單一情境結果。</Alert>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <Button component={Link} to="/functions" variant="contained" size="large">
          查看認知功能細節
        </Button>
        <Button component={Link} to="/types" variant="outlined" size="large">
          對照類型功能堆疊
        </Button>
      </Stack>
    </Stack>
  );
}
