import { constant, exact, integer, string, type Decoder } from "decoders";
import { useEffect } from "react";
import AppLayout from "~/client/components/AppLayout";
import MonospacedText from "~/client/components/MonospacedText";
import PageContent from "~/client/components/PageContent";
import PageHeading from "~/client/components/PageHeading";
import { EXTENSION_ID, TEST_USER_ID } from "~/client/constants";
import useInitializeE2ETest from "~/client/hooks/useInitializeE2ETest";
import { Container, LoadingIndicator, Message } from "./styled";

type OpenUrlMessage = {
  payload: {
    url: string;
  };
  sender: "e2e-test";
  type: "OPEN_URL_FOR_E2E_TEST";
};

const openUrlMessageDecoder: Decoder<OpenUrlMessage> = exact({
  sender: constant("e2e-test"),
  type: constant("OPEN_URL_FOR_E2E_TEST"),
  payload: exact({ url: string }),
});

type SuccessMessage = {
  payload: {
    tabId: number;
  };
  sender: "service-worker";
  type: "OPEN_URL_FOR_E2E_TEST_SUCCESS";
};

const successMessageDecoder: Decoder<SuccessMessage> = exact({
  sender: constant("service-worker"),
  type: constant("OPEN_URL_FOR_E2E_TEST_SUCCESS"),
  payload: exact({ tabId: integer }),
});

const ExtensionTestInitializerPage = () => {
  const { isError, isPending } = useInitializeE2ETest();

  useEffect(() => {
    const listener = async (event: MessageEvent) => {
      // We only accept messages from ourselves
      if (event.source !== window) {
        return;
      }

      const message = openUrlMessageDecoder.value(event.data);

      if (message !== undefined) {
        if (!window.chrome?.runtime) {
          throw new Error("Extension helpers do not exist.");
        }

        const response = await window.chrome.runtime.sendMessage(EXTENSION_ID, {
          type: "OPEN_URL_FOR_E2E_TEST",
          sender: "web-app",
          payload: {
            url: message.payload.url,
          },
        });

        const decodedResponse = successMessageDecoder.verify(response);

        window.postMessage({
          type: "OPEN_URL_FOR_E2E_TEST_SUCCESS",
          sender: "web-app",
          payload: {
            tabId: decodedResponse.payload.tabId,
            url: message.payload.url,
          },
        });

        return;
      }
    };

    window.addEventListener("message", listener, false);

    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);

  return (
    <AppLayout isSandboxedNav>
      <PageContent>
        <PageHeading>Tiny Recipe Clipper E2E Test Initializer</PageHeading>
        <div>
          <Container>
            {isPending ? (
              <Message>
                <LoadingIndicator />
                Syncing with the extension…
              </Message>
            ) : isError ? (
              <Message>An error occurred or the request timed out.</Message>
            ) : (
              <Message data-testid="initialize-e2e-success">
                The test user ID <MonospacedText>{TEST_USER_ID}</MonospacedText>{" "}
                has been synced with the extension and E2E testing is ready to
                begin.
              </Message>
            )}
          </Container>
        </div>
      </PageContent>
    </AppLayout>
  );
};

export default ExtensionTestInitializerPage;
