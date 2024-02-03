import Analytics from "analytics";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "modern-normalize";
import "~/client/index.css";
import { AnalyticsProvider } from "use-analytics";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

const analytics = Analytics({});

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <AnalyticsProvider instance={analytics}>
      <PrivacyPolicyPage isSandboxed />
    </AnalyticsProvider>
  </React.StrictMode>,
);
