import { useQuery } from "@tanstack/react-query";
import worker from "~/client/worker";

const useIsDatabaseInitialized = () =>
  useQuery({
    queryKey: ["isDatabaseInitialized"],
    queryFn: async () => worker.getDatabaseExists(),
  });

export default useIsDatabaseInitialized;
