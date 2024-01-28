import React, { createContext, useContext } from "react";
import Interstitial from "~/client/components/Interstitial";
import useGetMe from "~/client/hooks/api/useGetMe";
import { Content, LoadingIndicator } from "./styled";

type Context = {
  userId: string;
};

const UserContext = createContext<Context | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const { data, isError, isPending } = useGetMe();

  if (isPending) {
    return (
      <Interstitial>
        <Content>
          <LoadingIndicator />
          Loading your user data…
        </Content>
      </Interstitial>
    );
  }

  if (isError) {
    return (
      <Interstitial>
        <Content>There was an error loading your data.</Content>
      </Interstitial>
    );
  }

  return (
    <UserContext.Provider value={{ userId: data.userId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider.");
  }

  return context;
};
