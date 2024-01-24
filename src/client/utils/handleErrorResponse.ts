import { Decoder, object, string } from "decoders";
import { APIError } from "~/client/errors";

type ErrorResponse = {
  message: string;
};

const errorResponseDecoder: Decoder<ErrorResponse> = object({
  message: string,
});

const handleErrorResponse = async (
  response: Response,
  defaultErrorMessage?: string,
) => {
  if (!response.ok) {
    try {
      const responseJson = await response.json();

      const errorResponse = errorResponseDecoder.verify(responseJson);

      throw new APIError(errorResponse.message);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }

      if (defaultErrorMessage) {
        throw new Error(defaultErrorMessage);
      }

      throw error;
    }
  }
};

export default handleErrorResponse;
