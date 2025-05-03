import styled, { css, keyframes, type DefaultTheme } from "styled-components";
import Button from "~/client/components/Button";
import HorizontalSeparator from "~/client/components/HorizontalSeparator";
import SyncAlertIcon from "~/client/components/icons/SyncAlertIcon";
import Logo from "~/client/components/Logo";
import BaseNavLink from "./NavLink";

export const Sidebar = styled.nav(
  ({ theme }) => css`
    min-width: 216px;
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr min-content min-content;
    gap: 0px 0px;
    grid-template-areas:
      "primary"
      "secondary";
    background-color: ${theme.colors.lightGray};
    padding: 8px;
    border-right: 1px solid ${theme.colors.gray};
  `,
);

export const AlphaPill = styled.span(
  ({ theme }) => css`
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    line-height: 10px;
    background-color: ${theme.colors.neonGreen};
    padding: 2px 4px;
    border: 1px solid ${theme.colors.darkNeonGreen};
    border-radius: 8px;
    margin-bottom: 8px;
    margin-left: 16px;
    user-select: none;
  `,
);

export const StyledLogo = styled(Logo)(
  ({ theme }) => css`
    display: block;
    max-width: 100px;
    color: ${theme.colors.nearBlack};
    margin-bottom: 8px;
    margin-left: 16px;
  `,
);

export const TopSeparator = styled(HorizontalSeparator)`
  margin-bottom: 8px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const PrimaryNav = styled.section`
  grid-area: primary;
`;

export const SecondaryNav = styled.section`
  grid-area: secondary;
  margin-top: 32px;
`;

export const NavLink = styled(BaseNavLink)`
  display: block;
`;

export const BottomSeparator = styled(HorizontalSeparator)`
  margin: 8px 0;
`;

export const ExtensionStatusNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
`;

export const VersionInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const VersionInfoLink = styled(NavLink)(
  ({ theme }) => css`
    flex: 1;
    color: ${theme.colors.darkGray};
    font-size: 12px;
    line-height: 16px;
    padding: 8px 16px;
    margin: 0;
  `,
);

const pulse = ({ theme }: { theme: DefaultTheme }) => keyframes`
  0% {
    color: ${theme.colors.darkGray};
  }

  10% {
    color: ${theme.colors.purple};
  }

  20%, 100% {
    color: ${theme.colors.darkGray};
  }
`;

const glow = ({ theme }: { theme: DefaultTheme }) => keyframes`
  0% {
    filter: drop-shadow(0 0 0 transparent);
  }

  10% {
    // The last 2 characters of an 8 character hex color
    // is the alpha value.
    // The 66 here represents 0.4.
    filter: drop-shadow(0 0 4px ${theme.colors.purple}66);
  }

  20%, 100% {
    filter: drop-shadow(0 0 0 transparent);
  }
`;

export const ReloadButton = styled(Button)(
  ({ theme }) => css`
    flex: 0;
    color: ${theme.colors.darkGray};
    padding: 6px;
    background: transparent;
    margin-left: 8px;
    animation: ${pulse} 5s linear infinite;

    &:hover {
      background-color: ${theme.colors.gray};
    }

    & > svg {
      animation: ${glow} 5s linear infinite;
    }
  `,
);

export const NewVersionIcon = styled(SyncAlertIcon)`
  display: block;
  width: 20px;
  height: 20px;
`;
