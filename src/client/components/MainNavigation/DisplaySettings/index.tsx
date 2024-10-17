import { useEffect, useState } from "react";
import { useWakeLock } from "react-screen-wake-lock";
import NavigationSwitch from "~/client/components/NavigationSwitch";
import { Container, SwitchWrapper } from "./styled";

const DisplaySettings = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const wakeLock = useWakeLock();
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
    <Container>
      <SwitchWrapper $isPrimary>
        <NavigationSwitch
          isSelected={isFullscreen && isWakeLockActive}
          onChange={(isEnabled) => {
            if (isEnabled) {
              window.document.documentElement.requestFullscreen();
              wakeLock.request();
            } else {
              if (document.fullscreenElement !== null) {
                window.document.exitFullscreen();
              }
              // wakeLock.release() is always called in the onFullscreenChange
              // handler, so we don't need to call it here.
            }
          }}
        >
          Countertop Mode
        </NavigationSwitch>
      </SwitchWrapper>
      <SwitchWrapper>
        <NavigationSwitch
          isSelected={isFullscreen}
          onChange={(isEnabled) => {
            if (isEnabled) {
              window.document.documentElement.requestFullscreen();
            } else {
              if (document.fullscreenElement !== null) {
                window.document.exitFullscreen();
              }
            }
          }}
        >
          Fullscreen Mode
        </NavigationSwitch>
      </SwitchWrapper>
      <SwitchWrapper>
        <NavigationSwitch
          isSelected={isWakeLockActive}
          onChange={(isEnabled) => {
            if (isEnabled) {
              wakeLock.request();
            } else {
              wakeLock.release();
            }
          }}
        >
          Screen Lock
        </NavigationSwitch>
      </SwitchWrapper>
    </Container>
  );
};

export default DisplaySettings;
