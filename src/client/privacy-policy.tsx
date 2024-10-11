import Analytics from "analytics";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { AnalyticsProvider } from "use-analytics";
import PrivacyPolicyPage from "~/client/pages/PrivacyPolicyPage";
import theme from "~/client/theme";
import "modern-normalize";
import "~/client/index.css";

const analytics = Analytics({});

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AnalyticsProvider instance={analytics}>
        <PrivacyPolicyPage isSandboxed />
      </AnalyticsProvider>
    </ThemeProvider>
  </StrictMode>,
);
