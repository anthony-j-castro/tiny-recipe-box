import { useQuery } from "@tanstack/react-query";
import { EXTENSION_ID } from "~/client/constants";

const useImportRecipeFromExtension = () =>
  useQuery({
    queryKey: ["import-recipe"],
    queryFn: async () => {
      if (!window.chrome?.runtime) {
        throw new Error("Extension helpers do not exist.");
      }

      const response = await window.chrome.runtime.sendMessage(EXTENSION_ID, {
        type: "RECIPE_IMPORTER_READY",
        sender: "web-app",
      });

      console.log("Response:", response);

      return response;
    },
  });

export default useImportRecipeFromExtension;
