import { Button } from "react-aria-components";
import styled, { css } from "styled-components";

export const StepsList = styled.ul`
  padding: 0;
  margin: 0;
`;

export const Step = styled.li<{ $isActive?: boolean }>(
  ({ $isActive }) => css`
    display: flex;
    padding: 8px;
    margin-bottom: 16px;
    font-size: 20px;
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    transition: border-color 100ms ease-in-out;

    ${$isActive &&
    css`
      border-color: #4d4dff;
    `}
  `,
);

export const StepNumber = styled.span`
  min-width: 32px;
  padding-right: 8px;
  border-right: 2px solid #ff9551;
  margin-right: 16px;
  text-align: right;
  font-weight: 700;
  font-feature-settings: "tnum";
`;

export const StepContent = styled.div`
  line-height: 1.25;
`;

export const HighlightedIngredient = styled(Button)(
  ({ theme }) => css`
    display: inline-block;
    padding: 0 4px;
    background: ${theme.colors.lightGray};
    border: 1px solid ${theme.colors.gray};
    border-radius: 4px;
    cursor: help;
    transition: background-color 100ms ease-in-out;

    &:hover {
      background: ${theme.colors.gray};
    }
  `,
);
