import { Switch } from "react-aria-components";
import styled, { css } from "styled-components";

const INDICATOR_WIDTH = 12;
const INDICATOR_MARGIN = 1;
const TRACK_BORDER_WIDTH = 1;

export const StyledSwitch = styled(Switch)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    padding: 4px 8px 4px 16px;
    border-radius: 4px;

    .indicator {
      flex-shrink: 0;
      width: ${INDICATOR_WIDTH * 2 +
      INDICATOR_MARGIN * 2 +
      TRACK_BORDER_WIDTH * 2}px;
      height: ${INDICATOR_WIDTH +
      INDICATOR_MARGIN * 2 +
      TRACK_BORDER_WIDTH * 2}px;
      border: 1px solid ${theme.colors.darkGray};
      background: ${theme.colors.lightGray};
      border-radius: ${(INDICATOR_WIDTH +
        INDICATOR_MARGIN * 2 +
        TRACK_BORDER_WIDTH * 2) /
      2}px;
      margin-left: 8px;
      transition: background-color 150ms;

      &::before {
        content: "";
        display: block;
        margin: ${INDICATOR_MARGIN}px;
        width: ${INDICATOR_WIDTH}px;
        height: ${INDICATOR_WIDTH}px;
        background: ${theme.colors.darkGray};
        border-radius: 50%;
        transition: all 150ms;
      }
    }

    &:hover {
      background-color: ${theme.colors.gray};
    }

    &[data-pressed] .indicator {
      border-color: ${theme.colors.purple};

      &:before {
        background: ${theme.colors.darkPurple};
      }
    }

    &[data-selected] {
      background: ${theme.colors.lighterPurple};

      .indicator {
        border-color: ${theme.colors.purple};
        background: ${theme.colors.purple};

        &::before {
          background: ${theme.colors.white};
          transform: translateX(100%);
        }
      }

      &[data-pressed] {
        .indicator {
          border-color: ${theme.colors.darkPurple};
          background: ${theme.colors.darkPurple};
        }
      }
    }

    &[data-focus-visible] .indicator {
      outline-color: Highlight;
      outline-color: -webkit-focus-ring-color;
      outline-width: 2px;
      outline-style: solid;
      outline-offset: 2px;
    }
  `,
);
