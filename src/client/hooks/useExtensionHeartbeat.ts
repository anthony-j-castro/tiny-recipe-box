import { useQuery } from "@tanstack/react-query";
import { constant, exact, nonEmptyString, type Decoder } from "decoders";
import { EXTENSION_ID } from "~/client/constants";
import { getUserId } from "~/client/storage";
import config from "~/config";

type HeartbeatResponseMessage = {
  payload: {
    extensionVersion: string;
  };
  sender: "service-worker";
  type: "PONG";
};

const heartbeatResponse: Decoder<HeartbeatResponseMessage> = exact({
  type: constant("PONG"),
  sender: constant("service-worker"),
  payload: exact({ extensionVersion: nonEmptyString }),
});

const useExtensionHeartbeat = () => {
  const userId = getUserId();

  return useQuery({
    enabled: userId !== null,
    queryKey: ["extension-heartbeat", userId],
    queryFn: async () => {
      if (!window.chrome?.runtime) {
        throw new Error("Extension helpers do not exist.");
      }

      const response = await window.chrome.runtime.sendMessage(EXTENSION_ID, {
        type: "PING",
        sender: "web-app",
        payload: {
          userId,
        },
      });

      const {
        payload: { extensionVersion },
      } = heartbeatResponse.verify(response);

      return { version: extensionVersion };
    },
    refetchInterval: config.EXTENSION_HEARTBEAT_INTERVAL_MILLISECONDS,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });
};

export default useExtensionHeartbeat;
