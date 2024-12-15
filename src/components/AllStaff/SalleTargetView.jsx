import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import { SettingContext } from "@/context/SettingProvider";
import useGetAUserDetails from "@/hooks/useGetAUserDetails";

const SalleTargetView = () => {
  const { user_id } = useParams();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);
  const {settingData} = useContext(SettingContext);

  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  // handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value);
    setLimit(10);
    setPage(1);
  };

  //Fetch SaleTarget Data
  const {
    data: saleTargetData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/sale_target/${user_id}?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=sale_target_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/sale_target/${user_id}?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=sale_target_show`,
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

  //get user data
  const { data: userData = {}, isLoading: userLoading } =
    useGetAUserDetails(user_id);

  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  return (
    <>
      {/* search Bank Account... */}
      <div className="mt-3">
        <input
          type="text"
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="Search ref no..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>
      {isLoading === true || userLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <>
          <div className=" mt-4">
            <h3 className="text-[26px] font-bold text-gray-800 capitalize">
              User Sale Target List
            </h3>
            <div className="flex items-center justify-between my-5 mx-28">
              <div className="text-[26px] font-bold text-gray-800">
                <p>User Name: {userData?.data?.user_name}</p>
                <p>
                  User Phone:
                  {userData?.data?.user_phone}
                </p>
              </div>
              <div className="text-[26px] font-bold text-gray-800">
                <p>
                  User Address:{" "}
                  {userData?.data?.user_address}
                </p>
                <p>
                  User Status:{" "}
                  {userData?.data?.user_status == "active"
                    ? "Active"
                    : "In-Active"}
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
                    {saleTargetData?.data?.map((sale_target, i) => (
                      <tr
                        key={sale_target?._id}
                        className={`divide-x divide-gray-200 ${
                          i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                        }`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                        {sale_target?.sale_target_start_date}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.sale_target_end_date}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.sale_target}{" "}{settingData?.unit_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.sale_target_filup}{" "}{settingData?.unit_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.sale_target_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.sale_target_success == true ? "Success" : "Pending"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <NoDataFound />
            )}
            <Pagination
              setPage={setPage}
              setLimit={setLimit}
              totalData={saleTargetData?.totalData}
              page={page}
              limit={limit}
            />
          </div>
        </>
      )}
    </>
  );
};

export default SalleTargetView;
