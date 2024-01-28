import { useMutation } from "@tanstack/react-query";
import worker from "~/client/worker";

const useInitializeDatabase = () =>
  useMutation({
    mutationFn: async () => worker.initializeDatabase(),
  });

export default useInitializeDatabase;
