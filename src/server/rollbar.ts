import Rollbar from "rollbar";

const rollbarConfig = {
  accessToken: "5da525f1eb8d44d1b61c21df3bb14654",
  environment: "development",
};

const rollbar = new Rollbar(rollbarConfig);

export default rollbar;
