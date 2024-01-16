import React from "react";
import {
  AnimatedBackground,
  Content,
  ContentContainer,
  Logo,
  Paragraph,
  Wrapper,
} from "./styled";

const AgreementRequired = () => {
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
        </Content>
      </ContentContainer>
    </Wrapper>
  );
};

export default AgreementRequired;
