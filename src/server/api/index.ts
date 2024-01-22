import HTTPMethod from "http-method-enum";
import { getMe } from "~/server/api/route-handlers/me";
import { defineRoute } from "~/server/api/router";

const initializeApi = () => {
  defineRoute(HTTPMethod.GET, "/me", getMe);
};

export default initializeApi;
