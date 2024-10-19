import { useEffect } from "react";
import { useAnalytics } from "use-analytics";
import MonospacedText from "~/client/components/MonospacedText";
import PageContent from "~/client/components/PageContent";
import PageHeading from "~/client/components/PageHeading";
import { useUserContext } from "~/client/contexts/UserContext";
import { Paragraph, Section, SectionHeading } from "./styled";

const SettingsPage = () => {
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.page({ title: "Settings" });
  }, [analytics]);

  const { userId } = useUserContext();

  return (
    <PageContent>
      <PageHeading>Settings</PageHeading>
      <Section>
        <SectionHeading>User ID</SectionHeading>
        <div>
          Your user ID: <MonospacedText>{userId}</MonospacedText>
        </div>
        <Paragraph>
          Your user ID is a randomly assigned unique identifier that is sent
          along with user interaction analytics in order to understand how
          people use this site and the Tiny Recipe Clipper extension. Your user
          ID is also sent with automatic error reports in order to help us
          diagnose and fix bugs.
        </Paragraph>
      </Section>
    </PageContent>
  );
};

export default SettingsPage;
