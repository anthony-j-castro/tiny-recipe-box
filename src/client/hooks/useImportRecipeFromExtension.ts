import { useQuery } from "@tanstack/react-query";
import { constant, exact, nonEmptyString, type Decoder } from "decoders";
import { EXTENSION_ID } from "~/client/constants";
import sleep from "~/shared/utils/sleep";

interface RecipeDataResponseMessage {
  sender: "service-worker";
  type: "RECIPE_DATA";
}

const recipeDataResponseMessageDecoder: Decoder<RecipeDataResponseMessage> =
  exact({
    type: constant("RECIPE_DATA"),
    sender: constant("service-worker"),
    payload: exact({
      recipe: exact({
        title: nonEmptyString,
        url: nonEmptyString,
      }),
    }),
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
        timeout(10_000),
      ]);

      const decodedResponse = recipeDataResponseMessageDecoder.verify(response);

      return decodedResponse;
    },
  });

export default useImportRecipeFromExtension;
