import HTTPMethod from "http-method-enum";
import { authMiddleware } from "~/server/api/auth";
import { authenticateMe } from "~/server/api/route-handlers/authenticate";
import { createMe, getMe } from "~/server/api/route-handlers/me";
import { defineRoute } from "~/server/api/router";

const initializeApi = () => {
  defineRoute(HTTPMethod.POST, "/authenticate", authenticateMe);

  defineRoute(HTTPMethod.GET, "/me", authMiddleware(getMe));
  defineRoute(HTTPMethod.POST, "/me", createMe);
};

export default initializeApi;
