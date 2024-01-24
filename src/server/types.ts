import { StatusCode } from "status-code-enum";
import { AppDatabase } from "~/server/database";

type ErrorResponseBody = {
  message: string;
};

export type RouteHandlerResponse<T> = {
  status: StatusCode;
  body?: T | ErrorResponseBody;
};

export type RouteHandler<T> = (
  db: AppDatabase,
  parameters?: Partial<Record<string, string>>,
  payload?: unknown,
) => Promise<RouteHandlerResponse<T>>;

export type APIResponse = {
  status: StatusCode;
  body?: string;
};
