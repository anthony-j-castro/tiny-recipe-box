import { useQuery } from "@tanstack/react-query";
import { Decoder, datelike, object, uuidv4 } from "decoders";
import fetch from "~/client/utils/fetch";
import handleErrorResponse from "~/client/utils/handleErrorResponse";

type MeResponse = {
  createdAt: Date;
  userId: string;
};

const meResponseDecoder: Decoder<MeResponse> = object({
  createdAt: datelike,
  userId: uuidv4,
});

const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await fetch("/me");

      await handleErrorResponse(response, "Error fetching current user.");

      const responseJson = await response.json();

      return meResponseDecoder.verify(responseJson);
    },
  });
};

export default useGetMe;
