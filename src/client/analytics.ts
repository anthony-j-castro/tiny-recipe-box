import googleAnalytics from "@analytics/google-analytics";
import Analytics from "analytics";
import config from "~/config";

const plugins = [];

if (config.GOOGLE_ANALYTICS_MEASUREMENT_ID) {
  plugins.push(
    googleAnalytics({
      measurementIds: [config.GOOGLE_ANALYTICS_MEASUREMENT_ID],
    }),
  );
}

const analytics = Analytics({
  app: "tinyrecipebox.com",
  plugins,
});

export default analytics;
