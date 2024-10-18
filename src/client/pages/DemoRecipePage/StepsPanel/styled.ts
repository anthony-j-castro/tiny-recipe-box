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
    margin-bottom: 24px;
    font-size: 20px;
    border: 4px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 100ms;

    ${$isActive &&
    css`
      border-color: #4d4dff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    `}
  `,
);

export const StepNumber = styled.span`
  min-width: 32px;
  padding-right: 8px;
  border-right: 2px solid #4d4dff;
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
    transition: background-color 100ms;

    &:hover {
      background: ${theme.colors.gray};
    }
  `,
);
