import { useRollbar } from "@rollbar/react";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import Interstitial from "~/client/components/Interstitial";
import { NotFoundError } from "~/client/errors";
import useAuthenticateMe from "~/client/hooks/api/useAuthenticateMe";
import useCreateMe from "~/client/hooks/api/useCreateMe";
import useInitializeDatabase from "~/client/hooks/useInitializeDatabase";
import { USER_ID_KEY } from "~/client/storage";
import { Content, LoadingIndicator } from "./styled";

interface Props {
  children: React.ReactNode;
}

const InitializationRequired = ({ children }: Props) => {
  const rollbar = useRollbar();
  const [userId, setUserId] = useLocalStorage<string | null>(USER_ID_KEY, null);
  const [loadingMessage, setLoadingMessage] = useState(
    "Connecting to the database…",
  );

  const {
    data: isDatabaseInitialized,
    isSuccess: isSuccessInitializeDatabase,
    mutate: initializeDatabase,
  } = useInitializeDatabase();

  const { mutate: authenticateMe } = useAuthenticateMe();

  const { isError: isErrorCreateMe, mutate: createMe } = useCreateMe();

  useEffect(() => {
    initializeDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isDatabaseInitialized && !userId) {
      setLoadingMessage("Loading your user data…");

      authenticateMe(undefined, {
        onError: (error) => {
          if (!(error instanceof NotFoundError)) {
            rollbar.error(
              "Impossible condition met: Authenticate endpoint returned unexpected error type.",
              { error },
            );
          }
          setLoadingMessage("Initializing your user data…");

          createMe(undefined, {
            onSuccess: () => {
              authenticateMe(undefined, {
                onSuccess: (loadedUserId) => {
                  setUserId(loadedUserId);
                },
              });
            },
          });
        },
        onSuccess: (loadedUserId) => {
          setUserId(loadedUserId);
        },
      });
    }
  }, [
    authenticateMe,
    createMe,
    isDatabaseInitialized,
    rollbar,
    setUserId,
    userId,
  ]);

  const isLoading = !isSuccessInitializeDatabase || userId === null;

  const isError = isErrorCreateMe;

  if (isLoading) {
    return (
      <Interstitial>
        <Content>
          <LoadingIndicator />
          {loadingMessage}
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

  return children;
};

export default InitializationRequired;
