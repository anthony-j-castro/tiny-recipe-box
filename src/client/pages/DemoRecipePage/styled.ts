import { ToggleButton as BaseToggleButton } from "react-aria-components";
import styled, { css } from "styled-components";
import VerticalSeparator from "~/client/components/VerticalSeparator";

export const Container = styled.div`
  border: 5px solid purple;

  &:fullscreen {
    background: white;
    padding: 64px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
`;

export const ToggleButton = styled(BaseToggleButton)(
  ({ theme }) => css`
    display: inline-flex;
    align-items: center;
    background: ${theme.colors.lightGray};
    padding: 8px 12px;
    border: 1px solid ${theme.colors.gray};
    border-radius: 4px;
    outline-width: 0;
    margin: 8px 8px 8px 0;

    &:hover {
      background: ${theme.colors.gray};
    }

    &[data-focus-visible] {
      outline-width: 2px;
      outline-style: solid;
      outline-offset: 2px;
    }

    &[data-selected] {
      color: ${theme.colors.white};
      background: #4d4dff;
    }

    :last-child {
      margin-right: 0;
    }
  `,
);

export const Separator = styled(VerticalSeparator)`
  align-self: stretch;
  display: inline-block;
  height: auto;
  margin-right: 8px;
`;
