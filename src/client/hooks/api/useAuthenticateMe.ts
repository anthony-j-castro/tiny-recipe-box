import { useMutation } from "@tanstack/react-query";
import { object, uuidv4 } from "decoders";
import useSafelyParseJsonResponse from "~/client/hooks/useSafelyParseJsonResponse";
import fetch from "~/client/utils/fetch";
import handleErrorResponse from "~/client/utils/handleErrorResponse";

const GENERIC_ERROR_MESSAGE = "Error authenticating user.";

const authenticateResponseDecoder = object({
  userId: uuidv4,
});

export const getQueryKey = () => ["/authenticate"];

const useAuthenticateMe = () => {
  const parseJson = useSafelyParseJsonResponse();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/authenticate", { method: "POST" });

      await handleErrorResponse(response, GENERIC_ERROR_MESSAGE);

      const responseJson = await parseJson(response);

      try {
        const { userId } = authenticateResponseDecoder.verify(responseJson);

        return userId;
      } catch (error) {
        throw new Error(GENERIC_ERROR_MESSAGE);
      }
    },
  });
};

export default useAuthenticateMe;
