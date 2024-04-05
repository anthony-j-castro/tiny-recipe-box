import { useQuery } from "@tanstack/react-query";
import {
  Decoder,
  constant,
  nonEmptyArray,
  nonEmptyString,
  object,
} from "decoders";
import config from "~/config";

type DeploymentsApiResponse = Array<{
  environment: "github-pages";
  sha: string;
}>;

const deploymentsApiResponseDecoder: Decoder<DeploymentsApiResponse> =
  nonEmptyArray(
    object({
      environment: constant("github-pages"),
      sha: nonEmptyString,
    }),
  );

const useNewSiteVersionAvailable = () =>
  useQuery({
    queryKey: ["newSiteVersionAvailable"],
    queryFn: async () => {
      const response = await fetch(
        `https://api.github.com/repos/anthony-j-castro/tiny-recipe-box/deployments?${new URLSearchParams(
          {
            environment: "github-pages",
            per_page: "1",
          },
        )}`,
      );

      const responseJson = await response.json();

      const [lastDeployment] =
        deploymentsApiResponseDecoder.verify(responseJson);

      return lastDeployment.sha !== config.GITHUB_COMMIT_SHA;
    },
    refetchInterval: 10 * 60 * 1000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });

export default useNewSiteVersionAvailable;