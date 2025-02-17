import { Link } from "@tanstack/react-router";
import styled, { css } from "styled-components";

export const StyledLink = styled(Link)(
  ({ theme }) => css`
    color: ${theme.colors.nearBlack};
    text-decoration: none;
    font-weight: 500;
    padding: 4px 16px;
    border-radius: 4px;
    margin-bottom: 4px;

    &:hover {
      background-color: ${theme.colors.gray};
    }

    &[data-status="active"] {
      color: ${theme.colors.white};
      background-color: ${theme.colors.purple};
    }
  `,
);
