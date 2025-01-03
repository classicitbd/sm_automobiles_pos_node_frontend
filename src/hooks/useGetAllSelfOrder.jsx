import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./../utils/baseURL";

const useGetSelfOrder = (order_publisher_id, orderLimit, ordePage) => {
  return useQuery({
    queryKey: [
      `/api/v1/order/self_order/${order_publisher_id}?page=${ordePage}&limit=${orderLimit}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/order/self_order/${order_publisher_id}?page=${ordePage}&limit=${orderLimit}`
      );
      const data = await res.json();
      return data;
    },
  });
};

export default useGetSelfOrder;
