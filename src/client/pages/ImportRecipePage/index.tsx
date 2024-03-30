import { useEffect } from "react";
import { useAnalytics } from "use-analytics";
import PageContent from "~/client/components/PageContent";
import PageHeading from "~/client/components/PageHeading";
import { useExtensionContext } from "~/client/contexts/ExtensionContext";
import useImportRecipeFromExtension from "~/client/hooks/useImportRecipeFromExtension";
import { DataBlock, Paragraph } from "./styled";

const ImportRecipePage = () => {
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.page({ title: "Import Recipe" });
  }, [analytics]);

  const { isInstalled } = useExtensionContext();

  const { data, isError, isPending } = useImportRecipeFromExtension({
    enabled: isInstalled === true,
  });

  return (
    <PageContent>
      <PageHeading>Import Recipe</PageHeading>
      <div>
        {isInstalled === null ? null : isInstalled === false ? (
          <Paragraph>
            In order to import recipes, the extension must be installed and
            enabled.
          </Paragraph>
        ) : isPending ? (
          <Paragraph>Loading…</Paragraph>
        ) : isError ? (
          <Paragraph>
            There was an error importing the recipe from the extension. Please
            close this window and try again.
          </Paragraph>
        ) : (
          <DataBlock>{JSON.stringify(data, undefined, 2)}</DataBlock>
        )}
      </div>
    </PageContent>
  );
};

export default ImportRecipePage;
