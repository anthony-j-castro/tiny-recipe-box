import Analytics from "analytics";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "modern-normalize";
import "~/client/index.css";
import { AnalyticsProvider } from "use-analytics";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

const analytics = Analytics({});

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <AnalyticsProvider instance={analytics}>
      <PrivacyPolicyPage isSandboxed />
    </AnalyticsProvider>
  </StrictMode>,
);
