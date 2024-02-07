import React, { useEffect } from "react";
import { useAnalytics } from "use-analytics";
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
        <Paragraph>Version: {extensionInfo.version}</Paragraph>
      </div>
    </PageContent>
  );
};

export default ExtensionPage;
