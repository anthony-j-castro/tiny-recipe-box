import { Decoder, datelike, object, uuidv4 } from "decoders";
import { Me } from "~/client/types";

export const meResponseDecoder: Decoder<Me> = object({
  createdAt: datelike,
  userId: uuidv4,
});
