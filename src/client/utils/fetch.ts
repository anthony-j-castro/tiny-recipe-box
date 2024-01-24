import { wrap } from "comlink";
import assertIsHTTPMethod from "~/client/utils/assertIsHTTPMethod";
import { APIWorker } from "~/server/worker";

const worker = new Worker(new URL("~/server/worker.ts", import.meta.url));
const api = wrap<APIWorker>(worker);

const fetch = async (
  resource: string,
  init: RequestInit = { method: "GET" },
) => {
  const { body, headers, method = "GET" } = init;

  assertIsHTTPMethod(method);

  const response = await api.handleRequest({
    method,
    path: resource,
    headers,
    body,
  });

  return new Response(response.body, { status: response.status });
};

export default fetch;
