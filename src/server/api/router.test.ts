import HTTPMethod from "http-method-enum";
import StatusCode from "status-code-enum";
import { RouteHandler } from "~/server/types";

describe("server/router", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    jest.resetModules();
  });

  describe("defineRoute", () => {
    it("throws an error on duplicate routes", async () => {
      const { defineRoute } = await import("~/server/api/router");

      const handler: RouteHandler<unknown> = async () => ({
        status: StatusCode.SuccessOK,
        body: {},
      });

      defineRoute(HTTPMethod.GET, "/test", handler);

      expect(() => {
        defineRoute(HTTPMethod.GET, "/test", handler);
      }).toThrow("Handler already exists for GET /test.");

      defineRoute(HTTPMethod.POST, "/test", handler);

      expect(() => {
        defineRoute(HTTPMethod.POST, "/test", handler);
      }).toThrow("Handler already exists for POST /test.");
    });
  });
});
