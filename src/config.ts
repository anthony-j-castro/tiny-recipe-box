import {
  Decoder,
  either,
  exact,
  nonEmptyString,
  nullable,
  numeric,
  oneOf,
  positiveInteger,
  undefined_,
} from "decoders";

type Config = {
  ENVIRONMENT: "development" | "production";
  GITHUB_COMMIT_SHA: string | null;
  GOOGLE_ANALYTICS_MEASUREMENT_ID: string | null;
  SIMULATED_LATENCY_MILLISECONDS: number;
  SIMULATED_LATENCY_TOLERANCE_MILLISECONDS: number;
  ROLLBAR_ACCESS_TOKEN?: string | undefined;
};

const configDecoder: Decoder<Config> = exact({
  ENVIRONMENT: oneOf(["development", "production"]),
  GITHUB_COMMIT_SHA: nullable(nonEmptyString),
  GOOGLE_ANALYTICS_MEASUREMENT_ID: nullable(nonEmptyString),
  ROLLBAR_ACCESS_TOKEN: either(nonEmptyString, undefined_),
  SIMULATED_LATENCY_MILLISECONDS: either(numeric, positiveInteger),
  SIMULATED_LATENCY_TOLERANCE_MILLISECONDS: either(numeric, positiveInteger),
});

const config = {
  ENVIRONMENT:
    process.env.NODE_ENV === "production" ? "production" : "development",
  GITHUB_COMMIT_SHA: process.env.GITHUB_SHA || null,
  GOOGLE_ANALYTICS_MEASUREMENT_ID:
    process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID || null,
  ROLLBAR_ACCESS_TOKEN: process.env.ROLLBAR_ACCESS_TOKEN || undefined,
  SIMULATED_LATENCY_MILLISECONDS:
    process.env.SIMULATED_LATENCY_MILLISECONDS || 0,
  SIMULATED_LATENCY_TOLERANCE_MILLISECONDS:
    process.env.SIMULATED_LATENCY_TOLERANCE_MILLISECONDS || 0,
};

export default configDecoder.verify(config);
