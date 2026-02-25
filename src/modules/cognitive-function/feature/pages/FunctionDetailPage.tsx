import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
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
import { Link, useParams } from "react-router-dom";
import { AppIcon } from "../../../../shared/ui/icons/AppIcon";
import { useFunctionDetailQuery } from "../hooks/useFunctionDetailQuery";
import { useTypesByFunctionQuery } from "../../../personality-type/feature/hooks/useTypesByFunctionQuery";

export function FunctionDetailPage() {
  const { id = "" } = useParams();
  const { data, isLoading } = useFunctionDetailQuery(id);
  const { data: relatedTypes } = useTypesByFunctionQuery(id);

  if (isLoading) return <CircularProgress />;
  if (!data) return <Alert severity="warning">找不到此功能資料。</Alert>;

  return (
    <Stack spacing={3}>
      <Card>
        <CardContent>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <AppIcon name={`function.${data.name}`} />
            <Typography variant="h3">{data.name}</Typography>
          </Stack>
          <Typography variant="h6" color="secondary.main">
            {data.function_axis}
          </Typography>
          <Typography color="text.secondary">{data.short_summary}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" mb={1}>
            本質（Essence）
          </Typography>
          <Typography>{data.essence}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" mb={1}>
            內在處理流程（Process）
          </Typography>
          <Box component="ol" sx={{ pl: 2.5, m: 0 }}>
            {data.decision_flow.map((step) => (
              <Box component="li" key={step} sx={{ mb: 0.8 }}>
                <Typography>{step}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" mb={1}>
            日常表現（Manifestations）
          </Typography>
          <List dense>
            {data.daily_manifestations.map((item) => (
              <ListItem key={item}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" mb={1}>
            常見誤解（Misunderstandings）
          </Typography>
          <Stack spacing={1.5}>
            {data.misunderstandings.map((item) => (
              <Box key={item.appearance}>
                <Typography fontWeight={700}>他人看到：{item.appearance}</Typography>
                <Typography color="text.secondary">內在原因：{item.reason}</Typography>
                <Divider sx={{ mt: 1.5 }} />
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" mb={1}>
            壓力狀態（Stress）
          </Typography>
          <Typography mb={1}>{data.stress_pattern.description}</Typography>
          <List dense>
            {data.stress_pattern.behaviors.map((item) => (
              <ListItem key={item}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" mb={1}>
            功能衝突（Conflicts）
          </Typography>
          {data.conflicts.map((item) => (
            <Accordion key={item.target_function} disableGutters>
              <AccordionSummary expandIcon={<Typography>+</Typography>}>
                <Typography>與 {item.target_function.toUpperCase()} 的衝突</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{item.reason}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" mb={1}>
            使用此功能的類型（Related Types）
          </Typography>
          <Stack spacing={1}>
            {relatedTypes?.map((item) => (
              <Card
                key={`${item.type_code}-${item.stack_position}`}
                component={Link}
                to={`/types/${item.type_code.toLowerCase()}`}
                sx={{ textDecoration: "none" }}
              >
                <CardContent sx={{ py: "12px !important" }}>
                  <Typography fontWeight={700}>{item.type_code}</Typography>
                  <Typography color="text.secondary">{item.stack_position}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
