import HTTPMethod from "http-method-enum";
import StatusCode from "status-code-enum";
import { defineRoute } from "~/server/api/router";
import { RouteHandler } from "~/server/types";

describe("server/router", () => {
  describe("defineRoute", () => {
    it("throws an error on duplicate routes", () => {
      const handler: RouteHandler<unknown> = async () => ({
        status: StatusCode.SuccessOK,
        body: {},
      });

      defineRoute(HTTPMethod.GET, "/test", handler);
      expect(() => {
        defineRoute(HTTPMethod.GET, "/test", handler);
      }).toThrow("Handler already exists for GET /test.");
    });
  });
});
