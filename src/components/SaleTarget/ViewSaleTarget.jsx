import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/baseURL";
import ViewSaleTargetChart from "./ViewSaleTargetChart";

const ViewSaleTarget = ({
  saleTargetData,
  isLoading,
  refetch,
  settingData,
  id,
}) => {
  //Fetch saleTargetDetails Data
  const { data: saleTargetDetails = [] } = useQuery({
    queryKey: [
      `/api/v1/sale_target/a_sale_target_details/${id}?role_type=a_sale_target_details_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/sale_target/a_sale_target_details/${id}?role_type=a_sale_target_details_show`,
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
    <>
      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <>
          <div className="mt-2">
            <h3 className="text-[26px] font-bold text-gray-800 uppercase">
              User Sale Target List Report
            </h3>
            <div className="flex justify-between p-3 bg-gray-50 shadow-md mt-4 flex-wrap gap-2">
              <div className="font-bold">
                <p className="sm:text-[18px] text-bgray-700">
                  User Name : {saleTargetDetails?.data?.user_id?.user_name}
                </p>
                <p className="sm:text-[18px] text-bgray-700">
                  User Phone : {saleTargetDetails?.data?.user_id?.user_phone}
                </p>
                <p className="sm:text-[18px] text-bgray-700">
                  User Address :{" "}
                  {saleTargetDetails?.data?.user_id?.user_address}
                </p>
                <p className="sm:text-[18px] text-bgray-700">
                  User Status :
                  {saleTargetDetails?.data?.user_id?.user_status == "active" ? (
                    <span className="text-green-600 sm:text-[20px] font-bold">
                      {" "}
                      Active{" "}
                    </span>
                  ) : (
                    <span className="text-red-600 sm:text-[20px] font-bold">
                      {" "}
                      In-Active{" "}
                    </span>
                  )}
                </p>
              </div>
              <div className="font-bold">
                <p className="sm:text-[18px] text-bgray-700">
                  Start Date : {saleTargetDetails?.data?.sale_target_start_date}
                </p>
                <p className="sm:text-[18px] text-bgray-700">
                  End Date : {saleTargetDetails?.data?.sale_target_end_date}
                </p>
                <p className="sm:text-[18px] text-bgray-700">
                  Total Target :{" "}
                  <span className="text-blue-600 sm:text-[18px]">
                    {parseFloat(saleTargetDetails?.data?.sale_target) + parseFloat(saleTargetDetails?.data?.brand_sale_target)}{" "}
                    {settingData?.unit_name}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50  p-5 shadow-md mt-8">
            <ViewSaleTargetChart />
          </div>
          <div className="rounded-lg border border-gray-200 mt-6">
            {saleTargetData?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x  divide-gray-300  font-semibold text-center text-gray-900">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Invoice Id</td>
                      <td className="whitespace-nowrap p-4 ">Total Amount</td>
                      <td className="whitespace-nowrap p-4 ">
                        Received Amount
                      </td>
                      <td className="whitespace-nowrap p-4 text-red-600">
                        Due Amount
                      </td>
                      <td className="whitespace-nowrap p-4 ">
                        Total Messurement
                      </td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {saleTargetData?.data?.map((sale_target, i) => (
                      <tr
                        key={sale_target?._id}
                        className={`divide-x divide-gray-200 ${
                          i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                        }`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.order_id}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                          {sale_target?.grand_total_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                          {sale_target?.received_amount ===
                          sale_target?.grand_total_amount ? (
                            <span className="text-green-600">
                              {sale_target?.received_amount}
                            </span>
                          ) : sale_target?.received_amount >
                            sale_target?.grand_total_amount ? (
                            <span className="text-blue-600">
                              {sale_target?.received_amount}
                            </span>
                          ) : (
                            <span className="text-yellow-600">
                              {sale_target?.received_amount}
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-red-600">
                          {sale_target?.due_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-green-700">
                          {sale_target?.total_measurement_count}{" "}
                          {settingData?.unit_name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <NoDataFound />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ViewSaleTarget;
