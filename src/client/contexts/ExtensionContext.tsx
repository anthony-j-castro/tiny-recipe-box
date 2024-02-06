import React, { createContext, useContext } from "react";
import useExtensionHeartbeat from "~/client/hooks/useExtensionHeartbeat";

type Context = {
  installationStatus: boolean | null;
};

const ExtensionContext = createContext<Context>({
  installationStatus: null,
});

interface Props {
  children: React.ReactNode;
}

export const ExtensionProvider = ({ children }: Props) => {
  const { data, isError } = useExtensionHeartbeat();

  const installationStatus = isError ? false : data !== undefined ? true : null;

  return (
    <ExtensionContext.Provider value={{ installationStatus }}>
      {children}
    </ExtensionContext.Provider>
  );
};

export const useExtensionContext = () => useContext(ExtensionContext);
