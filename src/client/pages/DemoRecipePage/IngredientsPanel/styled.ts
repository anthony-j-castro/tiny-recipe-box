import styled, { css } from "styled-components";

export const Section = styled.div`
  max-height: calc(100vh - (36px * 2));
  overflow: auto;
`;

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
    margin-bottom: 8px;
    transition: background-color 100ms;

    ${$isActive &&
    css`
      background: #ebff9d;
    `}
  `,
);
