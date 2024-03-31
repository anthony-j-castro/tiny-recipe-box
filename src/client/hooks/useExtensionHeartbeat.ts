import { useQuery } from "@tanstack/react-query";
import { Decoder, constant, nonEmptyString, object } from "decoders";
import { EXTENSION_ID } from "~/client/constants";
import { getUserId } from "~/client/storage";
import config from "~/config";

type HeartbeatResponseMessage = {
  extensionVersion: string;
  type: "PONG";
};

const heartbeatResponse: Decoder<HeartbeatResponseMessage> = object({
  type: constant("PONG"),
  extensionVersion: nonEmptyString,
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

      const { extensionVersion } = heartbeatResponse.verify(response);

      return { version: extensionVersion };
    },
    refetchInterval: config.EXTENSION_HEARTBEAT_INTERVAL_MILLISECONDS,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });
};

export default useExtensionHeartbeat;
