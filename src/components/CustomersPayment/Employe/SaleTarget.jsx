import TableLoadingSkeleton from "@/components/common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "@/components/common/pagination/Pagination";
import { AuthContext } from "@/context/AuthProvider";
import { SettingContext } from "@/context/SettingProvider";
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
  const {settingData} = useContext(SettingContext);

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
  const { data: userData = {}, isLoading: userLoading } = useGetAUserDetails(
    user?._id
  );

  const [supplierDocumentModal, setSupplierDocumentModal] = useState(null);

  const handleShowDocumentModal = (id) => {
    setSupplierDocumentModal((prevId) => (prevId === id ? null : id));
  };

    // calculate commission amount
    const calculateCommissionAmount = (data) => {
      // Calculate the total target
      const totalTarget = data?.brand_sale_target + data?.sale_target;
  
      // Calculate the 50% split
      const firstHalf = totalTarget / 2;
      const secondHalf = totalTarget - firstHalf;
  
      // Calculate the commission
      const commision_amount =
        firstHalf * data?.first_half_amount_per_unit +
        secondHalf * data?.second_half_amount_per_unit;
  
      return commision_amount;
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
              <p className="sm:text-[20px] text-bgray-700">
                User Name : {userData?.data?.user_name}
              </p>
              <p className="sm:text-[20px] text-bgray-700">
                User Phone : {userData?.data?.user_phone}
              </p>
            </div>
            <div className="font-bold text-bgray-700">
              <p className="sm:text-[20px] text-bgray-700">
                User Address : {userData?.data?.user_address}
              </p>
              <p className="sm:text-[20px] text-bgray-700">
                User Status :{" "}
                {userData?.data?.user_status == "active" ? (
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
          </div>
        )}
      </div>
      <>
        {isLoading === true || userLoading ? (
          <TableLoadingSkeleton />
        ) : (
          <div>
            <div className="rounded-lg shadow-md mt-6">
              {targetedSales?.data?.length > 0 ? (
                <div className="overflow-x-auto rounded-lg">
                  <table className="min-w-full etext-sm">
                    <thead>
                      <tr className="  font-semibold text-center ">
                        <td className="whitespace-nowrap p-4 ">SL No</td>
                        <td className="whitespace-nowrap p-4 ">
                          Start Date
                        </td>
                        <td className="whitespace-nowrap p-4 ">
                          End Date
                        </td>
                        <td className="whitespace-nowrap p-4 ">Brand Name</td>
                        <td className="whitespace-nowrap p-4 ">Brand Target</td>
                        <td className="whitespace-nowrap p-4 ">Fill Up</td>
                        <td className="whitespace-nowrap p-4 ">
                          Others Target
                        </td>
                        <td className="whitespace-nowrap p-4 ">
                          Others Fill Up
                        </td>
                        <td className="whitespace-nowrap p-4 ">(1-50)%</td>
                        <td className="whitespace-nowrap p-4 ">(51-100)%</td>
                        <td className="whitespace-nowrap p-4 ">Total Get</td>
                        <td className="whitespace-nowrap p-4 ">Status</td>
                        <td className="whitespace-nowrap p-4 "> Action</td>
                      </tr>
                    </thead>

                    <tbody>
                      {targetedSales?.data?.map((sale_target, i) => (
                        <tr
                          key={sale_target?._id}
                          className={`text-center ${
                            i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                          } hover:bg-blue-100`}
                        >
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {serialNumber + i + 1}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {DateTimeFormat(sale_target?.sale_target_start_date)}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {DateTimeFormat(sale_target?.sale_target_end_date)}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.brand_id?.brand_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-blue-600">
                          {sale_target?.brand_sale_target ? (
                            <>
                              {" "}
                              {sale_target?.brand_sale_target}{" "}
                              {settingData?.unit_name}
                            </>
                          ) : (
                            "--"
                          )}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                          {sale_target?.brand_sale_target_fillup >=
                          sale_target?.brand_sale_target * 0.8 ? (
                            <span className="text-green-600">
                              {" "}
                              {sale_target?.brand_sale_target_fillup}{" "}
                              {settingData?.unit_name}
                            </span>
                          ) : (
                            <span className="text-red-600">
                              {" "}
                              {sale_target?.brand_sale_target_fillup}{" "}
                              {settingData?.unit_name}
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-purple">
                          {sale_target?.sale_target ? (
                            <>
                              {" "}
                              {sale_target?.sale_target}{" "}
                              {settingData?.unit_name}
                            </>
                          ) : (
                            "--"
                          )}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                          {sale_target?.sale_target_fillup >=
                          sale_target?.sale_target * 0.8 ? (
                            <span className="text-green-600">
                              {" "}
                              {sale_target?.sale_target_fillup}{" "}
                              {settingData?.unit_name}
                            </span>
                          ) : (
                            <span className="text-red-600">
                              {" "}
                              {sale_target?.sale_target_fillup}{" "}
                              {settingData?.unit_name}
                            </span>
                          )}
                        </td>

                        <td className="whitespace-nowrap py-1.5 font-medium text-primary">
                          {sale_target?.first_half_amount_per_unit ? (
                            <>
                              {" "}
                              {sale_target?.first_half_amount_per_unit}{" "}
                              <small>(per {settingData?.unit_name})</small>
                            </>
                          ) : (
                            "--"
                          )}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium  text-primary">
                          {sale_target?.second_half_amount_per_unit ? (
                            <>
                              {" "}
                              {sale_target?.second_half_amount_per_unit}{" "}
                              <small>(per {settingData?.unit_name})</small>
                            </>
                          ) : (
                            "--"
                          )}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium  text-primary">
                          {calculateCommissionAmount(sale_target) || "--"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium  text-primary">
                          {sale_target?.brand_sale_target_success &&
                          sale_target?.sale_target_success ? (
                            <span className="text-green-600">Success</span>
                          ) : (
                            <span className="text-red-600">Pending</span>
                          )}
                        </td>
                          <td className="whitespace-nowrap py-1.5 px-2 text-gray-700">
                            <button
                              className="ml-[8px]"
                              onClick={() =>
                                handleShowDocumentModal(sale_target?._id)
                              }
                            >
                              <CiMenuKebab
                                size={30}
                                className="cursor-pointer text-primaryVariant-300 hover:text-primaryVariant-700 font-bold"
                              />
                            </button>
                            {supplierDocumentModal == sale_target?._id && (
                              <div className=" bg-success-50  shadow-xl w-[150px] flex flex-col gap-2 py-2 modal-container absolute right-14 z-30">
                                <Link
                                  to={`/sale-target-view/${sale_target?._id}`}
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
          totalData={targetedSales?.totalData}
          page={page}
          limit={limit}
        />
      </>
    </>
  );
};

export default SaleTarget;
