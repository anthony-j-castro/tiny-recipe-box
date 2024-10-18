import styled, { css } from "styled-components";

export const IngredientsList = styled.ul`
  padding: 0;
  margin: 0;
`;

export const Ingredient = styled.li<{ $isActive?: boolean }>(
  ({ $isActive }) => css`
    list-style-type: none;
    font-size: 18px;
    padding: 4px 8px;
    border-radius: 4px;
    margin: 0 0 8px -8px;
    transition: background-color 100ms;

    ${$isActive &&
    css`
      background: #ebff9d;
    `}
  `,
);
