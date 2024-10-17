import { Switch } from "react-aria-components";
import styled, { css } from "styled-components";

export const StyledSwitch = styled(Switch)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    .indicator {
      width: 28px;
      height: 16px;
      border: 1px solid ${theme.colors.darkGray};
      background: ${theme.colors.lightGray};
      border-radius: 8px;
      margin-left: 8px;
      transition: background-color 150ms;

      &::before {
        content: "";
        display: block;
        margin: 1px;
        width: 12px;
        height: 12px;
        background: ${theme.colors.darkGray};
        border-radius: 50%;
        transition: all 150ms;
      }
    }

    &[data-pressed] .indicator {
      border-color: ${theme.colors.purple};

      &:before {
        background: ${theme.colors.darkPurple};
      }
    }

    &[data-selected] {
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
