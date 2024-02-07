import React, { createContext, useContext } from "react";
import useExtensionHeartbeat from "~/client/hooks/useExtensionHeartbeat";

type Context =
  | { isInstalled: null; version: null }
  | { isInstalled: true; version: string }
  | { isInstalled: false; version: null };

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
    : data?.version !== undefined
      ? {
          isInstalled: true,
          version: data.version,
        }
      : { isInstalled: null, version: null };

  return (
    <ExtensionContext.Provider value={value}>
      {children}
    </ExtensionContext.Provider>
  );
};

export const useExtensionContext = () => useContext(ExtensionContext);
