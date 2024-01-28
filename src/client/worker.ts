import { wrap } from "comlink";
import { APIWorker } from "~/server/worker";

const worker = new Worker(new URL("~/server/worker.ts", import.meta.url));
const api = wrap<APIWorker>(worker);

export default api;
