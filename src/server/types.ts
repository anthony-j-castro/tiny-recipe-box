import { StatusCode } from "status-code-enum";
import { AppDatabase } from "~/server/database";

type ErrorResponseBody = {
  message: string;
};

export type RouteHandlerResponse<T> = {
  status: StatusCode;
  body?: T | ErrorResponseBody;
};

export type RouteHandler<T> = ({
  currentUserId,
  db,
  headers,
  parameters,
  payload,
}: {
  currentUserId?: string;
  db: AppDatabase;
  headers?: HeadersInit;
  parameters?: Partial<Record<string, string>>;
  payload?: unknown;
}) => Promise<RouteHandlerResponse<T>>;

export type APIResponse = {
  status: StatusCode;
  body?: string;
};
