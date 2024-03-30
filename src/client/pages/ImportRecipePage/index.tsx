import { useEffect } from "react";
import { useAnalytics } from "use-analytics";
import PageContent from "~/client/components/PageContent";
import PageHeading from "~/client/components/PageHeading";
import useImportRecipeFromExtension from "~/client/hooks/useImportRecipeFromExtension";
import { Paragraph } from "./styled";

const ImportRecipePage = () => {
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.page({ title: "Import Recipe" });
  }, [analytics]);

  const { data, error, isError, isPending } = useImportRecipeFromExtension();

  console.log("error", error);

  return (
    <PageContent>
      <PageHeading>Import Recipe</PageHeading>
      <div>
        <Paragraph>Loading…</Paragraph>
        <div>isPending: {JSON.stringify(isPending)}</div>
        <div>isError: {JSON.stringify(isError)}</div>
        <div>{JSON.stringify(data)}</div>
      </div>
    </PageContent>
  );
};

export default ImportRecipePage;
