import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../utils/baseURL";

const useGetCampaign = ({ page, limit, searchTerm, panel_owner_id }) => {
  return useQuery({
    queryKey: [
      `/api/v1/campaign/dashboard/add_campaign_product?page=${page}&limit=${limit}&searchTerm=${searchTerm}&panel_owner_id=${panel_owner_id}&role_type=campaign_show`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/campaign/dashboard/add_campaign_product?page=${page}&limit=${limit}&searchTerm=${searchTerm}&panel_owner_id=${panel_owner_id}&role_type=campaign_show`
      );
      const data = await res.json();
      return data;
    },
  });
};

export default useGetCampaign;
