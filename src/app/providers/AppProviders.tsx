import { PropsWithChildren } from "react";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { appTheme } from "../theme/theme";

const queryClient = new QueryClient();

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            background:
              "radial-gradient(circle at 20% 10%, rgba(187,90,43,0.12), transparent 32%), radial-gradient(circle at 85% 25%, rgba(31,70,103,0.1), transparent 30%), #f3efe8"
          }
        }}
      />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
