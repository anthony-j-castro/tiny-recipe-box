import styled, { css } from "styled-components";

export const NavLink = styled.a(
  ({ theme }) => css`
    display: block;
    color: ${theme.colors.nearBlack};
    text-decoration: none;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 4px;

    &:hover {
      background-color: ${theme.colors.gray};
    }

    &[data-status="active"] {
      color: ${theme.colors.white};
      background-color: ${theme.colors.purple};
    }
  `,
);

export const VersionInfoLink = styled(NavLink)(
  ({ theme }) => css`
    color: ${theme.colors.darkGray};
    font-size: 12px;
  `,
);
