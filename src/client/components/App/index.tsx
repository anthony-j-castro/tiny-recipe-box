import React, { useEffect } from "react";
import analytics from "~/client/analytics";
import { useUserContext } from "~/client/contexts/UserContext";
import config from "~/config";
import {
  AnimatedBackground,
  CommitLink,
  Content,
  ContentContainer,
  Logo,
  Paragraph,
  UserId,
  UserIdText,
  VersionText,
  Wrapper,
} from "./styled";

const App = () => {
  useEffect(() => {
    analytics.page({ title: "Index" });
  }, []);

  const { userId } = useUserContext();

  const shaData = config.GITHUB_COMMIT_SHA
    ? {
        long: config.GITHUB_COMMIT_SHA,
        short: config.GITHUB_COMMIT_SHA.substring(0, 7),
      }
    : undefined;

  return (
    <Wrapper>
      <ContentContainer>
        <AnimatedBackground data-background="true" />
        <Content>
          <Logo />
          <Paragraph>Welcome to Tiny Recipe Box!</Paragraph>
          <Paragraph>
            This site and accompanying browser extension are still in
            development and will be coming soon.
          </Paragraph>
          <UserIdText>
            User ID: <UserId>{userId}</UserId>
          </UserIdText>
          {shaData ? (
            <VersionText>
              Version:{" "}
              <CommitLink
                href={`https://github.com/anthony-j-castro/tiny-recipe-box/commit/${shaData.long}`}
                onClick={() => {
                  analytics.track("clicked_commit_link");
                }}
                target="_blank"
              >
                {shaData.short}
              </CommitLink>
            </VersionText>
          ) : null}
        </Content>
      </ContentContainer>
    </Wrapper>
  );
};

export default App;
