import { useQuery } from "@tanstack/react-query";
import { AUTH_HEADER } from "~/client/constants";
import { meResponseDecoder } from "~/client/decoders/meResponse";
import { throwAPIError } from "~/client/errors";
import useSafelyParseJsonResponse from "~/client/hooks/useSafelyParseJsonResponse";
import { getUserId } from "~/client/storage";
import fetch from "~/client/utils/fetch";

export const QUERY_KEY_PREFIX = "me";

export const getQueryKey = () => [QUERY_KEY_PREFIX];

const useGetMe = () => {
  const parseJson = useSafelyParseJsonResponse();

  return useQuery({
    queryKey: getQueryKey(),
    queryFn: async () => {
      const response = await fetch("/me", {
        headers: {
          [AUTH_HEADER]: getUserId() ?? "",
        },
      });

      if (!response.ok) {
        await throwAPIError(response);
      }

      const responseJson = await parseJson(response);

      try {
        const me = meResponseDecoder.verify(responseJson);

        return me;
      } catch (error) {
        throw new Error("Error fetching current user.");
      }
    },
  });
};

export default useGetMe;
