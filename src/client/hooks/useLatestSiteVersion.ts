import { useQuery } from "@tanstack/react-query";
import { Decoder, nonEmptyArray, nonEmptyString, object } from "decoders";

type DeploymentsApiResponse = Array<{ sha: string }>;

const deploymentsApiResponseDecoder: Decoder<DeploymentsApiResponse> =
  nonEmptyArray(
    object({
      sha: nonEmptyString,
    }),
  );

const useLatestSiteVersion = () =>
  useQuery({
    queryKey: ["latestSiteVersion"],
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

      return lastDeployment.sha;
    },
  });

export default useLatestSiteVersion;
