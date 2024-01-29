import { useMutation } from "@tanstack/react-query";
import { object, uuidv4 } from "decoders";
import { throwAPIError } from "~/client/errors";
import useSafelyParseJsonResponse from "~/client/hooks/useSafelyParseJsonResponse";
import fetch from "~/client/utils/fetch";

const authenticateResponseDecoder = object({
  userId: uuidv4,
});

export const getQueryKey = () => ["/authenticate"];

const useAuthenticateMe = () => {
  const parseJson = useSafelyParseJsonResponse();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/authenticate", { method: "POST" });

      if (!response.ok) {
        await throwAPIError(response);
      }

      const responseJson = await parseJson(response);

      try {
        const { userId } = authenticateResponseDecoder.verify(responseJson);

        return userId;
      } catch (error) {
        throw new Error("Error authenticating user.");
      }
    },
  });
};

export default useAuthenticateMe;
