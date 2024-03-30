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
        {isPending ? (
          <Paragraph>Loading…</Paragraph>
        ) : isError ? (
          <Paragraph>
            There was an error importing the recipe from the extension. Please
            close this window and try again.
          </Paragraph>
        ) : (
          <div>{JSON.stringify(data)}</div>
        )}
      </div>
    </PageContent>
  );
};

export default ImportRecipePage;
