import { useQuery } from "@tanstack/react-query";
import { EXTENSION_ID } from "~/client/constants";
import sleep from "~/server/utils/sleep";

const timeout = async (ms: number) => {
  await sleep(ms);
  throw new Error("Request timed out.");
};

const useImportRecipeFromExtension = () =>
  useQuery({
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

      console.log("Response:", response);

      return response;
    },
  });

export default useImportRecipeFromExtension;
