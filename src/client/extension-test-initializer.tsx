import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Analytics from "analytics";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { AnalyticsProvider } from "use-analytics";
import ExtensionTestInitializerPage from "~/client/pages/ExtensionTestInitializerPage";
import theme from "~/client/theme";
import "~/client/index.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

const analytics = Analytics({});

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AnalyticsProvider instance={analytics}>
          <ExtensionTestInitializerPage />
        </AnalyticsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
