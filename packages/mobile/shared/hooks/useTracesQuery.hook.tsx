import { useQuery } from "react-query";
import { getTraces } from "../services/supabase.service";

const useTracesQuery = () => {
  const key = ["traces"];

  return useQuery(key, async () => {
    return getTraces().then((result) => result.data);
  });
};

export default useTracesQuery;
