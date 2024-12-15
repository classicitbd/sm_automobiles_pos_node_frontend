import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./../utils/baseURL";

const useGetBankDetails = (_id) => {
  return useQuery({
    queryKey: [`/api/v1/bank/${_id}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/bank/${_id}`);
      const data = await res.json();
      return data;
    },
  });
};

export default useGetBankDetails;
