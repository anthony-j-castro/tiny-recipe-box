import { StatusCode } from "status-code-enum";
import { v4 as uuidv4 } from "uuid";
import { RouteHandler } from "~/server/types";

type CurrentUser = {
  createdAt: string;
  userId: string;
};

export const getMe: RouteHandler<CurrentUser> = async (db) => {
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
    createdAt: users[0].createdAt.toISOString(),
    userId: users[0].id,
  };

  return { status: StatusCode.SuccessOK, body: currentUser };
};

export const createMe: RouteHandler<CurrentUser> = async (db) => {
  const createdAt = new Date();
  const id = uuidv4();

  const user = { createdAt, id };

  await db.users.add(user);

  return {
    status: StatusCode.SuccessCreated,
    body: { createdAt: createdAt.toISOString(), userId: id },
  };
};
