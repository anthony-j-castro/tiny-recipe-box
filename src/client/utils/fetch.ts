import assertIsHTTPMethod from "~/client/utils/assertIsHTTPMethod";
import worker from "~/client/worker";

const fetch = async (
  resource: string,
  init: RequestInit = { method: "GET" },
) => {
  const { body, headers, method = "GET" } = init;

  assertIsHTTPMethod(method);

  const response = await worker.handleRequest({
    method,
    path: resource,
    headers,
    body,
  });

  return new Response(response.body, { status: response.status });
};

export default fetch;
