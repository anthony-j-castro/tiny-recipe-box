import { createContext, useContext } from "react";
import useExtensionHeartbeat from "~/client/hooks/useExtensionHeartbeat";

type Context =
  | { isInstalled: false; version: null }
  | { isInstalled: null; version: null }
  | { isInstalled: true; version: string };

const ExtensionContext = createContext<Context>({
  isInstalled: null,
  version: null,
});

interface Props {
  children: React.ReactNode;
}

export const ExtensionProvider = ({ children }: Props) => {
  const { data, isError } = useExtensionHeartbeat();

  const value: Context = isError
    ? {
        isInstalled: false,
        version: null,
      }
    : data?.version === undefined
      ? { isInstalled: null, version: null }
      : {
          isInstalled: true,
          version: data.version,
        };

  return (
    <ExtensionContext.Provider value={value}>
      {children}
    </ExtensionContext.Provider>
  );
};

export const useExtensionContext = () => useContext(ExtensionContext);
