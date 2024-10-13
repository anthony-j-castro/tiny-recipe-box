import type Rollbar from "rollbar";
import config from "~/config";

export const rollbarConfig: Rollbar.Configuration = {
  accessToken: config.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: config.ROLLBAR_ACCESS_TOKEN !== undefined,
  payload: {
    environment: config.ENVIRONMENT,
    client: {
      javascript: {
        code_version:
          config.ENVIRONMENT === "production"
            ? (config.GITHUB_COMMIT_SHA ?? undefined)
            : undefined,
      },
    },
  },
};
