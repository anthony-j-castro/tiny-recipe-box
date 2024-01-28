import { useMutation, useQueryClient } from "@tanstack/react-query";
import { meResponseDecoder } from "~/client/decoders/meResponse";
import { throwAPIError } from "~/client/errors";
import { QUERY_KEY_PREFIX as GET_ME_QUERY_KEY_PREFIX } from "~/client/hooks/api/useGetMe";
import useSafelyParseJsonResponse from "~/client/hooks/useSafelyParseJsonResponse";
import fetch from "~/client/utils/fetch";

const useCreateMe = () => {
  const queryClient = useQueryClient();
  const parseJson = useSafelyParseJsonResponse();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/me", {
        method: "POST",
      });

      if (!response.ok) {
        await throwAPIError(response);
      }

      const responseJson = await parseJson(response);

      return meResponseDecoder.verify(responseJson);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ME_QUERY_KEY_PREFIX] });
    },
  });
};

export default useCreateMe;
