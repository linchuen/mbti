import { Box, Button, Card, CardContent, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useFunctionsQuery } from "../../cognitive-function/feature/hooks/useFunctionsQuery";
import { AppIcon } from "../../../shared/ui/icons/AppIcon";

export function HomePage() {
  const { data: functions, isLoading } = useFunctionsQuery();

  return (
    <Stack spacing={6}>
      <Card sx={{ p: { xs: 2, md: 4 }, background: "linear-gradient(160deg, #fffaf2, #f4ede2)" }}>
        <Stack spacing={2}>
          <Typography variant="h3">人格不是你是誰，而是你如何理解世界</Typography>
          <Typography variant="h6" color="text.secondary">
            本站解釋榮格認知功能如何形成思考與決策方式
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button component={Link} to="/functions" variant="contained" size="large">
              認識認知功能
            </Button>
            <Button component={Link} to="/types" variant="outlined" size="large">
              查看人格類型
            </Button>
          </Stack>
        </Stack>
      </Card>

      <Box>
        <Typography variant="h4" mb={2}>
          認知功能總覽
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" }
            }}
          >
            {functions?.map((item) => (
              <Box key={item.id}>
                <Card component={Link} to={`/functions/${item.id}`} sx={{ textDecoration: "none", height: "100%" }}>
                  <CardContent>
                    <Stack spacing={1.5}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <AppIcon name={`function.${item.name}`} />
                        <Typography variant="h6">{item.name}</Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {item.short_summary}
                      </Typography>
                      <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
                        {item.keyword.map((kw) => (
                          <Chip key={kw} label={kw} size="small" />
                        ))}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Card sx={{ p: 3 }}>
        <Typography variant="h4" mb={2}>
          人格形成流程
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} alignItems={{ md: "center" }}>
          {["感知方式", "判斷方式", "功能排序", "人格傾向"].map((step, idx) => (
            <Stack key={step} direction="row" spacing={1} alignItems="center">
              <Chip label={`${idx + 1}. ${step}`} color="primary" variant="outlined" />
              {idx < 3 && (
                <Typography color="text.secondary" sx={{ display: { xs: "none", md: "block" } }}>
                  →
                </Typography>
              )}
            </Stack>
          ))}
        </Stack>
        <Typography color="text.secondary" mt={2}>
          人格類型是長期偏好的認知策略，而非固定性格
        </Typography>
      </Card>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }
        }}
      >
        <Box>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Stack spacing={1.5}>
                <Typography variant="h5">從功能開始理解</Typography>
                <Typography color="text.secondary">先理解認知運作，再理解類型</Typography>
                <Button component={Link} to="/functions" variant="contained">
                  前往功能
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Stack spacing={1.5}>
                <Typography variant="h5">我已知道類型</Typography>
                <Typography color="text.secondary">直接查看功能堆疊與運作方式</Typography>
                <Button component={Link} to="/types" variant="outlined">
                  前往類型
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Stack>
  );
}
