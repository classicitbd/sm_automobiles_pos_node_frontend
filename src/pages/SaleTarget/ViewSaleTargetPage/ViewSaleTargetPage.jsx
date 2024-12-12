import ViewSaleTarget from "@/components/SaleTarget/ViewSaleTarget";
import { AuthContext } from "@/context/AuthProvider";
import { SettingContext } from "@/context/SettingProvider";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
const ViewSaleTargetPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { settingData } = useContext(SettingContext);

  //Fetch Bank Data
  const {
    data: saleTargetData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/sale_target/a_sale_target_report/${id}?role_type=a_sale_target_report_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/sale_target/a_sale_target_report/${id}?role_type=a_sale_target_report_show`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          const errorData = await res.text();
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          );
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
  });

  return (
    <div>
      <div className="bg-white rounded-lg py-6 px-4 shadow">
        <ViewSaleTarget
          saleTargetData={saleTargetData}
          isLoading={isLoading}
          refetch={refetch}
          settingData={settingData}
        />
      </div>
    </div>
  );
};

export default ViewSaleTargetPage;
