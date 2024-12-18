import TableLoadingSkeleton from "@/components/common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "@/components/common/pagination/Pagination";
import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import useGetAUserDetails from "@/hooks/useGetAUserDetails";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { BASE_URL } from "@/utils/baseURL";
import { DateTimeFormat } from "@/utils/dateTimeFormet";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

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

  //get user data
  const { data: userData = {}, isLoading: userLoading } =
    useGetAUserDetails(user?._id);

  const [supplierDocumentModal, setSupplierDocumentModal] = useState(null);

  const handleShowDocumentModal = (id) => {
    setSupplierDocumentModal((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <div className="mt-6">
        <div className="mt-4">
          <h3 className="sm:text-[26px] sm:font-medium text-gray-800 uppercase">
           Sale Target
          </h3>
        </div>

        {isLoading === true ? (
          <p>Loading.....</p>
        ) : (
            <div className="flex items-center justify-between p-5  bg-gray-50 shadow-md mt-4 flex-wrap">
              <div className="font-bold">
                <p className="sm:text-[20px] text-bgray-700">User Name : {userData?.data?.user_name}</p>
                <p className="sm:text-[20px] text-bgray-700">
                  User Phone : {userData?.data?.user_phone}
                </p>
              </div>
              <div className="font-bold text-bgray-700">
                <p className="sm:text-[20px] text-bgray-700">
                  User Address : {userData?.data?.user_address}
                </p>
                <p className="sm:text-[20px] text-bgray-700">
                  User Status : {userData?.data?.user_status == "active"
                    ? <span className="text-green-600 sm:text-[20px] font-bold"> Active </span>
                    : <span className="text-red-600 sm:text-[20px] font-bold"> In-Active </span>}
                </p>
              </div>
            </div>
        )}
      </div>
      <>
        {isLoading === true || userLoading ? (
          <TableLoadingSkeleton />
        ) : (
          <div>
            <div className="rounded-lg border border-gray-200 mt-6">
              {targetedSales?.data?.length > 0 ? (
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
                        <td className="whitespace-nowrap p-4 "> Action</td>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-center">
                      {targetedSales?.data?.map(
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
                            <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                              {saleTarget?.sale_target}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-purple">
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
                              {saleTarget?.sale_target_filup === saleTarget?.sale_target ? <span className="text-green-600">{saleTarget?.sale_target_filup}</span> : <span className="text-red-600">{saleTarget?.sale_target_filup}</span>}
                            </td>
                            <td className="whitespace-nowrap py-1.5 px-2 text-gray-700">
                              <button
                                className="ml-[8px]"
                                onClick={() =>
                                  handleShowDocumentModal(saleTarget?._id)
                                }
                              >
                                <CiMenuKebab
                                  size={30}
                                  className="cursor-pointer text-gray-500 hover:text-gray-300 font-bold"
                                />
                              </button>
                              {supplierDocumentModal == saleTarget?._id && (
                                <div className=" bg-bgray-200 shadow-xl w-[150px] flex flex-col gap-2 py-2 modal-container absolute right-14 z-30">

                                  <Link
                                    to={`/sale-target-view/${saleTarget?._id}`}
                                  >
                                    {" "}
                                    <button className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium">
                                      <FaEye size={16} /> View
                                    </button>
                                  </Link>
                                </div>
                              )}
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
