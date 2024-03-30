import { useEffect } from "react";
import { useAnalytics } from "use-analytics";
import PageContent from "~/client/components/PageContent";
import PageHeading from "~/client/components/PageHeading";
import { Paragraph } from "./styled";

const ImportRecipePage = () => {
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.page({ title: "Import Recipe" });
  }, [analytics]);

  return (
    <PageContent>
      <PageHeading>Import Recipe</PageHeading>
      <div>
        <Paragraph>Loading…</Paragraph>
      </div>
    </PageContent>
  );
};

export default ImportRecipePage;
