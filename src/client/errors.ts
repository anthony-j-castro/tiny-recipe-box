import { object, string, type Decoder } from "decoders";
import StatusCode from "status-code-enum";

class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BaseError";
  }
}

class APIError extends BaseError {
  status: StatusCode;

  constructor(status: StatusCode, message: string) {
    super(message);
    this.status = status;
    this.name = "APIError";
  }
}

export class UnauthorizedError extends APIError {
  constructor(message: string) {
    super(StatusCode.ClientErrorUnauthorized, message);
    this.name = "UnauthorizedError";
  }
}

export class NotFoundError extends APIError {
  constructor(message: string) {
    super(StatusCode.ClientErrorNotFound, message);
    this.name = "NotFoundError";
  }
}

export class InternalServerError extends APIError {
  constructor(message: string) {
    super(StatusCode.ServerErrorInternal, message);
    this.name = "InternalServerError";
  }
}

interface ErrorResponseBody {
  message: string;
}

const errorResponseDecoder: Decoder<ErrorResponseBody> = object({
  message: string,
});

export const throwAPIError = async (response: Response) => {
  const responseJson = await response.json();

  const { message } = errorResponseDecoder.value(responseJson) ?? {
    message: "An error occurred.",
  };

  switch (response.status) {
    case StatusCode.ClientErrorNotFound: {
      throw new NotFoundError(message);
    }

    case StatusCode.ClientErrorUnauthorized: {
      throw new UnauthorizedError(message);
    }

    case StatusCode.ServerErrorInternal: {
      throw new InternalServerError(message);
    }

    default: {
      throw new APIError(response.status, message);
    }
  }
};
