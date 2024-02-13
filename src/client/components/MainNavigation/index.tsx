import { Link } from "@tanstack/react-router";
import { useAnalytics } from "use-analytics";
import MonospacedText from "~/client/components/MonospacedText";
import { useExtensionContext } from "~/client/contexts/ExtensionContext";
import config from "~/config";
import ExtensionStatusDot from "./ExtensionStatusDot";
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
  const analytics = useAnalytics();
  const extensionInfo = useExtensionContext();

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
          <li>
            <NavLink to="/browser-extension">
              Extension Status:
              <ExtensionStatusDot status={extensionInfo.isInstalled} />
            </NavLink>
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
