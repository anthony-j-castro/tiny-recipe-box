import styled, { css, keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingIndicator = styled.span(
  ({ theme }) => css`
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    animation: ${rotate} 750ms linear infinite;

    &::before {
      content: "";
      position: absolute;
      top: 10%;
      left: 10%;
      width: 30%;
      height: 30%;
      border-radius: 50%;
      background: ${theme.colors.purple};
    }
  `,
);
