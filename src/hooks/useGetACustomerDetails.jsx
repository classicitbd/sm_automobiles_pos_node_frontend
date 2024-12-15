import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./../utils/baseURL";

const useGetACustomerDetails = (_id) => {
  return useQuery({
    queryKey: [`/api/v1/customer/${_id}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/customer/${_id}`);
      const data = await res.json();
      return data;
    },
  });
};

export default useGetACustomerDetails;
