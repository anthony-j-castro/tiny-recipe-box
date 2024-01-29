import Rollbar from "rollbar";
import { rollbarConfig } from "~/shared/rollbar";

const rollbar = new Rollbar(rollbarConfig);

export default rollbar;
