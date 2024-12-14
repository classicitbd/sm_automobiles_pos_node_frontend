import TableLoadingSkeleton from "@/components/common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "@/components/common/pagination/Pagination";
import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { BASE_URL } from "@/utils/baseURL";
import { DateTimeFormat } from "@/utils/dateTimeFormet";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

const SaleTarget = () => {
  const [serialNumber, setSerialNumber] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  //Fetch Customer Data
  const {
    data: targetedSales = [],
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: [`/api/v1/sale_target/${user?._id}?page=${page}&limit=${limit}&`],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/sale_target/${user?._id}?page=${page}&limit=${limit}&`,
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

  console.log(targetedSales);
  return (
    <>
      <div className="mt-6">
        <div>
          <h1 className="text-2xl">Sale Target</h1>
        </div>

        {isLoading === true ? (
          <p>Loading.....</p>
        ) : (
          <div className="flex  justify-between my-5 mx-28">
            <div className="text-[26px] font-bold text-gray-800">
              <p>
                Employe Name : {targetedSales?.data?.userdetails?.user_name}
              </p>
              <p>
                Employe Phone : {targetedSales?.data?.userdetails?.user_phone}
              </p>
              <p>
                Employe Salery : {targetedSales?.data?.userdetails?.user_salary}
              </p>
            </div>
            <div className="text-[26px] font-bold text-gray-800">
              <p>
                {" "}
                Employe Email : {targetedSales?.data?.userdetails?.user_email}
              </p>
              <p>
                {" "}
                Employe Address :{" "}
                {targetedSales?.data?.userdetails?.user_address}
              </p>
            </div>
          </div>
        )}
      </div>
      <>
        {isLoading === true ? (
          <TableLoadingSkeleton />
        ) : (
          <div>
            <div className="rounded-lg border border-gray-200 mt-6">
              {targetedSales?.data?.findSaleTarget?.length > 0 ? (
                <div className="overflow-x-auto rounded-t-lg">
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                      <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                        <td className="whitespace-nowrap p-4 ">SL No</td>
                        <td className="whitespace-nowrap p-4 ">Sale Target</td>
                        <td className="whitespace-nowrap p-4 ">
                          Sale Target Amount
                        </td>
                        <td className="whitespace-nowrap p-4 ">
                          Sale Target Start Date
                        </td>
                        <td className="whitespace-nowrap p-4 ">
                          Sale Target End Date
                        </td>
                        <td className="whitespace-nowrap p-4 ">
                          {" "}
                          Sale Target Filup
                        </td>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-center">
                      {targetedSales?.data?.findSaleTarget.map(
                        (saleTarget, i) => (
                          <tr
                            key={saleTarget?._id}
                            className={`divide-x divide-gray-200 ${
                              i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                            }`}
                          >
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {serialNumber + i + 1}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {saleTarget?.sale_target}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {saleTarget?.sale_target_amount}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {DateTimeFormat(
                                saleTarget?.sale_target_start_date
                              )}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {DateTimeFormat(saleTarget?.sale_target_end_date)}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {saleTarget?.sale_target_filup}
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
        )}
        <Pagination
          setPage={setPage}
          setLimit={setLimit}
          totalData={targetedSales?.totalData}
          page={page}
          limit={limit}
        />
      </>
    </>
  );
};

export default SaleTarget;
