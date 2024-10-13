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
import { Container, ToggleButton } from "./styled";

const DemoRecipePage = () => {
  const analytics = useAnalytics();
  const containerRef = useRef<HTMLDivElement>(null);

  const wakeLock = useWakeLock({
    // onRequest: () => alert("Screen Wake Lock: requested!"),
    // onError: () => alert("An error happened 💥"),
    // onRelease: () => alert("Screen Wake Lock: released!"),
  });

  useEffect(() => {
    analytics.page({ title: "Demo Recipe" });
  }, [analytics]);

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const isWakeLockActive =
    wakeLock !== undefined && wakeLock.released === false;

  return (
    <PageContent>
      <PageHeading>Demo Recipe</PageHeading>
      <Container ref={containerRef}>
        <div>
          <ToggleButton
            onChange={(newState) => {
              if (newState === false) {
                window.document.exitFullscreen();
                wakeLock.release();
              } else {
                containerRef.current?.requestFullscreen();
                wakeLock.request();
              }
            }}
          >
            <MenuBookIcon
              htmlColor={isFullscreen && isWakeLockActive ? "blue" : undefined}
            />
          </ToggleButton>
          <button>
            {isFullscreen ? (
              <FullscreenExitIcon
                htmlColor="blue"
                onClick={() => {
                  window.document.exitFullscreen();
                }}
              />
            ) : (
              <FullscreenIcon
                onClick={() => {
                  containerRef.current?.requestFullscreen();
                }}
              />
            )}
          </button>
          <button>
            {isWakeLockActive ? (
              <BrightnessHighIcon
                htmlColor="blue"
                onClick={() => {
                  wakeLock.release();
                }}
              />
            ) : (
              <BrightnessAutoIcon
                onClick={() => {
                  wakeLock.request();
                }}
              />
            )}
          </button>
        </div>
        hi
        <button
          onClick={() => {
            containerRef.current?.requestFullscreen();
          }}
        >
          Fullscreen
        </button>
        <button
          onClick={async () => {
            wakeLock.request();
          }}
        >
          Wake Lock:{" "}
          {wakeLock.released === undefined
            ? "none"
            : wakeLock.released
              ? "released"
              : "active"}
        </button>
        <button
          disabled={wakeLock.released !== false}
          onClick={() => {
            wakeLock?.release();
          }}
        >
          Release Wake Lock
        </button>
      </Container>
    </PageContent>
  );
};

export default DemoRecipePage;
