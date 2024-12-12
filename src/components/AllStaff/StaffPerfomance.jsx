import { SettingContext } from "@/context/SettingProvider";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import useGetSelfOrder from "@/hooks/useGetAllSelfOrder";

const StaffPerfomance = () => {
  const { user_id } = useParams();
  const { settingData } = useContext(SettingContext);

  //Fetch SaleTarget Data
  const { data: saleTargetData = [], isLoading } = useQuery({
    queryKey: [`/api/v1/sale_target/${user_id}?role_type=sale_target_show`],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/sale_target/${user_id}?role_type=sale_target_show`,
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

  //get order data
  const { data: orderData = [], isLoading: orderLoading } =
    useGetSelfOrder(user_id);

  if (isLoading || orderLoading) return <LoaderOverlay />;

  return (
    <div>
      <>
        {/* search Staff PerFomance History... */}
        <div className="flex items-center justify-between mt-4">
          <h3 className="text-[26px] font-medium text-gray-800 ">
            STAFF PERFOMANCE Report
          </h3>
        </div>

        <>
          <div className="flex items-center justify-between my-5 mx-28">
            <div className="text-[26px] font-bold text-gray-800">
              <p>User Name: {saleTargetData?.data?.userdetails?.user_name}</p>
              <p>
                User Phone:
                {saleTargetData?.data?.userdetails?.user_phone}
              </p>
            </div>
            <div className="text-[26px] font-bold text-gray-800">
              <p>
                User Address: {saleTargetData?.data?.userdetails?.user_address}
              </p>
              <p>
                User Status:{" "}
                {saleTargetData?.data?.userdetails?.user_status == "active"
                  ? "Active"
                  : "In-Active"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6">
            {/* OrderList */}
            <div>
              <div className="mt-5">
                <p className="text-[20px] font-medium text-center">
                  Order List
                </p>
              </div>
              {saleTargetData?.data?.findSaleTarget?.length > 0 ? (
                <div className="overflow-x-auto rounded-t-lg border">
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                      <tr className="divide-x  divide-gray-300  font-semibold text-center text-gray-900">
                        <td className="whitespace-nowrap p-4 ">SL No</td>
                        <td className="whitespace-nowrap p-4 ">Invoice Id</td>
                        <td className="whitespace-nowrap p-4 ">Total Amount</td>
                        <td className="whitespace-nowrap p-4 ">
                          Received Amount
                        </td>
                        <td className="whitespace-nowrap p-4 ">Due Amount</td>
                        <td className="whitespace-nowrap p-4 ">Order Status</td>
                        <td className="whitespace-nowrap p-4 ">Total</td>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-center">
                      {orderData?.data?.map(
                        (order, i) => (
                          <tr
                            key={order?._id}
                            className={`divide-x divide-gray-200 ${
                              i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                            }`}
                          >
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {i + 1}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {order?.order_id}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {order?.grand_total_amount}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {order?.received_amount}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {order?.due_amount}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {order?.order_status}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {order?.total_messurement_count}{" "}{settingData?.unit_name}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <NoDataFound />
              )}
            </div>

            {/* Sale Target */}
            <div className="col-span-1">
              <div className="mt-5">
                <p className="text-[20px] font-medium text-center">
                  Sale Target
                </p>
              </div>
              {saleTargetData?.data?.findSaleTarget?.length > 0 ? (
                <div className="overflow-x-auto rounded-t-lg border">
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                      <tr className="divide-x  divide-gray-300  font-semibold text-center text-gray-900">
                        <td className="whitespace-nowrap p-4 ">SL No</td>
                        <td className="whitespace-nowrap p-4 ">Start Date</td>
                        <td className="whitespace-nowrap p-4 ">End Date</td>
                        <td className="whitespace-nowrap p-4 ">Sale Target</td>
                        <td className="whitespace-nowrap p-4 ">
                          Sale Target Fill Up
                        </td>
                        <td className="whitespace-nowrap p-4 ">Get Amount</td>
                        <td className="whitespace-nowrap p-4 ">Status</td>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-center">
                      {saleTargetData?.data?.findSaleTarget?.map(
                        (sale_target, i) => (
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
                              {sale_target?.sale_target_start_date}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {sale_target?.sale_target_end_date}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {sale_target?.sale_target}{" "}
                              {settingData?.unit_name}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {sale_target?.sale_target_filup}{" "}
                              {settingData?.unit_name}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {sale_target?.sale_target_amount}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {sale_target?.sale_target_success == true
                                ? "Success"
                                : "Pending"}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <NoDataFound />
              )}
            </div>
          </div>
        </>
      </>
    </div>
  );
};

export default StaffPerfomance;
