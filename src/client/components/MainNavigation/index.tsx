import { Link } from "@tanstack/react-router";
import { TooltipTrigger } from "react-aria-components";
import { useAnalytics } from "use-analytics";
import MonospacedText from "~/client/components/MonospacedText";
import Tooltip from "~/client/components/Tooltip";
import { useExtensionContext } from "~/client/contexts/ExtensionContext";
import useNewSiteVersionAvailable from "~/client/hooks/useNewSiteVersionAvailable";
import config from "~/config";
import DisplaySettings from "./DisplaySettings";
import ExtensionStatusDot from "./ExtensionStatusDot";
import {
  AlphaPill,
  BottomSeparator,
  ExtensionStatusNavLink,
  List,
  NavLink,
  NewVersionIcon,
  PrimaryNav,
  ReloadButton,
  SecondaryNav,
  Sidebar,
  StyledLogo,
  TopSeparator,
  VersionInfo,
  VersionInfoLink,
} from "./styled";

interface Props {
  className?: string;
}

const MainNavigation = ({ className }: Props) => {
  const analytics = useAnalytics();
  const extensionInfo = useExtensionContext();

  const { data: isNewSiteVersionAvailable } = useNewSiteVersionAvailable();

  const shaData = config.GITHUB_COMMIT_SHA
    ? {
        long: config.GITHUB_COMMIT_SHA,
        short: config.GITHUB_COMMIT_SHA.slice(0, 7),
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
        <DisplaySettings />
        <BottomSeparator />
        <List>
          <li>
            <NavLink to="/settings">Settings</NavLink>
          </li>
          <li>
            <ExtensionStatusNavLink to="/browser-extension">
              Extension Status
              <ExtensionStatusDot status={extensionInfo.isInstalled} />
            </ExtensionStatusNavLink>
          </li>
          <li>
            <NavLink to="/import-recipe">Import Recipe</NavLink>
          </li>
        </List>
        {shaData ? (
          <>
            <BottomSeparator />
            <VersionInfo>
              <VersionInfoLink
                onClick={() => {
                  analytics.track("clicked_commit_link");
                }}
                target="_blank"
                to={`https://github.com/anthony-j-castro/tiny-recipe-box/commit/${shaData.long}`}
              >
                Site Version: <MonospacedText>{shaData.short}</MonospacedText>
              </VersionInfoLink>
              {isNewSiteVersionAvailable ? (
                <TooltipTrigger>
                  <ReloadButton
                    onPress={() => {
                      analytics.track("clicked_reload_button");
                      window.location.reload();
                    }}
                  >
                    <NewVersionIcon />
                  </ReloadButton>
                  <Tooltip>Reload to get newest version</Tooltip>
                </TooltipTrigger>
              ) : null}
            </VersionInfo>
          </>
        ) : null}
      </SecondaryNav>
    </Sidebar>
  );
};

export default MainNavigation;
