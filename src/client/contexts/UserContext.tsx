import React, { createContext, useContext } from "react";
import Interstitial from "~/client/components/Interstitial";
import useCreateMe from "~/client/hooks/api/useCreateMe";
import useGetMe from "~/client/hooks/api/useGetMe";

type Context = {
  userId: string | null;
};

const UserContext = createContext<Context>({
  userId: null,
});

interface Props {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const { data, error, isError, isPending } = useGetMe();
  const { isPending: isPendingCreateMe, mutate: createMe } = useCreateMe();

  if (isPending) {
    return <Interstitial>Loading…</Interstitial>;
  }

  if (isError) {
    return (
      <Interstitial>
        Error: {error.toString()}
        <div>
          <button
            disabled={isPendingCreateMe}
            onClick={() => {
              createMe();
            }}
          >
            Create
          </button>
        </div>
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
  return useContext(UserContext);
};
