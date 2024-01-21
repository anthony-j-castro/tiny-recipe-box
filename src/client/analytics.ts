import googleAnalytics from "@analytics/google-analytics";
import Analytics from "analytics";
import config from "~/config";

const analytics = Analytics({
  app: "tinyrecipebox.com",
  plugins: [
    googleAnalytics({
      measurementIds: [config.GOOGLE_ANALYTICS_MEASUREMENT_ID],
    }),
  ],
});

export default analytics;
