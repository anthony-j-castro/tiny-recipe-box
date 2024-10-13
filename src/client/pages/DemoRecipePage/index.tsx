import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useEffect, useRef, useState } from "react";
import { useWakeLock } from "react-screen-wake-lock";
import { useAnalytics } from "use-analytics";
import PageContent from "~/client/components/PageContent";
import PageHeading from "~/client/components/PageHeading";
import { ButtonsContainer, Container, Separator, ToggleButton } from "./styled";

const ICON_OPTIONS = { fontSize: 24, marginRight: "8px" };

const DemoRecipePage = () => {
  const analytics = useAnalytics();
  const containerRef = useRef<HTMLDivElement>(null);

  const wakeLock = useWakeLock();

  useEffect(() => {
    analytics.page({ title: "Demo Recipe" });
  }, [analytics]);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const isWakeLockActive =
    wakeLock !== undefined && wakeLock.released === false;

  useEffect(() => {
    function onFullscreenChange() {
      const newIsFullscreen = Boolean(document.fullscreenElement);
      setIsFullscreen(newIsFullscreen);

      if (!newIsFullscreen) {
        wakeLock.release();
      }
    }

    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, [wakeLock]);

  return (
    <PageContent>
      <PageHeading>Demo Recipe</PageHeading>
      <Container ref={containerRef}>
        <ButtonsContainer>
          <ToggleButton
            isSelected={isFullscreen && isWakeLockActive}
            onChange={(newState) => {
              if (newState === false) {
                if (document.fullscreenElement !== null) {
                  window.document.exitFullscreen();
                }
                // wakeLock.release() is always called in the onFullscreenChange
                // handler, so we don't need to call it here.
              } else {
                containerRef.current?.requestFullscreen();
                wakeLock.request();
              }
            }}
          >
            <MenuBookIcon sx={ICON_OPTIONS} />
            <span>Countertop mode</span>
          </ToggleButton>
          <Separator />
          <ToggleButton
            isSelected={isFullscreen}
            onChange={(newState) => {
              if (newState === false) {
                if (document.fullscreenElement !== null) {
                  window.document.exitFullscreen();
                }
              } else {
                containerRef.current?.requestFullscreen();
              }
            }}
          >
            {isFullscreen ? (
              <FullscreenExitIcon sx={ICON_OPTIONS} />
            ) : (
              <FullscreenIcon sx={ICON_OPTIONS} />
            )}
            <span>Fullscreen mode</span>
          </ToggleButton>
          <ToggleButton
            isSelected={isWakeLockActive}
            onChange={(newState) => {
              if (newState === false) {
                wakeLock.release();
              } else {
                wakeLock.request();
              }
            }}
          >
            {isWakeLockActive ? (
              <BrightnessHighIcon sx={ICON_OPTIONS} />
            ) : (
              <BrightnessAutoIcon sx={ICON_OPTIONS} />
            )}
            <span>Screen Lock</span>
          </ToggleButton>
        </ButtonsContainer>
      </Container>
    </PageContent>
  );
};

export default DemoRecipePage;