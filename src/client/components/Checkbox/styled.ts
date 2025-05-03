import { Checkbox as BaseCheckbox } from "react-aria-components";
import styled, { css } from "styled-components";

export const Checkbox = styled(BaseCheckbox)(
  ({ theme }) => css`
    .checkbox {
      width: 20px;
      height: 20px;
      border: 1px solid ${theme.colors.darkGray};
      border-radius: 2px;
      margin-right: 8px;

      svg {
        fill: none;
        width: 80%;
        height: 80%;
        stroke: white;
        stroke-width: 3px;
        margin-top: 10%;
        margin-left: 10%;
      }
    }

    &[data-selected] .checkbox {
      background: ${theme.colors.purple};
    }
  `,
);
