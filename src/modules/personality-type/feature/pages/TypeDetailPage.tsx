import { Alert, Box, Card, CardContent, CircularProgress, Divider, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useTypeDetailQuery } from "../hooks/useTypeDetailQuery";
import { useFunctionsOfTypeQuery } from "../hooks/useFunctionsOfTypeQuery";

export function TypeDetailPage() {
  const { type_code = "" } = useParams();
  const { data, isLoading } = useTypeDetailQuery(type_code);
  const { data: stackFunctions } = useFunctionsOfTypeQuery(type_code);

  if (isLoading) return <CircularProgress />;
  if (!data) return <Alert severity="warning">找不到此類型資料。</Alert>;

  return (
    <Stack spacing={3}>
      <Card>
        <CardContent>
          <Typography variant="h3">{data.type_code}</Typography>
          <Typography color="text.secondary">{data.stack_summary}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" mb={2}>
            功能堆疊（Stack）
          </Typography>
          <Stack spacing={1}>
            {stackFunctions?.map((item) => (
              <Card key={item.position} component={Link} to={`/functions/${item.function_id}`} sx={{ textDecoration: "none" }}>
                <CardContent sx={{ py: "12px !important" }}>
                  <Typography fontWeight={700} sx={{ textTransform: "capitalize" }}>
                    {item.position}
                  </Typography>
                  <Typography color="text.secondary">
                    {item.function_name} ({item.function_id})
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" mb={1}>
            認知處理順序（Processing Flow）
          </Typography>
          <Box component="ol" sx={{ pl: 2.5, m: 0 }}>
            {data.processing_flow.map((step) => (
              <Box component="li" key={step} sx={{ mb: 0.8 }}>
                <Typography>{step}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" mb={2}>
            發展階段（Development）
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography fontWeight={700}>early_stage</Typography>
              <Typography color="text.secondary">{data.development.early_stage}</Typography>
            </Box>
            <Box>
              <Typography fontWeight={700}>balancing_stage</Typography>
              <Typography color="text.secondary">{data.development.balancing_stage}</Typography>
            </Box>
            <Box>
              <Typography fontWeight={700}>mature_stage</Typography>
              <Typography color="text.secondary">{data.development.mature_stage}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" mb={1}>
            劣勢接管（Grip）
          </Typography>
          <Typography mb={1}>trigger: {data.grip.trigger}</Typography>
          <List dense>
            {data.grip.behaviors.map((item) => (
              <ListItem key={item}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
          <Typography color="text.secondary">recovery: {data.grip.recovery}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" mb={1}>
            互動誤會（Interaction Misunderstandings）
          </Typography>
          <Stack spacing={1.5}>
            {data.interaction_misunderstandings.map((item) => (
              <Box key={item.appearance}>
                <Typography fontWeight={700}>對方感受到：{item.appearance}</Typography>
                <Typography color="text.secondary">內在動機：{item.intention}</Typography>
                <Divider sx={{ mt: 1.5 }} />
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
