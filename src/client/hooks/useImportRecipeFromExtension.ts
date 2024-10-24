import { useQuery } from "@tanstack/react-query";
import {
  array,
  constant,
  exact,
  nonEmptyString,
  nullable,
  optional,
  type Decoder,
} from "decoders";
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
        attribution: nullable(nonEmptyString),
        imageUrl: nullable(nonEmptyString),
        ingredientGroups: array(
          exact({
            name: optional(nonEmptyString),
            ingredients: array(nonEmptyString),
          }),
        ),
        time: nullable(nonEmptyString),
        title: nonEmptyString,
        url: nonEmptyString,
        yield: nullable(nonEmptyString),
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
