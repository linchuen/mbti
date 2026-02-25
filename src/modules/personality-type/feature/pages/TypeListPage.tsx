import { Box, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTypesQuery } from "../hooks/useTypesQuery";

export function TypeListPage() {
  const { data, isLoading } = useTypesQuery();

  return (
    <Stack spacing={3}>
      <Typography variant="h3">人格類型</Typography>
      <Typography color="text.secondary">類型是功能排序後的處理偏好結果。</Typography>
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
            <Card key={item.id} component={Link} to={`/types/${item.id}`} sx={{ textDecoration: "none" }}>
              <CardContent>
                <Typography variant="h5">{item.type_code}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.stack_summary}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Stack>
  );
}
