import { IDBKeyRange, indexedDB } from "fake-indexeddb";
import HTTPMethod from "http-method-enum";
import StatusCode from "status-code-enum";
import type { RouteHandler } from "~/server/types";

describe("server/router", () => {
  beforeEach(async () => {
    jest.resetModules();

    const { initializeDatabase } = await import("~/server/database");
    initializeDatabase({
      indexedDB: indexedDB,
      IDBKeyRange: IDBKeyRange,
    });
  });

  afterEach(async () => {
    const { getDatabase } = await import("~/server/database");
    const db = getDatabase();

    return db.delete();
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

      defineRoute(HTTPMethod.GET, "/test/path/1", handler);
      defineRoute(HTTPMethod.GET, "/test/path/2", handler);

      expect(() => {
        defineRoute(HTTPMethod.GET, "/test/path/1", handler);
      }).toThrow("Handler already exists for GET /test/path/1.");

      defineRoute(HTTPMethod.POST, "/test/path/1", handler);

      expect(() => {
        defineRoute(HTTPMethod.POST, "/test/path/1", handler);
      }).toThrow("Handler already exists for POST /test/path/1.");
    });
  });

  describe("handleRequest", () => {
    it("returns the correct response", async () => {
      const { defineRoute, handleRequest } = await import(
        "~/server/api/router"
      );

      const handler: RouteHandler<unknown> = async () => ({
        status: StatusCode.SuccessOK,
        body: {
          message: "OK",
        },
      });

      defineRoute(HTTPMethod.GET, "/test/path", handler);

      const response = await handleRequest({
        method: HTTPMethod.GET,
        path: "/test/path",
      });

      expect(response).toEqual({
        status: 200,
        body: JSON.stringify({ message: "OK" }),
      });
    });

    it("returns a response without a body key when no content is expected", async () => {
      const { defineRoute, handleRequest } = await import(
        "~/server/api/router"
      );

      const handler: RouteHandler<unknown> = async () => ({
        status: StatusCode.SuccessNoContent,
      });

      defineRoute(HTTPMethod.POST, "/no/content/path", handler);

      const response = await handleRequest({
        method: HTTPMethod.POST,
        path: "/no/content/path",
      });

      expect(response).toEqual({
        status: 204,
      });
    });

    it("returns a bad request error when path doesn't match any routes", async () => {
      const { handleRequest } = await import("~/server/api/router");

      const response = await handleRequest({
        method: HTTPMethod.GET,
        path: "/bad/path",
      });

      expect(response).toEqual({
        status: 400,
        body: JSON.stringify({
          message: "Cannot process GET request to /bad/path.",
        }),
      });
    });

    it("returns a server error when an unhandled error is thrown", async () => {
      const { defineRoute, handleRequest } = await import(
        "~/server/api/router"
      );

      const handler: RouteHandler<unknown> = async () => {
        throw new Error("Unhandled error.");
      };

      defineRoute(HTTPMethod.GET, "/test/path", handler);

      const response = await handleRequest({
        method: HTTPMethod.GET,
        path: "/test/path",
      });

      expect(response).toEqual({
        status: 500,
        body: JSON.stringify({ message: "An unknown error occurred." }),
      });
    });
  });
});
