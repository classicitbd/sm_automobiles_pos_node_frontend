import TableLoadingSkeleton from "@/components/common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "@/components/common/pagination/Pagination";
import { AuthContext } from "@/context/AuthProvider";
import { SettingContext } from "@/context/SettingProvider";
import useDebounced from "@/hooks/useDebounced";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

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
          <h1 className="text-2xl">Employe List</h1>
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
            <div className="rounded-lg border border-gray-200 mt-6">
              {allEmployelist?.data?.length > 0 ? (
                <div className="overflow-x-auto rounded-t-lg">
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                      <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                        <td className="whitespace-nowrap p-4 ">SL No</td>
                        <td className="whitespace-nowrap p-4 ">
                          Customer Name
                        </td>
                        <td className="whitespace-nowrap p-4 ">
                          Customer Phone
                        </td>
                        <td className="whitespace-nowrap p-4 ">Invice No</td>
                        <td className="whitespace-nowrap p-4 ">Total Amount</td>
                        <td className="whitespace-nowrap p-4 ">Pay Amount</td>
                        <td className="whitespace-nowrap p-4 ">
                          Total Messurement
                        </td>
                        <td className="whitespace-nowrap p-4 ">
                          Payment Method
                        </td>
                        <td className="whitespace-nowrap p-4 ">Bank Name</td>
                        <td className="whitespace-nowrap p-4 ">Check No</td>
                        <td className="whitespace-nowrap p-4 ">
                          withdraw Date
                        </td>
                        <td className="whitespace-nowrap p-4 ">Status</td>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-center">
                      {allEmployelist?.data?.map((employe, i) => (
                        <tr
                          key={employe?._id}
                          className={`divide-x divide-gray-200 ${
                            i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                          }`}
                        >
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {serialNumber + i + 1}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {employe?.customer_id?.customer_name}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {employe?.customer_phone}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {employe?.invoice_number}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {employe?.order_id?.grand_total_amount}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {employe?.pay_amount}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {employe?.order_id?.total_messurement_count}{" "}
                            {settingData?.unit_name}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {employe?.payment_method}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {employe?.bank_id?.bank_name}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {employe?.check_number}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {employe?.check_withdraw_date}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 capitalize">
                            {employe?.check_status}
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
