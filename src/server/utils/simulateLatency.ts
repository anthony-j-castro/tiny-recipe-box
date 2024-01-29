import config from "~/config";
import sleep from "~/server/utils/sleep";

const simulateLatency = () => {
  const min = Math.ceil(
    Math.max(
      0,
      config.SIMULATED_LATENCY_MILLISECONDS -
        config.SIMULATED_LATENCY_TOLERANCE_MILLISECONDS,
    ),
  );
  const max = Math.floor(
    config.SIMULATED_LATENCY_MILLISECONDS +
      config.SIMULATED_LATENCY_TOLERANCE_MILLISECONDS,
  );

  const latency = Math.floor(Math.random() * (max - min + 1) + min);

  return sleep(latency);
};

export default simulateLatency;
