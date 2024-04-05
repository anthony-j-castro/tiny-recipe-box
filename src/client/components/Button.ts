import { Button as BaseButton } from "@ariakit/react";
import styled, { css } from "styled-components";

const Button = styled(BaseButton)(
  ({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: 500;
    background: ${theme.colors.purple};
    padding: 8px 12px;
    border: none;
    border-radius: 4px;

    &:hover {
      background: ${theme.colors.darkPurple};
    }

    &[aria-disabled="true"] {
      opacity: 0.5;
    }
  `,
);

export default Button;
