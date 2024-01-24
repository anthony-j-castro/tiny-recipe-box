import { useMutation, useQueryClient } from "@tanstack/react-query";
import { meResponseDecoder } from "~/client/decoders/meResponse";
import { getQueryKey as getMeQueryKey } from "~/client/hooks/api/useGetMe";
import fetch from "~/client/utils/fetch";
import handleErrorResponse from "~/client/utils/handleErrorResponse";

const useCreateMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/me", {
        method: "POST",
      });

      await handleErrorResponse(response, "Error creating current user.");

      const responseJson = await response.json();

      return meResponseDecoder.verify(responseJson);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getMeQueryKey() });
    },
  });
};

export default useCreateMe;
