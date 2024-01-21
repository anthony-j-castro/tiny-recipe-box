import { Decoder, exact, nonEmptyString, nullable } from "decoders";

type Config = {
  GITHUB_COMMIT_SHA: string | null;
  GOOGLE_ANALYTICS_MEASUREMENT_ID: string | null;
};

const configDecoder: Decoder<Config> = exact({
  GITHUB_COMMIT_SHA: nullable(nonEmptyString),
  GOOGLE_ANALYTICS_MEASUREMENT_ID: nullable(nonEmptyString),
});

const config = {
  GITHUB_COMMIT_SHA: process.env.GITHUB_SHA || null,
  GOOGLE_ANALYTICS_MEASUREMENT_ID:
    process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID || null,
};

export default configDecoder.verify(config);
