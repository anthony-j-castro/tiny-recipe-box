import styled, { css } from "styled-components";

const PageHeading = styled.h1(
  ({ theme }) => css`
    position: relative;
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 32px 0;

    &::before {
      content: "";
      position: absolute;
      bottom: 2px;
      left: 0;
      width: 100%;
      height: 8px;
      background: ${theme.colors.neonGreen};
      z-index: -1;
      transition: all 100ms ease-out;
    }

    &:hover::before {
      height: 12px;
      transform: translateY(8px);
    }
  `,
);

export default PageHeading;
