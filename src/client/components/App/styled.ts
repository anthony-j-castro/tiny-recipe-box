import styled from "styled-components";
import BaseLogo from "~/client/components/Logo";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  background-color: #f5f5f7;
`;

export const ContentContainer = styled.div`
  max-width: 600px;
  margin: 16px;
  position: relative;

  &:hover > div[data-background="true"] {
    transform: translateX(-12px) translateY(-12px);
  }
`;

export const AnimatedBackground = styled.div`
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ccff00;
  transition: all 100ms ease-out;
`;

export const Content = styled.div`
  position: relative;
  padding: 24px;
  background-color: #ffffff;
  border: 4px solid #dcdcde;
`;

export const Logo = styled(BaseLogo)`
  display: block;
  max-width: 200px;
  margin-bottom: 24px;
`;

export const Paragraph = styled.p`
  margin: 16px 0 0;
`;

export const UserIdText = styled.p`
  margin: 48px 0 0;
  color: #818188;
  font-size: 12px;
  text-align: right;
`;

export const UserId = styled.span`
  font-family: monospace;
`;

export const VersionText = styled.p`
  margin: 4px 0 0;
  color: #818188;
  font-size: 12px;
  text-align: right;
`;

export const CommitLink = styled.a`
  font-family: monospace;
  color: inherit;
  text-decoration: none;

  &:visited {
    color: inherit;
  }

  &:hover {
    text-decoration: underline;
  }
`;
