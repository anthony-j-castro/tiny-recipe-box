import { Decoder, object, string } from "decoders";
import StatusCode from "status-code-enum";

class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class APIError extends BaseError {
  status: StatusCode;

  constructor(status: StatusCode, message: string) {
    super(message);
    this.status = status;
  }
}

export class NotFoundError extends APIError {
  constructor(message: string) {
    super(StatusCode.ClientErrorNotFound, message);
  }
}

type ErrorResponseBody = {
  message: string;
};

const errorResponseDecoder: Decoder<ErrorResponseBody> = object({
  message: string,
});

export const throwAPIError = async (response: Response) => {
  const responseJson = await response.json();

  const { message } = errorResponseDecoder.value(responseJson) ?? {
    message: "An error occurred.",
  };

  switch (response.status) {
    case StatusCode.ClientErrorNotFound:
      throw new NotFoundError(message);
    default:
      throw new APIError(response.status, message);
  }
};
