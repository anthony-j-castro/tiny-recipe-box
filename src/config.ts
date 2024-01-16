import { Decoder, nonEmptyString, nullable, object } from "decoders";

type Config = {
  GITHUB_COMMIT_SHA: string | null;
};

const configDecoder: Decoder<Config> = object({
  GITHUB_COMMIT_SHA: nullable(nonEmptyString),
});

const config = {
  GITHUB_COMMIT_SHA: process.env.GITHUB_SHA || null,
};

export default configDecoder.verify(config);
