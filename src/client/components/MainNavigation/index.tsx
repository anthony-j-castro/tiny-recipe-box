import { Link } from "@tanstack/react-router";
import React from "react";
import analytics from "~/client/analytics";
import MonospacedText from "~/client/components/MonospacedText";
import config from "~/config";
import {
  AlphaPill,
  BottomSeparator,
  List,
  NavLink,
  PrimaryNav,
  SecondaryNav,
  Sidebar,
  StyledLogo,
  TopSeparator,
  VersionInfoLink,
} from "./styled";

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
        <Link to="/">
          <StyledLogo />
        </Link>
        <TopSeparator />
        <List>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </List>
      </PrimaryNav>
      <SecondaryNav>
        <List>
          <li>
            <NavLink to="/settings">Settings</NavLink>
          </li>
        </List>
        {shaData ? (
          <>
            <BottomSeparator />
            <VersionInfoLink
              onClick={() => {
                analytics.track("clicked_commit_link");
              }}
              target="_blank"
              to={`https://github.com/anthony-j-castro/tiny-recipe-box/commit/${shaData.long}`}
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
