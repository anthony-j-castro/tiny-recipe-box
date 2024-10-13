import { useEffect, useRef } from "react";
import { useWakeLock } from "react-screen-wake-lock";
import { useAnalytics } from "use-analytics";
import PageContent from "~/client/components/PageContent";
import PageHeading from "~/client/components/PageHeading";
import { Container } from "./styled";

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

  return (
    <PageContent>
      <PageHeading>Demo Recipe</PageHeading>
      <Container ref={containerRef}>
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
