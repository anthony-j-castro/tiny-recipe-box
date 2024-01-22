import { Decoder, object, string } from "decoders";

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

      throw new Error(errorResponse.message);
    } catch (error) {
      if (!defaultErrorMessage) {
        throw new Error(defaultErrorMessage);
      }

      throw error;
    }
  }
};

export default handleErrorResponse;
