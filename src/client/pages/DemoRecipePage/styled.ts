import { ToggleButton as BaseToggleButton } from "react-aria-components";
import styled, { css } from "styled-components";

export const Container = styled.div`
  border: 5px solid purple;
  &:fullscreen {
    background: white;
    margin: 64px;
  }
`;

export const ToggleButton = styled(BaseToggleButton)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    background: ${theme.colors.lightGray};
    padding: 4px;
    border: 1px solid ${theme.colors.darkGray};
    border-radius: 4px;
    outline-width: 0;
    color: black;

    &:hover {
      background: ${theme.colors.gray};
    }

    &[data-focus-visible] {
      outline-width: 2px;
      outline-style: solid;
      outline-offset: 2px;
    }

    &[data-selected] {
      color: blue;
    }
  `,
);
