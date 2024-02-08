import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import AppLayout from "~/client/components/AppLayout";
import ExtensionPage from "~/client/pages/ExtensionPage";
import HomePage from "~/client/pages/HomePage";
import NotFoundPage from "~/client/pages/NotFoundPage";
import SettingsPage from "~/client/pages/SettingsPage";

const rootRoute = createRootRoute({
  component: AppLayout,
  notFoundComponent: NotFoundPage,
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

const extensionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/browser-extension",
  component: ExtensionPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  settingsRoute,
  extensionRoute,
]);

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
