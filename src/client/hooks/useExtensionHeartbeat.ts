import { useQuery } from "@tanstack/react-query";
import { Decoder, constant, nonEmptyString, object } from "decoders";
import { EXTENSION_ID } from "~/client/constants";
import config from "~/config";

type HeartbeatResponseMessage = {
  extensionVersion: string;
  type: "PONG";
};

const heartbeatResponse: Decoder<HeartbeatResponseMessage> = object({
  type: constant("PONG"),
  extensionVersion: nonEmptyString,
});

const useExtensionHeartbeat = () =>
  useQuery({
    queryKey: ["extension-heartbeat"],
    queryFn: async () => {
      if (!window.chrome?.runtime) {
        throw new Error("Extension helpers do not exist.");
      }

      const response = await window.chrome.runtime.sendMessage(EXTENSION_ID, {
        type: "PING",
        sender: "web-app",
      });

      const { extensionVersion } = heartbeatResponse.verify(response);

      return { version: extensionVersion };
    },
    refetchInterval: config.EXTENSION_HEARTBEAT_INTERVAL_MILLISECONDS,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });

export default useExtensionHeartbeat;
