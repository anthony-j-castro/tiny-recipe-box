import React from "react";
import {
  AnimatedBackground,
  Content,
  ContentContainer,
  Logo,
  Wrapper,
} from "./styled";

interface Props {
  children: React.ReactNode;
}

const Interstitial = ({ children }: Props) => (
  <Wrapper>
    <ContentContainer>
      <AnimatedBackground data-background="true" />
      <Content>
        <Logo />
        {children}
      </Content>
    </ContentContainer>
  </Wrapper>
);

export default Interstitial;
