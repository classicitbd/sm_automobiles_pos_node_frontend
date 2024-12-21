import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./../utils/baseURL";

const useGetCashDetails = () => {
  return useQuery({
    queryKey: [`/api/v1/cash`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/cash`);
      const data = await res.json();
      return data;
    },
  });
};

export default useGetCashDetails;