import { ErrorBoundary, Provider as RollbarProvider } from "@rollbar/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import Analytics from "analytics";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { AnalyticsProvider } from "use-analytics";
import { analyticsConfig } from "~/client/analytics";
import AgreementRequired from "~/client/components/AgreementRequired";
import InitializationRequired from "~/client/components/InitializationRequired";
import { ExtensionProvider } from "~/client/contexts/ExtensionContext";
import { UserProvider } from "~/client/contexts/UserContext";
import router from "~/client/router";
import theme from "~/client/theme";
import { rollbarConfig } from "~/shared/rollbar";
import "~/client/index.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

const analytics = Analytics(analyticsConfig);

const root = createRoot(document.querySelector("#root")!);

root.render(
  <StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <AgreementRequired>
              <AnalyticsProvider instance={analytics}>
                <InitializationRequired>
                  <ExtensionProvider>
                    <UserProvider>
                      <RouterProvider router={router} />
                    </UserProvider>
                  </ExtensionProvider>
                </InitializationRequired>
              </AnalyticsProvider>
            </AgreementRequired>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </RollbarProvider>
  </StrictMode>,
);
