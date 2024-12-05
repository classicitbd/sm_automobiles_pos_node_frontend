import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./../utils/baseURL";

const useGetOrder = () => {
  return useQuery({
    queryKey: [`/api/v1/order`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/order`);
      const data = await res.json();
      return data;
    },
  });
};

export default useGetOrder;
