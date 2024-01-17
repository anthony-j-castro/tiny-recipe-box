import React from "react";
import config from "~/config";
import {
  AnimatedBackground,
  CommitLink,
  Content,
  ContentContainer,
  Logo,
  Paragraph,
  VersionText,
  Wrapper,
} from "./styled";

const App = () => {
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
          {shaData ? (
            <VersionText>
              Version:{" "}
              <CommitLink
                href={`https://github.com/anthony-j-castro/tiny-recipe-box/commit/${shaData.long}`}
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
