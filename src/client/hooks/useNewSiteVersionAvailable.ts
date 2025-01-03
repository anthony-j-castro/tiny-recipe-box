import { useQuery } from "@tanstack/react-query";
import {
  constant,
  nonEmptyArray,
  nonEmptyString,
  object,
  positiveInteger,
  string,
  type Decoder,
} from "decoders";
import config from "~/config";

type DeploymentsApiResponse = Array<{
  environment: "github-pages";
  id: number;
  sha: string;
}>;

const deploymentsApiResponseDecoder: Decoder<DeploymentsApiResponse> =
  nonEmptyArray(
    object({
      environment: constant("github-pages"),
      id: positiveInteger,
      sha: nonEmptyString,
    }),
  );

type DeploymentStatusApiResponse = Array<{ state: string }>;

const deploymentStatusApiResponseDecoder: Decoder<DeploymentStatusApiResponse> =
  nonEmptyArray(
    object({
      state: string,
    }),
  );

const useNewSiteVersionAvailable = () =>
  useQuery({
    queryKey: ["newSiteVersionAvailable"],
    queryFn: async () => {
      const deploymentsResponse = await fetch(
        `https://api.github.com/repos/anthony-j-castro/tiny-recipe-box/deployments?${new URLSearchParams(
          {
            environment: "github-pages",
            per_page: "1",
          },
        )}`,
      );
      const deploymentsResponseJson = await deploymentsResponse.json();

      const [latestDeployment] = deploymentsApiResponseDecoder.verify(
        deploymentsResponseJson,
      );

      if (latestDeployment.sha === config.GITHUB_COMMIT_SHA) {
        return false;
      }

      const deploymentStatusResponse = await fetch(
        `https://api.github.com/repos/anthony-j-castro/tiny-recipe-box/deployments/${latestDeployment.id}/statuses?${new URLSearchParams(
          {
            per_page: "1",
          },
        )}`,
      );
      const deploymentStatusResponseJson =
        await deploymentStatusResponse.json();

      const [latestDeploymentStatus] =
        deploymentStatusApiResponseDecoder.verify(deploymentStatusResponseJson);

      return latestDeploymentStatus.state === "success";
    },
    refetchInterval: 10 * 60 * 1000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });

export default useNewSiteVersionAvailable;
