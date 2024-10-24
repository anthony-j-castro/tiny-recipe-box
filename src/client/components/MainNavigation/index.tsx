import { Link } from "@tanstack/react-router";
import { SyncAlert as SyncAlertIcon } from "mdi-material-ui";
import { useAnalytics } from "use-analytics";
import MonospacedText from "~/client/components/MonospacedText";
import { useExtensionContext } from "~/client/contexts/ExtensionContext";
import useNewSiteVersionAvailable from "~/client/hooks/useNewSiteVersionAvailable";
import config from "~/config";
import DisplaySettings from "./DisplaySettings";
import ExtensionStatusDot from "./ExtensionStatusDot";
import {
  AlphaPill,
  BottomSeparator,
  List,
  NavLink,
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
            <NavLink to="/browser-extension">
              Extension Status:
              <ExtensionStatusDot status={extensionInfo.isInstalled} />
            </NavLink>
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
                <ReloadButton
                  onClick={() => {
                    analytics.track("clicked_reload_button");
                    window.location.reload();
                  }}
                  title="Reload to get newest version"
                >
                  <SyncAlertIcon sx={{ display: "block", fontSize: 20 }} />
                </ReloadButton>
              ) : null}
            </VersionInfo>
          </>
        ) : null}
      </SecondaryNav>
    </Sidebar>
  );
};

export default MainNavigation;
