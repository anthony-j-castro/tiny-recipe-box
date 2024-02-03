import React from "react";
import {
  AlphaPill,
  BottomSeparator,
  List,
  PrimaryNav,
  SecondaryNav,
  Sidebar,
  StyledLogo,
  TopSeparator,
} from "~/client/components/MainNavigation/styled";
import MonospacedText from "~/client/components/MonospacedText";
import config from "~/config";
import { NavLink, VersionInfoLink } from "./styled";

interface Props {
  className?: string;
}

const MainNavigation = ({ className }: Props) => {
  const shaData = config.GITHUB_COMMIT_SHA
    ? {
        long: config.GITHUB_COMMIT_SHA,
        short: config.GITHUB_COMMIT_SHA.substring(0, 7),
      }
    : undefined;

  return (
    <Sidebar className={className}>
      <PrimaryNav>
        <AlphaPill>α version</AlphaPill>
        <a href="/">
          <StyledLogo />
        </a>
        <TopSeparator />
        <List>
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
        </List>
      </PrimaryNav>
      <SecondaryNav>
        <List>
          <li>
            <NavLink
              data-status="active"
              href="/privacy-policy.html"
            >
              Privacy Policy
            </NavLink>
          </li>
        </List>
        {shaData ? (
          <>
            <BottomSeparator />
            <VersionInfoLink
              href={`https://github.com/anthony-j-castro/tiny-recipe-box/commit/${shaData.long}`}
              rel="noreferrer"
              target="_blank"
            >
              Site Version: <MonospacedText>{shaData.short}</MonospacedText>
            </VersionInfoLink>
          </>
        ) : null}
      </SecondaryNav>
    </Sidebar>
  );
};

export default MainNavigation;
