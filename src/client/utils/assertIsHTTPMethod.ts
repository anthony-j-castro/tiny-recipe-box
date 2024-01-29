import { HTTPMethod } from "http-method-enum";

export default function assertIsHTTPMethod(
  method: string,
): asserts method is HTTPMethod {
  if (!Object.values<string>(HTTPMethod).includes(method)) {
    throw new Error(`String "${method}" is not a valid HTTP method.`);
  }
}
