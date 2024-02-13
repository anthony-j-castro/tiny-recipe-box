import { useEffect } from "react";
import { useAnalytics } from "use-analytics";
import PageContent from "~/client/components/PageContent";
import PageHeading from "~/client/components/PageHeading";
import { Paragraph } from "./styled";

const HomePage = () => {
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.page({ title: "Home" });
  }, [analytics]);

  return (
    <PageContent data-cy="home-page">
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
