import { ErrorBoundary, Provider as RollbarProvider } from "@rollbar/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import Analytics from "analytics";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { AnalyticsProvider } from "use-analytics";
import { analyticsConfig } from "~/client/analytics";
import AgreementRequired from "~/client/components/AgreementRequired";
import InitializationRequired from "~/client/components/InitializationRequired";
import { UserProvider } from "~/client/contexts/UserContext";
import router from "~/client/router";
import { rollbarConfig } from "~/shared/rollbar";
import "modern-normalize";
import "~/client/index.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

const analytics = Analytics(analyticsConfig);

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AgreementRequired>
            <AnalyticsProvider instance={analytics}>
              <InitializationRequired>
                <UserProvider>
                  <RouterProvider router={router} />
                </UserProvider>
              </InitializationRequired>
            </AnalyticsProvider>
          </AgreementRequired>
        </QueryClientProvider>
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>,
);
