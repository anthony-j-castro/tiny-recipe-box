import { useQuery } from "@tanstack/react-query";
import { meResponseDecoder } from "~/client/decoders/meResponse";
import useSafelyParseJsonResponse from "~/client/hooks/useSafelyParseJsonResponse";
import fetch from "~/client/utils/fetch";
import handleErrorResponse from "~/client/utils/handleErrorResponse";

const GENERIC_ERROR_MESSAGE = "Error fetching current user.";

export const getQueryKey = () => ["me"];

const useGetMe = () => {
  const parseJson = useSafelyParseJsonResponse();

  return useQuery({
    queryKey: getQueryKey(),
    queryFn: async () => {
      const response = await fetch("/me");

      await handleErrorResponse(response, GENERIC_ERROR_MESSAGE);

      const responseJson = await parseJson(response);

      try {
        const me = meResponseDecoder.verify(responseJson);

        return me;
      } catch (error) {
        throw new Error(GENERIC_ERROR_MESSAGE);
      }
    },
  });
};

export default useGetMe;
