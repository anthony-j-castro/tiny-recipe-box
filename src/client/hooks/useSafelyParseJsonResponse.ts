import { useRollbar } from "@rollbar/react";

const useSafelyParseJsonResponse = () => {
  const rollbar = useRollbar();

  return async (response: Response): Promise<unknown> => {
    try {
      const responseJson = await response.json();

      return responseJson;
    } catch (error) {
      const responseText = await response.text();

      rollbar.error("Cannot parse response as JSON.", { body: responseText });

      return undefined;
    }
  };
};

export default useSafelyParseJsonResponse;
