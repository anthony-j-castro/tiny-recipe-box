import { useRollbar } from "@rollbar/react";

const useSafelyParseJsonResponse = () => {
  const rollbar = useRollbar();

  return async (response: Response) => {
    try {
      const responseJson = await response.json();

      return responseJson;
    } catch (error) {
      rollbar.error("Cannot");

      return undefined;
    }
  };
};

export default useSafelyParseJsonResponse;
