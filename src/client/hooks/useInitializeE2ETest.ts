import { useQuery } from "@tanstack/react-query";
import { constant, exact, type Decoder } from "decoders";
import { EXTENSION_ID, TEST_USER_ID } from "~/client/constants";
import sleep from "~/shared/utils/sleep";

interface SuccessResponseMessage {
  sender: "service-worker";
  type: "SET_USER_ID_FOR_E2E_TEST_SUCCESS";
}

const successResponseDecoder: Decoder<SuccessResponseMessage> = exact({
  sender: constant("service-worker"),
  type: constant("SET_USER_ID_FOR_E2E_TEST_SUCCESS"),
});

const timeout = async (ms: number) => {
  await sleep(ms);
  throw new Error("Request timed out.");
};

const useInitializeE2ETest = () =>
  useQuery({
    queryKey: ["initialize-e2e-test"],
    queryFn: async () => {
      if (!window.chrome?.runtime) {
        throw new Error("Extension helpers do not exist.");
      }

      const response = await Promise.race([
        window.chrome.runtime.sendMessage(EXTENSION_ID, {
          type: "SET_USER_ID_FOR_E2E_TEST",
          sender: "web-app",
          payload: {
            userId: TEST_USER_ID,
          },
        }),
        timeout(10_000),
      ]);

      const decodedResponse = successResponseDecoder.verify(response);

      return decodedResponse;
    },
  });

export default useInitializeE2ETest;
