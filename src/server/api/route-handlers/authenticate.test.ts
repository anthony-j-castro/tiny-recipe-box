import { IDBKeyRange, indexedDB } from "fake-indexeddb";
import { v4 as uuidv4 } from "uuid";
import { authenticateMe } from "./authenticate";

describe("server/api/route-handlers/authenticate", () => {
  beforeEach(async () => {
    jest.resetModules();

    const { initializeDatabase } = await import("~/server/database");
    initializeDatabase({
      indexedDB,
      IDBKeyRange,
    });
  });

  afterEach(async () => {
    const { getDatabase } = await import("~/server/database");
    const db = getDatabase();

    return db.delete();
  });

  describe("authenticateMe", () => {
    it("returns the current user when 1 record exists", async () => {
      const { getDatabase } = await import("~/server/database");
      const db = getDatabase();

      const user = {
        createdAt: new Date(),
        id: uuidv4(),
      };

      await db.users.add(user);

      const meResponse = await authenticateMe({ db });

      expect(meResponse).toEqual({
        status: 200,
        body: {
          userId: user.id,
        },
      });
    });

    it("returns a not found error when 0 records exist", async () => {
      const { getDatabase } = await import("~/server/database");
      const db = getDatabase();

      const meResponse = await authenticateMe({ db });

      expect(meResponse).toEqual({
        status: 404,
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

      const meResponse = await authenticateMe({ db });

      expect(meResponse).toEqual({
        status: 500,
        body: {
          message:
            "Cannot determine current user. Unexpected number of users found.",
        },
      });
    });
  });
});
