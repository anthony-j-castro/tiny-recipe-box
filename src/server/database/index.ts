import Dexie, { DexieOptions } from "dexie";
import { v4 as uuidv4 } from "uuid";

const DATABASE_NAME = "TinyRecipeBoxDB_";

type User = {
  createdAt: Date;
  id: string;
};

export class AppDatabase extends Dexie {
  users!: Dexie.Table<User, string>;

  constructor(dexieOptions: DexieOptions | undefined) {
    super(DATABASE_NAME, dexieOptions);

    this.version(1).stores({
      users: "&id",
    });

    this.on("populate", () => {
      this.users.add({ createdAt: new Date(), id: uuidv4() });
    });
  }
}

let database: AppDatabase | undefined;

export const initializeDatabase = (dexieOptions?: DexieOptions) => {
  database = new AppDatabase(dexieOptions);

  return database;
};

export const getDatabase = () => {
  if (!database) {
    throw new Error("Database has not been initialized.");
  }

  return database;
};
