import styled, { css } from "styled-components";
import BaseLogo from "~/client/components/Logo";

export const Wrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 100vw;
    min-height: 100vh;
    background-color: ${theme.colors.lightGray};
  `,
);

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 16px;
  position: relative;

  &:hover > div[data-background="true"] {
    transform: translateX(-12px) translateY(-12px);
  }
`;

export const AnimatedBackground = styled.div(
  ({ theme }) => css`
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.neonGreen};
    transition: all 100ms ease-out;
  `,
);

export const Content = styled.div(
  ({ theme }) => css`
    position: relative;
    padding: 24px;
    background-color: ${theme.colors.white};
    border: 4px solid ${theme.colors.gray};
  `,
);

export const Logo = styled(BaseLogo)`
  display: block;
  max-width: 200px;
  margin-bottom: 24px;
`;
