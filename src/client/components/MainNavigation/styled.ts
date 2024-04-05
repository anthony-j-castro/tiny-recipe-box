import styled, { keyframes } from "styled-components";
import Button from "~/client/components/Button";
import Logo from "~/client/components/Logo";
import Separator from "~/client/components/Separator";
import BaseNavLink from "./NavLink";

export const Sidebar = styled.nav`
  min-width: 216px;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr min-content min-content;
  gap: 0px 0px;
  grid-template-areas:
    "primary"
    "secondary";
  background-color: #f5f5f7;
  padding: 8px;
  border-right: 1px solid #dcdcde;
`;

export const AlphaPill = styled.span`
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  line-height: 10px;
  background-color: #ccff00;
  padding: 2px 4px;
  border: 1px solid #bceb00;
  border-radius: 8px;
  margin-bottom: 8px;
  margin-left: 16px;
  user-select: none;
`;

export const StyledLogo = styled(Logo)`
  display: block;
  max-width: 100px;
  color: #1d1d1f;
  margin-bottom: 8px;
  margin-left: 16px;
`;

export const TopSeparator = styled(Separator)`
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
`;

export const NavLink = styled(BaseNavLink)`
  display: block;
`;

export const BottomSeparator = styled(Separator)`
  margin: 8px 0;
`;

export const VersionInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const VersionInfoLink = styled(NavLink)`
  flex: 1;
  color: #818188;
  font-size: 12px;
  line-height: 16px;
`;

const pulse = keyframes`
  from {
    color: #818188;
  }

  10% {
    color: #4100b3;
  }

  20%, to {
    color: #818188;
  }
`;

export const ReloadButton = styled(Button)`
  flex: 0;
  color: #818188;
  padding: 6px;
  background: transparent;
  animation: ${pulse} 5s linear infinite;

  &:hover {
    background-color: #dcdcde;
  }
`;
