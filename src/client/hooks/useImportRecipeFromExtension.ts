import { useQuery } from "@tanstack/react-query";
import { Decoder, constant, exact } from "decoders";
import { EXTENSION_ID } from "~/client/constants";
import sleep from "~/shared/utils/sleep";

type RecipeDataResponseMessage = {
  sender: "service-worker";
  type: "RECIPE_DATA";
};

const recipeDataResponseMessageDecoder: Decoder<RecipeDataResponseMessage> =
  exact({
    type: constant("RECIPE_DATA"),
    sender: constant("service-worker"),
  });

const timeout = async (ms: number) => {
  await sleep(ms);
  throw new Error("Request timed out.");
};

const useImportRecipeFromExtension = ({
  enabled,
}: { enabled?: boolean } = {}) =>
  useQuery({
    enabled,
    queryKey: ["import-recipe"],
    queryFn: async () => {
      if (!window.chrome?.runtime) {
        throw new Error("Extension helpers do not exist.");
      }

      const response = await Promise.race([
        window.chrome.runtime.sendMessage(EXTENSION_ID, {
          type: "RECIPE_IMPORTER_READY",
          sender: "web-app",
        }),
        timeout(10000),
      ]);

      const decodedResponse = recipeDataResponseMessageDecoder.verify(response);

      return decodedResponse;
    },
  });

export default useImportRecipeFromExtension;
