import type { StatusCode } from "status-code-enum";
import type { AppDatabase } from "~/server/database";

interface ErrorResponseBody {
  message: string;
}

export interface RouteHandlerResponse<T> {
  status: StatusCode;
  body?: ErrorResponseBody | T;
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

export interface APIResponse {
  status: StatusCode;
  body?: string;
}
