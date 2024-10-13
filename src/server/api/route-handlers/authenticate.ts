import { StatusCode } from "status-code-enum";
import type { RouteHandler } from "~/server/types";

type UserId = {
  userId: string;
};

export const authenticateMe: RouteHandler<UserId> = async ({ db }) => {
  const users = await db.users.toArray();

  if (users.length === 0) {
    return {
      status: StatusCode.ClientErrorNotFound,
      body: {
        message: "User not found.",
      },
    };
  }

  if (users.length > 1) {
    return {
      status: StatusCode.ServerErrorInternal,
      body: {
        message:
          "Cannot determine current user. Unexpected number of users found.",
      },
    };
  }

  return { status: StatusCode.SuccessOK, body: { userId: users[0].id } };
};
