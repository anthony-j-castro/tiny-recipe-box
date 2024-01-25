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

      const meResponse = await getMe({ db, currentUserId: user.id });

      expect(meResponse).toEqual({
        status: StatusCode.SuccessOK,
        body: {
          createdAt: user.createdAt,
          userId: user.id,
        },
      });
    });

    it("throws an error when no current user ID is passed in", async () => {
      const { getDatabase } = await import("~/server/database");
      const db = getDatabase();

      await expect(getMe({ db })).rejects.toThrow(
        "No authenticated user provided.",
      );
    });

    it("throws an error when the current user ID doesn't exist in the database", async () => {
      const { getDatabase } = await import("~/server/database");
      const db = getDatabase();

      const user = {
        createdAt: new Date(),
        id: uuidv4(),
      };

      await db.users.add(user);

      const unusedUserId = uuidv4();

      await expect(getMe({ db, currentUserId: unusedUserId })).rejects.toThrow(
        "Authenticated user not found.",
      );
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
      const meResponse = await createMe({ db });

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
