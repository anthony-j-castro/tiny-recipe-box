import HTTPMethod from "http-method-enum";
import { authMiddleware } from "~/server/api/auth";
import { createMe, getMe } from "~/server/api/route-handlers/me";
import { defineRoute } from "~/server/api/router";

const initializeApi = () => {
  defineRoute(HTTPMethod.GET, "/me", authMiddleware(getMe));
  defineRoute(HTTPMethod.POST, "/me", createMe);
};

export default initializeApi;
