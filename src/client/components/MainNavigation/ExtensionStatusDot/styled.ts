import styled, { css } from "styled-components";
import { StyledLink } from "~/client/components/MainNavigation/NavLink/styled";

export const Dot = styled.span<{ $status: boolean | null }>(
  ({ $status, theme }) => css`
    display: inline-block;
    width: 12px;
    height: 12px;
    background: ${$status === null
      ? "transparent"
      : $status
        ? theme.colors.neonGreen
        : theme.colors.red};
    border: 1px solid ${theme.colors.darkGray};
    border-radius: 50%;
    margin-left: 8px;

    ${StyledLink}[data-status="active"] > & {
      border: 1px solid ${theme.colors.white};
    }
  `,
);
