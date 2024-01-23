import {
  Decoder,
  either,
  exact,
  nonEmptyString,
  nullable,
  numeric,
  positiveInteger,
} from "decoders";

type Config = {
  GITHUB_COMMIT_SHA: string | null;
  GOOGLE_ANALYTICS_MEASUREMENT_ID: string | null;
  ROLLBAR_ACCESS_TOKEN: string;
  SIMULATED_LATENCY_MILLISECONDS: number;
  SIMULATED_LATENCY_TOLERANCE_MILLISECONDS: number;
};

const configDecoder: Decoder<Config> = exact({
  GITHUB_COMMIT_SHA: nullable(nonEmptyString),
  GOOGLE_ANALYTICS_MEASUREMENT_ID: nullable(nonEmptyString),
  ROLLBAR_ACCESS_TOKEN: nonEmptyString,
  SIMULATED_LATENCY_MILLISECONDS: either(numeric, positiveInteger),
  SIMULATED_LATENCY_TOLERANCE_MILLISECONDS: either(numeric, positiveInteger),
});

const config = {
  GITHUB_COMMIT_SHA: process.env.GITHUB_SHA || null,
  GOOGLE_ANALYTICS_MEASUREMENT_ID:
    process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID || null,
  ROLLBAR_ACCESS_TOKEN: process.env.ROLLBAR_ACCESS_TOKEN,
  SIMULATED_LATENCY_MILLISECONDS: process.env.SIMULATED_LATENCY_MILLISECONDS,
  SIMULATED_LATENCY_TOLERANCE_MILLISECONDS:
    process.env.SIMULATED_LATENCY_TOLERANCE_MILLISECONDS,
};

export default configDecoder.verify(config);
