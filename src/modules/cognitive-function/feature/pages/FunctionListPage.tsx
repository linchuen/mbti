import { Box, Card, CardContent, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AppIcon } from "../../../../shared/ui/icons/AppIcon";
import { useFunctionsQuery } from "../hooks/useFunctionsQuery";

export function FunctionListPage() {
  const { data, isLoading } = useFunctionsQuery();

  return (
    <Stack spacing={3}>
      <Typography variant="h3">認知功能</Typography>
      <Typography color="text.secondary">八個功能是理解人格處理流程的核心單位。</Typography>
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
          {data?.map((item) => (
            <Card key={item.id} component={Link} to={`/functions/${item.id}`} sx={{ textDecoration: "none" }}>
              <CardContent>
                <Stack spacing={1}>
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
          ))}
        </Box>
      )}
    </Stack>
  );
}
