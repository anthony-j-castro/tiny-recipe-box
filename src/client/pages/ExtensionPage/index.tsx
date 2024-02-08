import React, { useEffect } from "react";
import { useAnalytics } from "use-analytics";
import MonospacedText from "~/client/components/MonospacedText";
import PageContent from "~/client/components/PageContent";
import PageHeading from "~/client/components/PageHeading";
import { useExtensionContext } from "~/client/contexts/ExtensionContext";
import { Paragraph } from "./styled";

const ExtensionPage = () => {
  const analytics = useAnalytics();
  const extensionInfo = useExtensionContext();

  useEffect(() => {
    analytics.page({ title: "Browser Extension" });
  }, [analytics]);

  return (
    <PageContent>
      <PageHeading>Browser Extension</PageHeading>
      <div>
        {extensionInfo.isInstalled ? (
          <Paragraph>
            Tiny Recipe Clipper Version:{" "}
            <MonospacedText>{extensionInfo.version}</MonospacedText>
          </Paragraph>
        ) : (
          <Paragraph>
            You either don’t have Tiny Recipe Clipper installed or it is
            disabled.
          </Paragraph>
        )}
      </div>
    </PageContent>
  );
};

export default ExtensionPage;
