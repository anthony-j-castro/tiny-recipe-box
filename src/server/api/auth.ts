import { object, uuidv4 } from "decoders";
import StatusCode from "status-code-enum";
import { RouteHandler } from "~/server/types";

const AUTH_HEADER = "Tiny-Recipe-Box-User-ID";

const authHeaderDecoder = object({
  [AUTH_HEADER]: uuidv4,
});

const unauthorizedResponse = {
  status: StatusCode.ClientErrorUnauthorized,
  body: { message: "User ID required." },
};

export const authMiddleware: <T>(handler: RouteHandler<T>) => RouteHandler<T> =
  (handler) =>
  async ({ db, headers, parameters, payload }) => {
    const authHeaders = authHeaderDecoder.value(headers);

    if (authHeaders === undefined) {
      return unauthorizedResponse;
    }

    const currentUserId = authHeaders[AUTH_HEADER];

    const currentUser = await db.users.get(currentUserId);

    if (currentUser === undefined) {
      return unauthorizedResponse;
    }

    return handler({ currentUserId, db, headers, parameters, payload });
  };
