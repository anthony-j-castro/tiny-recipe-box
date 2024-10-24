import styled, { css } from "styled-components";

export const Paragraph = styled.p`
  margin: 16px 0 0;
`;

export const DataBlock = styled.pre(
  ({ theme }) => css`
    font-family: monospace;
    padding: 8px;
    border: 2px solid ${theme.colors.purple};
    border-radius: 4px;
    overflow: auto;
  `,
);
