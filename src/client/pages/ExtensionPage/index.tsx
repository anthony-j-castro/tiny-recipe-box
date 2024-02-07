import React, { useEffect } from "react";
import { useAnalytics } from "use-analytics";
import PageContent from "~/client/components/PageContent";
import PageHeading from "~/client/components/PageHeading";
import { Paragraph } from "./styled";

const ExtensionPage = () => {
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.page({ title: "Browser Extension" });
  }, [analytics]);

  return (
    <PageContent>
      <PageHeading>Browser Extension</PageHeading>
      <div>
        <Paragraph>TBD.</Paragraph>
      </div>
    </PageContent>
  );
};

export default ExtensionPage;
