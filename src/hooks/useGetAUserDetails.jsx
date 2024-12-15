import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./../utils/baseURL";

const useGetAUserDetails = (_id) => {
  return useQuery({
    queryKey: [`/api/v1/user/${_id}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/user/${_id}`);
      const data = await res.json();
      return data;
    },
  });
};

export default useGetAUserDetails;
