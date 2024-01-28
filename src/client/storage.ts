import { uuidv4 } from "decoders";
import { useLocalStorage } from "usehooks-ts";

export const USER_ID_KEY = "auth.userId";

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
