import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import { DateTimeFormat } from "@/utils/dateTimeFormet";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import useDebounced from "@/hooks/useDebounced";
import { AuthContext } from "@/context/AuthProvider";


const AllProfit = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);



  const [serialNumber, setSerialNumber] = useState();

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);


  // handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value);
    setLimit(10);
    setPage(1);
  };

  //Fetch order Data
  const {
    data: profits = [],
    isLoading,

  } = useQuery({
    queryKey: [
      `/api/v1/order/profit?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=order_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/order/profit?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=order_show`,
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
        <div>
          <div className="flex justify-between">
            <h2>All Profit</h2>
            <div className="">
              <input
                type="text"
                defaultValue={searchTerm}
                onChange={(e) => handleSearchValue(e.target.value)}
                placeholder="Search Profit..."
                className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>
          <div className="rounded-lg  mt-6">
            {profits?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg scrollbar-thin">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="ltr:text-left rtl:text-right ">
                    <tr className=" divide-gray-300  font-semibold text-center text-gray-900">
                      <td className="whitespace-nowrap p-4 uppercase">SL No</td>
                      <td className="whitespace-nowrap p-4 uppercase">Invoice No</td>
                      <td className="whitespace-nowrap p-4 uppercase">Total Amount</td>
                      <td className="whitespace-nowrap p-4 uppercase">
                        Received Amount
                      </td>
                      <td className="whitespace-nowrap p-4 uppercase text-red-600">Due Amount</td>
                      <td className="whitespace-nowrap p-4 uppercase">Profit Amount</td>

                      <td className="whitespace-nowrap p-4 uppercase">Create Date</td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {profits?.data?.map((profit, i) => (
                      <tr
                        key={profit?._id}
                        className=' divide-gray-200'

                      >
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-400">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-400">
                          {profit?.order_id}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-green-600">
                          {profit?.sub_total_amount}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-green-600">


                          {
                            profit?.received_amount === profit?.sub_total_amount ? (
                              <span className="text-green-600">{profit?.received_amount}</span>
                            ) : profit?.received_amount > profit?.sub_total_amount ? (
                              <span className="text-blue-600">{profit?.received_amount}</span>
                            ) : (
                              <span className="text-yellow-600">{profit?.received_amount}</span>
                            )
                          }
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-red-600">
                          {profit?.due_amount}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-400">
                          {
                            profit?.profit_amount > 0 ? <span className="text-green-600"> {profit?.profit_amount}</span> : <span className="text-red-600"> {profit?.profit_amount}</span>
                          }

                        </td>

                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-400">
                          {" "}
                          {DateTimeFormat(profit?.createdAt)}
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

          {profits?.totalData > 3 && (
            <Pagination
              setPage={setPage}
              setLimit={setLimit}
              totalData={profits?.totalData}
              page={page}
              limit={limit}
            />
          )}
        </div>
      )}
    </>
  )
}

export default AllProfit