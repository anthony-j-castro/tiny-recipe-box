import config from "~/config";

export const rollbarConfig = {
  accessToken: config.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: config.ROLLBAR_ACCESS_TOKEN !== undefined,
  environment: "development",
};
