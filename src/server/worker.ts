import { expose } from "comlink";
import initializeApi from "~/server/api";
import { handleRequest } from "~/server/api/router";
import { getDatabaseExists, initializeDatabase } from "~/server/database";
import simulateLatency from "~/server/utils/simulateLatency";

initializeApi();

const apiServer = {
  getDatabaseExists: async () => {
    await simulateLatency();

    return getDatabaseExists();
  },
  handleRequest,
  initializeDatabase: async () => {
    await simulateLatency();

    initializeDatabase();

    return true;
  },
};

export type APIWorker = typeof apiServer;

expose(apiServer);
