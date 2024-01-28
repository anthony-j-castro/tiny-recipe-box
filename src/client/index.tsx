import { ErrorBoundary, Provider as RollbarProvider } from "@rollbar/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import InitializationRequired from "~/client/components/InitializationRequired";
import { UserProvider } from "~/client/contexts/UserContext";
import router from "~/client/router";
import { rollbarConfig } from "~/shared/rollbar";
import "modern-normalize";
import "~/client/index.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <InitializationRequired>
            <UserProvider>
              <RouterProvider router={router} />
            </UserProvider>
          </InitializationRequired>
        </QueryClientProvider>
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>,
);
