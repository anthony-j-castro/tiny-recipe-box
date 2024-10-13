import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import AppLayout from "~/client/components/AppLayout";
import DemoRecipePage from "~/client/pages/DemoRecipePage";
import ExtensionPage from "~/client/pages/ExtensionPage";
import HomePage from "~/client/pages/HomePage";
import ImportRecipePage from "~/client/pages/ImportRecipePage";
import NotFoundPage from "~/client/pages/NotFoundPage";
import SettingsPage from "~/client/pages/SettingsPage";

const rootRoute = createRootRoute({
  component: AppLayout,
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

const importRecipeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/import-recipe",
  component: ImportRecipePage,
});

const sandboxRoutes = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sandbox",
});
const demoRecipeRoute = createRoute({
  getParentRoute: () => sandboxRoutes,
  path: "/demo-recipe",
  component: DemoRecipePage,
});
sandboxRoutes.addChildren([demoRecipeRoute]);

const routeTree = rootRoute.addChildren([
  indexRoute,
  settingsRoute,
  extensionRoute,
  importRecipeRoute,
  sandboxRoutes,
]);

const history = createBrowserHistory();

const router = createRouter({
  history,
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
