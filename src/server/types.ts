import { StatusCode } from "status-code-enum";
import { AppDatabase } from "~/server/database";

export type RouteHandlerResponse = {
  status: StatusCode;
  body?: unknown;
};

export type RouteHandler = (
  db: AppDatabase,
  parameters: Partial<Record<string, string>>,
  payload: unknown,
) => Promise<RouteHandlerResponse>;

export type APIResponse = {
  status: StatusCode;
  body?: string;
};
