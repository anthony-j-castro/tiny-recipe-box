import { useEffect } from "react";
import { useAnalytics } from "use-analytics";
import PageContent from "~/client/components/PageContent";
import PageHeading from "~/client/components/PageHeading";
import { Paragraph } from "./styled";

const NotFoundPage = () => {
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.page({ title: "Not Found" });
  }, [analytics]);

  return (
    <PageContent>
      <PageHeading>Page Not Found</PageHeading>
      <div>
        <Paragraph>The requested page or resource was not found.</Paragraph>
      </div>
    </PageContent>
  );
};

export default NotFoundPage;
