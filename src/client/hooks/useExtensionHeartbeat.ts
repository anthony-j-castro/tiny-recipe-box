import { useQuery } from "@tanstack/react-query";
import { Decoder, constant, nonEmptyString, object } from "decoders";
import { EXTENSION_ID } from "~/client/constants";
import config from "~/config";

type PongMessage = {
  extensionVersion: string;
  type: "PONG";
};

const pingResponse: Decoder<PongMessage> = object({
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

      const decodedResponse = pingResponse.verify(response);

      return decodedResponse.extensionVersion;
    },
    refetchInterval: config.EXTENSION_HEARTBEAT_INTERVAL_MILLISECONDS,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });

export default useExtensionHeartbeat;
