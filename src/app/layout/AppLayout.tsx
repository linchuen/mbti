import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useUiStore } from "../../shared/hooks/useUiStore";

const navItems = [
  { label: "首頁", path: "/" },
  { label: "功能", path: "/functions" },
  { label: "類型", path: "/types" }
];

export function AppLayout() {
  const location = useLocation();
  const compactMode = useUiStore((s) => s.compactMode);
  const setCompactMode = useUiStore((s) => s.setCompactMode);

  return (
    <Box minHeight="100dvh">
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{ backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(19,34,56,0.08)" }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between", py: 1 }}>
            <Typography variant="h6">Cognitive Atlas</Typography>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={() => setCompactMode(!compactMode)}>
                {compactMode ? "一般間距" : "緊湊間距"}
              </Button>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  color={location.pathname.startsWith(item.path) && item.path !== "/" ? "secondary" : "primary"}
                  variant={location.pathname === item.path ? "contained" : "text"}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
        <Box sx={{ "& .MuiCard-root": { borderRadius: compactMode ? 2 : 3 } }}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}
