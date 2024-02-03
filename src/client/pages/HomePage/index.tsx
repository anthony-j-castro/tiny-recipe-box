import React, { useEffect } from "react";
import analytics from "~/client/analytics";
import PageContent from "~/client/components/PageContent";
import PageHeading from "~/client/components/PageHeading";
import { Paragraph } from "./styled";

const HomePage = () => {
  useEffect(() => {
    analytics.page({ title: "Home" });
  }, []);

  return (
    <PageContent>
      <PageHeading>Home</PageHeading>
      <div>
        <Paragraph>Welcome to Tiny Recipe Box!</Paragraph>
        <Paragraph>
          This site and accompanying browser extension are still in development
          and will be coming soon.
        </Paragraph>
      </div>
    </PageContent>
  );
};

export default HomePage;
