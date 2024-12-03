import type { StatusCode } from "status-code-enum";
import type { AppDatabase } from "~/server/database";

export interface APIResponse {
  status: StatusCode;
  body?: string;
}

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

export interface RouteHandlerResponse<T> {
  status: StatusCode;
  body?: ErrorResponseBody | T;
}

interface ErrorResponseBody {
  message: string;
}
