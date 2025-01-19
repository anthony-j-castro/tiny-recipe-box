import { useEffect } from "react";
import { useAnalytics } from "use-analytics";
import AppLayout from "~/client/components/AppLayout";
import PageContent from "~/client/components/PageContent";
import PageHeading from "~/client/components/PageHeading";
import { Paragraph } from "./styled";

interface Props {
  isSandboxed?: boolean;
}

const PrivacyPolicyPage = ({ isSandboxed }: Props) => {
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.page({ title: "Privacy Policy" });
  }, [analytics]);

  return (
    <AppLayout isSandboxedNav={isSandboxed}>
      <PageContent data-testid="privacy-policy-page">
        <PageHeading>Privacy Policy</PageHeading>
        <div>
          <Paragraph>TBD.</Paragraph>
        </div>
      </PageContent>
    </AppLayout>
  );
};

export default PrivacyPolicyPage;
