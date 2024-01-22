import { ErrorBoundary, Provider as RollbarProvider } from "@rollbar/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import router from "~/client/router";
import "modern-normalize";
import "~/client/index.css";

const rollbarConfig = {
  accessToken: "5da525f1eb8d44d1b61c21df3bb14654",
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: "development",
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>{" "}
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>,
);
