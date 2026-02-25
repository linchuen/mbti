import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1f4667"
    },
    secondary: {
      main: "#bb5a2b"
    },
    background: {
      default: "#f3efe8",
      paper: "#fffaf2"
    },
    text: {
      primary: "#132238",
      secondary: "#3f4f63"
    }
  },
  typography: {
    fontFamily: '"Segoe UI", "Noto Sans TC", sans-serif',
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.01em" },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 }
  },
  shape: {
    borderRadius: 14
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(19,34,56,0.08)",
          boxShadow: "0 8px 24px rgba(19,34,56,0.08)"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600
        }
      }
    }
  }
});
