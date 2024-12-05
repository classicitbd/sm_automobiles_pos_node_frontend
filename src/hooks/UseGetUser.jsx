import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../utils/baseURL";

const UseGetUser = () => {
  return useQuery({
    queryKey: [`/api/v1/user`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/user`);
      const data = await res.json();
      return data;
    },
  });
};

export default UseGetUser;
