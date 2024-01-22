import { expose } from "comlink";
import initializeApi from "~/server/api";
import { handleRequest } from "~/server/api/router";
import { initializeDatabase } from "~/server/database";

initializeDatabase();

initializeApi();

const apiServer = {
  handleRequest,
};

export type APIWorker = typeof apiServer;

expose(apiServer);
