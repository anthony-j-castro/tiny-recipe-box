import { StatusCode } from "status-code-enum";
import { v4 as uuidv4 } from "uuid";
import rollbar from "~/server/rollbar";
import type { RouteHandler } from "~/server/types";

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
    // means this user should be in the database.
    throw new Error("Authenticated user not found.");
  }

  // This will attach the userId for the entire server. In a real server,
  // this probably wouldn't make sense, but it's good enough for this site.
  rollbar.configure({
    payload: {
      person: {
        id: user.id,
      },
    },
  });

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
