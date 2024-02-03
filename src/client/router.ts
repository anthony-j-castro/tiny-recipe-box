import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import AppLayout from "~/client/components/AppLayout";
import SettingsPage from "~/client/components/SettingsPage";
import HomePage from "~/client/pages/HomePage";

const rootRoute = createRootRoute({
  component: AppLayout,
  notFoundComponent: AppLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([indexRoute, settingsRoute]);

const history = createBrowserHistory();

const router = createRouter({
  history,
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
