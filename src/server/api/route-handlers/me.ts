import { StatusCode } from "status-code-enum";
import { RouteHandler } from "~/server/types";

export const getMe: RouteHandler = async (db) => {
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

  const currentUser = {
    createdAt: users[0].createdAt,
    userId: users[0].id,
  };

  return { status: StatusCode.SuccessOK, body: currentUser };
};
