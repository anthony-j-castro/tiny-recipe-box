import { useQuery } from "@tanstack/react-query";
import { Decoder, nonEmptyArray, nonEmptyString, object } from "decoders";
import config from "~/config";

type DeploymentsApiResponse = Array<{ sha: string }>;

const deploymentsApiResponseDecoder: Decoder<DeploymentsApiResponse> =
  nonEmptyArray(
    object({
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
  });

export default useNewSiteVersionAvailable;
