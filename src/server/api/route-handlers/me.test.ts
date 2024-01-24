import { IDBKeyRange, indexedDB } from "fake-indexeddb";
import StatusCode from "status-code-enum";
import { v4 as uuidv4 } from "uuid";
import { getMe } from "./me";

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
  });
});
