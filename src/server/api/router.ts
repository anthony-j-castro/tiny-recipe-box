import { either, jsonObject, undefined_ } from "decoders";
import type { HTTPMethod } from "http-method-enum";
import { StatusCode } from "status-code-enum";
import { getDatabase } from "~/server/database";
import rollbar from "~/server/rollbar";
import type { APIResponse, RouteHandler } from "~/server/types";
import simulateLatency from "~/server/utils/simulateLatency";

const PARAMETER = "([^/]*)";
const SLASH = "\\/";

type RoutesMap = Partial<
  Record<
    HTTPMethod,
    Record<
      string,
      {
        handler: RouteHandler<unknown>;
        parameters: string[];
        regex: string;
      }
    >
  >
>;

const routes: RoutesMap = {};

export const defineRoute = (
  method: HTTPMethod,
  path: string,
  handler: RouteHandler<unknown>,
): void => {
  const pathParts = path.split("/");

  const parameters: string[] = [];
  let pathRegex = "";

  if (pathParts[0] !== "") {
    throw new Error('API path must begin with a "/".');
  }

  pathParts.forEach((part, index) => {
    if (index > 0) {
      pathRegex += SLASH;
      if (part.startsWith(":")) {
        pathRegex += PARAMETER;
        parameters.push(part.substring(1));
      } else {
        pathRegex += part;
      }
    }
  });

  pathRegex += "$";

  if (routes[method]?.[path] !== undefined) {
    throw new Error(`Handler already exists for ${method} ${path}.`);
  }

  routes[method] = {
    ...routes[method],
    [path]: { handler, regex: pathRegex, parameters },
  };
};

export const handleRequest = async ({
  body,
  headers,
  method,
  path,
}: {
  method: HTTPMethod;
  path: string;
  body?: unknown;
  headers?: HeadersInit | undefined;
}): Promise<APIResponse> => {
  await simulateLatency();

  try {
    const theRoutes = routes[method];

    for (const key in theRoutes) {
      const route = theRoutes[key];
      const regex = new RegExp(route.regex);
      const isMatchingPath = regex.test(path);

      if (isMatchingPath) {
        const matches = path.match(regex);

        if (
          matches === null ||
          matches.length - 1 !== route.parameters.length
        ) {
          const impossibleErrorMessage =
            "Impossible condition met: API route matched but parameters don't match.";

          rollbar.error(impossibleErrorMessage, {
            path,
            extractedParameters: matches,
            routeParameters: route.parameters,
          });

          throw new Error(impossibleErrorMessage);
        }

        const params: Record<string, string> = {};
        route.parameters.forEach((param, index) => {
          params[param] = matches[index + 1];
        });

        const parsedBody = either(jsonObject, undefined_).verify(body);

        const db = getDatabase();

        const response = await route.handler({
          db,
          parameters: params,
          headers,
          payload: parsedBody,
        });

        return {
          status: response.status,
          ...(response.body ? { body: JSON.stringify(response.body) } : {}),
        };
      }
    }

    rollbar.error("Bad request to API.", {
      method,
      path,
      body,
    });

    return {
      status: StatusCode.ClientErrorBadRequest,
      body: JSON.stringify({
        message: `Cannot process ${method} request to ${path}.`,
      }),
    };
  } catch (error) {
    return {
      status: StatusCode.ServerErrorInternal,
      body: JSON.stringify({ message: "An unknown error occurred." }),
    };
  }
};
