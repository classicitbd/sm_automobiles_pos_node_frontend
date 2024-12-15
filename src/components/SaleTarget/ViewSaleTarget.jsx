import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/baseURL";

const ViewSaleTarget = ({
  saleTargetData,
  isLoading,
  refetch,
  settingData,
  id
}) => {

  //Fetch saleTargetDetails Data
  const {
    data: saleTargetDetails = []
  } = useQuery({
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
          <div className=" mt-4">
            <h3 className="text-[26px] font-bold text-gray-800 capitalize">
              User Sale Target List Report
            </h3>
            <div className="flex items-center justify-between my-5 mx-28">
              <div className="text-[26px] font-bold text-gray-800">
                <p>User Name: {saleTargetDetails?.data?.user_id?.user_name}</p>
                <p>
                  User Phone:
                  {saleTargetDetails?.data?.user_id?.user_phone}
                </p>
                <p>
                  User Address:{" "}
                  {saleTargetDetails?.data?.user_id?.user_address}
                </p>
                <p>
                  User Status:{" "}
                  {saleTargetDetails?.data?.user_id?.user_status == "active"
                    ? "Active"
                    : "In-Active"}
                </p>
              </div>
              <div className="text-[26px] font-bold text-gray-800">
                <p>
                  Start Date:{" "}
                  {saleTargetDetails?.data?.sale_target_start_date}
                </p>
                <p>
                  End Date:{" "}
                  {saleTargetDetails?.data?.sale_target_end_date}
                </p>
                <p>
                  Total Target:{" "}
                  {saleTargetDetails?.data?.sale_target}{" "}{settingData?.unit_name}
                </p>
                <p>
                  Get Amount:{" "}
                  {saleTargetDetails?.data?.sale_target_amount}
                </p>
                <p>
                  Fill Up:{" "}
                  {saleTargetDetails?.data?.sale_target_filup}{" "}{settingData?.unit_name}
                </p>
                <p>
                  Target Status:{" "}
                  {saleTargetDetails?.data?.sale_target_success == true ? "Success" : "Pending"}
                </p>
              </div>
            </div>
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
                      <td className="whitespace-nowrap p-4 ">Received Amount</td>
                      <td className="whitespace-nowrap p-4 ">
                        Due Amount
                      </td>
                      <td className="whitespace-nowrap p-4 ">Total Messurement</td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {saleTargetData?.data?.map(
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
                            {sale_target?.order_id}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {sale_target?.grand_total_amount}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {sale_target?.received_amount}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {sale_target?.due_amount}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {sale_target?.total_messurement_count}{" "}{settingData?.unit_name}
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
        </>
      )}
    </>
  );
};

export default ViewSaleTarget;
