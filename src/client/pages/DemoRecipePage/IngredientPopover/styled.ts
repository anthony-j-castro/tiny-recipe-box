import { Popover } from "react-aria-components";
import styled, { css } from "styled-components";

export const StyledPopover = styled(Popover)(
  ({ theme }) => css`
    color: ${theme.colors.white};
    background: ${theme.colors.purple};
    padding: 8px 12px;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &[data-placement="top"] {
      margin-bottom: 4px;
    }

    &[data-placement="bottom"] {
      margin-top: 4px;

      & .react-aria-OverlayArrow svg {
        transform: rotate(180deg);
      }
    }

    &[data-placement="right"] {
      margin-left: 4px;

      & .react-aria-OverlayArrow svg {
        transform: rotate(90deg);
      }
    }

    &[data-placement="left"] {
      margin-right: 4px;

      & .react-aria-OverlayArrow svg {
        transform: rotate(-90deg);
      }
    }

    & .react-aria-OverlayArrow svg {
      display: block;
      fill: ${theme.colors.nearBlack};
    }
  `,
);
