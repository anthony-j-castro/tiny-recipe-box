import {
  AnimatedBackground,
  Content,
  ContentContainer,
  Logo,
  Wrapper,
} from "./styled";

interface Props {
  children: React.ReactNode;
  contentTestAttribute?: string;
}

const Interstitial = ({ children, contentTestAttribute }: Props) => (
  <Wrapper>
    <ContentContainer data-cy={contentTestAttribute}>
      <AnimatedBackground data-background="true" />
      <Content>
        <Logo />
        {children}
      </Content>
    </ContentContainer>
  </Wrapper>
);

export default Interstitial;
