import {
  NotFoundRoute,
  RootRoute,
  Route,
  Router,
  createBrowserHistory,
} from "@tanstack/react-router";
import App from "./components/App";

const rootRoute = new RootRoute();

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: App,
});

const routeTree = rootRoute.addChildren([indexRoute, notFoundRoute]);

const history = createBrowserHistory();

const router = new Router({
  history,
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;