import TableLoadingSkeleton from "@/components/common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "@/components/common/pagination/Pagination";
import { AuthContext } from "@/context/AuthProvider";
import { SettingContext } from "@/context/SettingProvider";
import useDebounced from "@/hooks/useDebounced";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmployePaymentList = () => {
  const [serialNumber, setSerialNumber] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);
  const { settingData } = useContext(SettingContext);

  // handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value);
    setLimit(10);
    setPage(1);
  };

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  const check_publisher_id = user?.check_publisher_id
    ? user?.check_publisher_id
    : user?._id;

  //Fetch Customer Data
  const {
    data: allEmployelist = [],
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/check/find_user_publish_check?check_publisher_id=${check_publisher_id}&page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/check/find_user_publish_check?check_publisher_id=${check_publisher_id}&page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl">Employe Payment List</h1>
        </div>

        <div className="mt-3">
          <input
            type="text"
            defaultValue={searchTerm}
            onChange={(e) => handleSearchValue(e.target.value)}
            placeholder="Search Customers..."
            className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
      </div>
      <>
        {isLoading === true ? (
          <TableLoadingSkeleton />
        ) : (
          <div>
            <div className="rounded-lg shadow-md mt-6">
              {allEmployelist?.data?.length > 0 ? (
                <div className="overflow-x-auto rounded-lg">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="font-semibold text-center">
                        <td className="whitespace-nowrap p-4 ">SL No</td>
                        <td className="whitespace-nowrap p-4 ">Invice No</td>
                        <td className="whitespace-nowrap p-4 ">
                          Customer Name
                        </td>
                        <td className="whitespace-nowrap p-4 ">
                          Customer Phone
                        </td>
                        <td className="whitespace-nowrap p-4 ">Bank Name</td>
                        <td className="whitespace-nowrap p-4 ">
                          Payment Method
                        </td>
                        <td className="whitespace-nowrap p-4 ">Check No</td>
                        <td className="whitespace-nowrap p-4 ">
                          Withdraw Date
                        </td>
                        <td className="whitespace-nowrap p-4 ">Status</td>

                        <td className="whitespace-nowrap p-4 ">Total Amount</td>
                        <td className="whitespace-nowrap p-4 ">Pay Amount</td>
                      </tr>
                    </thead>

                    <tbody>
                      {allEmployelist?.data?.map((employe, i) => (
                        <tr
                          key={employe?._id}
                          className={`text-center ${
                            i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                          } hover:bg-blue-100`}
                        >
                          <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                            {serialNumber + i + 1}
                          </td>
                          <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                            <Link to={`/order-details/${employe?._id}`}>
                              <span className="text-blue-600 underline">
                                {" "}
                                {employe?.invoice_number}
                              </span>
                            </Link>
                          </td>
                          <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                            {employe?.customer_id?.customer_name}
                          </td>
                          <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                            {employe?.customer_phone}
                          </td>
                          <td className="whitespace-nowrap py-3 font-medium text-blue-600">
                            {employe?.bank_id?.bank_name
                              ? employe?.bank_id?.bank_name
                              : "--"}
                          </td>
                          <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                            {employe?.payment_method === "cash" ? (
                              <span className="text-secondary-default">
                                {employe?.payment_method}
                              </span>
                            ) : (
                              <span className="text-purple">
                                {employe?.payment_method}
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                            {employe?.check_number
                              ? employe?.check_number
                              : "--"}
                          </td>
                          <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                            {employe?.check_withdraw_date
                              ? employe?.check_withdraw_date
                              : "--"}
                          </td>
                          <td className="whitespace-nowrap py-3 font-medium text-gray-700 capitalize">
                            {employe?.check_status === "approved" ? (
                              <span className="text-green-600">
                                {employe?.check_status}
                              </span>
                            ) : (
                              <span className="text-red-600">
                                {employe?.check_status}
                              </span>
                            )}
                          </td>

                          <td className="whitespace-nowrap py-3 font-medium text-green-600">
                            {employe?.order_id?.grand_total_amount}
                          </td>
                          <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                            {employe?.pay_amount ===
                            employe?.order_id?.grand_total_amount ? (
                              <span className="text-green-600">
                                {employe?.pay_amount}
                              </span>
                            ) : employe?.pay_amount >
                              employe?.order_id?.grand_total_amount ? (
                              <span className="text-blue-600">
                                {employe?.pay_amount}
                              </span>
                            ) : (
                              <span className="text-yellow-600">
                                {employe?.pay_amount}
                              </span>
                            )}
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
          </div>
        )}
        <Pagination
          setPage={setPage}
          setLimit={setLimit}
          totalData={allEmployelist?.totalData}
          page={page}
          limit={limit}
        />
      </>
    </>
  );
};

export default EmployePaymentList;
