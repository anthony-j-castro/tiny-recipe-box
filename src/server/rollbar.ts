import Rollbar from "rollbar";
import config from "~/config";

const rollbarConfig = {
  accessToken: config.ROLLBAR_ACCESS_TOKEN,
  environment: "development",
};

const rollbar = new Rollbar(rollbarConfig);

export default rollbar;
