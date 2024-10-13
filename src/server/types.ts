import type { StatusCode } from "status-code-enum";
import type { AppDatabase } from "~/server/database";

type ErrorResponseBody = {
  message: string;
};

export type RouteHandlerResponse<T> = {
  status: StatusCode;
  body?: ErrorResponseBody | T;
};

export type RouteHandler<T> = ({
  currentUserId,
  db,
  headers,
  parameters,
  payload,
}: {
  db: AppDatabase;
  currentUserId?: string;
  headers?: HeadersInit;
  parameters?: Partial<Record<string, string>>;
  payload?: unknown;
}) => Promise<RouteHandlerResponse<T>>;

export type APIResponse = {
  status: StatusCode;
  body?: string;
};
