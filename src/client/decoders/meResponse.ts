import { datelike, object, uuidv4, type Decoder } from "decoders";
import type { Me } from "~/client/types";

export const meResponseDecoder: Decoder<Me> = object({
  createdAt: datelike,
  userId: uuidv4,
});
