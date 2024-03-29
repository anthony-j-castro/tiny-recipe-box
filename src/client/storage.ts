import { uuidv4 } from "decoders";
import { useLocalStorage } from "usehooks-ts";

const AGREEMENT_VERSION = 1;
const AGREEMENT_KEY = `userAgreed.v${AGREEMENT_VERSION}`;

export const useUserAgreed = () => useLocalStorage(AGREEMENT_KEY, false);

const USER_ID_KEY = "auth.userId";

export const useUserId = () =>
  useLocalStorage<string | null>(USER_ID_KEY, null);

export const getUserId = () => {
  const value = localStorage.getItem(USER_ID_KEY);

  if (value === null) {
    return null;
  }

  const decodedValue = uuidv4.verify(JSON.parse(value));

  return decodedValue;
};
