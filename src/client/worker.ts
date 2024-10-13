import { wrap } from "comlink";
import type { ServerWorker } from "~/server/worker";

const worker = new Worker(new URL("~/server/worker.ts", import.meta.url));
const api = wrap<ServerWorker>(worker);

export default api;
