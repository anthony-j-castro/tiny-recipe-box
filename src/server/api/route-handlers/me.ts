import { StatusCode } from "status-code-enum";
import { v4 as uuidv4 } from "uuid";
import { RouteHandler } from "~/server/types";

type CurrentUser = {
  createdAt: Date;
  userId: string;
};

export const getMe: RouteHandler<CurrentUser> = async ({
  currentUserId,
  db,
}) => {
  if (currentUserId === undefined) {
    // This should be impossible to reach under normal circumstances,
    // as the user was already authenticated and passed in by the
    // auth middleware.
    throw new Error("No authenticated user provided.");
  }

  const user = await db.users.get(currentUserId);

  if (user === undefined) {
    // This should also be impossible, since the previous check also
    // means this user should be in the databse.
    throw new Error("Authenticated user not found.");
  }

  const currentUser = {
    createdAt: user.createdAt,
    userId: user.id,
  };

  return { status: StatusCode.SuccessOK, body: currentUser };
};

export const createMe: RouteHandler<CurrentUser> = async ({ db }) => {
  const createdAt = new Date();
  const id = uuidv4();

  const user = { createdAt, id };

  await db.users.add(user);

  return {
    status: StatusCode.SuccessCreated,
    body: { createdAt: createdAt, userId: id },
  };
};
