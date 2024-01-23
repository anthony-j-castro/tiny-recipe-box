import { either, jsonObject, undefined_ } from "decoders";
import { HTTPMethod } from "http-method-enum";
import { StatusCode } from "status-code-enum";
import { getDatabase } from "~/server/database";
import rollbar from "~/server/rollbar";
import { APIResponse, RouteHandler } from "~/server/types";
import simulateLatency from "~/server/utils/simulateLatency";

const PARAMETER = "([^/]*)";
const SLASH = "\\/";

type RoutesMap = Partial<
  Record<
    HTTPMethod,
    {
      [path: string]: {
        handler: RouteHandler;
        parameters: string[];
        regex: string;
      };
    }
  >
>;

const routes: RoutesMap = {};

export function defineRoute(
  method: HTTPMethod,
  path: string,
  handler: RouteHandler,
): void {
  const pathParts = path.split("/");

  const parameters: string[] = [];
  let pathRegex = "";

  if (pathParts[0] !== "") {
    throw new Error("Check the route");
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

  routes[method] = {
    ...routes[method],
    [path]: { handler, regex: pathRegex, parameters },
  };

  console.log(routes);
}

export async function handleRequest(
  method: HTTPMethod,
  path: string,
  body: unknown,
): Promise<APIResponse> {
  try {
    const theRoutes = routes[method];
    console.log("Handling:", method, path);
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
          rollbar.error(
            "Impossible condition met: API route matched but parameters don't match.",
            {
              path,
              extractedParameters: matches,
              routeParameters: route.parameters,
            },
          );
          throw new Error("Something happened!");
        }

        const params: Record<string, string> = {};
        route.parameters.forEach((param, index) => {
          params[param] = matches[index + 1];
        });

        console.log(
          "MATCH",
          method,
          path,
          params,
          route.regex,
          route.parameters,
          "BODY",
          body,
        );

        // TODO: What if body is an object?
        //const parsedBody = typeof body === "string" ? JSON.parse(body) : {};
        const parsedBody = either(jsonObject, undefined_).verify(body);

        await simulateLatency();

        const db = getDatabase();
        const response = await route.handler(db, params, parsedBody);

        return {
          status: response.status,
          body: JSON.stringify(response.body),
        };
      }
    }

    rollbar.error("Bad request to API.", {
      method,
      path,
      body,
    });

    // Alow no body
    return {
      status: StatusCode.ClientErrorBadRequest,
      body: JSON.stringify({}),
    };
  } catch (error) {
    return {
      status: StatusCode.ServerErrorInternal,
      body: JSON.stringify({ message: "An unknown error occurred." }),
    };
  }
}
