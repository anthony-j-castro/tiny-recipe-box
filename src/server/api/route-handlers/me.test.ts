import { IDBKeyRange, indexedDB } from "fake-indexeddb";
import StatusCode from "status-code-enum";
import { v4 as uuidv4 } from "uuid";
import { createMe, getMe } from "./me";

describe("server/api/route-handlers/me", () => {
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

  describe("getMe", () => {
    it("returns the current user when 1 record exists", async () => {
      const { getDatabase } = await import("~/server/database");
      const db = getDatabase();

      const user = {
        createdAt: new Date(),
        id: uuidv4(),
      };

      await db.users.add(user);

      const meResponse = await getMe(db);

      expect(meResponse).toEqual({
        status: StatusCode.SuccessOK,
        body: {
          createdAt: user.createdAt,
          userId: user.id,
        },
      });
    });

    it("returns a not found error when 0 records exist", async () => {
      const { getDatabase } = await import("~/server/database");
      const db = getDatabase();

      const meResponse = await getMe(db);

      expect(meResponse).toEqual({
        status: StatusCode.ClientErrorNotFound,
        body: {
          message: "User not found.",
        },
      });
    });

    it("returns a server error when > 1 records exist", async () => {
      const { getDatabase } = await import("~/server/database");
      const db = getDatabase();

      await db.users.bulkAdd([
        { createdAt: new Date(), id: uuidv4() },
        { createdAt: new Date(), id: uuidv4() },
      ]);

      const meResponse = await getMe(db);

      expect(meResponse).toEqual({
        status: StatusCode.ServerErrorInternal,
        body: {
          message:
            "Cannot determine current user. Unexpected number of users found.",
        },
      });
    });
  });

  describe("createMe", () => {
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("returns a new user", async () => {
      const { getDatabase } = await import("~/server/database");
      const db = getDatabase();
      const meResponse = await createMe(db);

      expect(meResponse).toEqual({
        status: StatusCode.SuccessCreated,
        body: {
          createdAt: new Date(),
          userId: expect.any(String),
        },
      });
    });
  });
});
