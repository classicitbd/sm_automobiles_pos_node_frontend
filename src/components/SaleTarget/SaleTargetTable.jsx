import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import UpdateSaleTarget from "./UpdateSaleTarget";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const SaleTargetTable = ({
  saleTargetData,
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  settingData,
  userTypes,
  userLoading,
  settingLoading,
  brandLoading,
}) => {
  const [saleTargetUpdateModal, setSaleTargetUpdateModal] = useState(false);
  const [saleTargetUpdateData, setSaleTargetUpdateData] = useState({});

  //handle Update Function..

  const handleSaleTargetUpdateModal = (saleTarget) => {
    setSaleTargetUpdateData(saleTarget);
    setSaleTargetUpdateModal(true);
  };

  // -------------//

  // handle document modal open for edit view
  const [bankDocumentModal, setBankDocumentModal] = useState(null);

  const handleShowDocumentModal = (id) => {
    setBankDocumentModal((prevId) => (prevId === id ? null : id));
  };

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-container")) {
        setBankDocumentModal(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  //-----------//

  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

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
      {isLoading === true ||
      userLoading === true ||
      settingLoading ||
      brandLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          <div className="rounded-lg shadow-md mt-6">
            {saleTargetData?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full  text-sm">
                  <thead>
                    <tr className="  font-semibold text-center ">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">User Name</td>
                      <td className="whitespace-nowrap p-4 ">User Phone</td>
                      <td className="whitespace-nowrap p-4 ">Create By</td>
                      <td className="whitespace-nowrap p-4 ">Updated By</td>
                      <td className="whitespace-nowrap p-4 ">Start Date</td>
                      <td className="whitespace-nowrap p-4 ">End Date</td>
                      <td className="whitespace-nowrap p-4 ">Brand Name</td>
                      <td className="whitespace-nowrap p-4 ">Brand Target</td>
                      <td className="whitespace-nowrap p-4 ">Fill Up</td>
                      <td className="whitespace-nowrap p-4 ">Others Target</td>
                      <td className="whitespace-nowrap p-4 ">Others Fill Up</td>
                      <td className="whitespace-nowrap p-4 ">(1-50)%</td>
                      <td className="whitespace-nowrap p-4 ">(51-100)%</td>
                      <td className="whitespace-nowrap p-4 ">Total Get</td>
                      <td className="whitespace-nowrap p-4 ">Status</td>
                      <td className="whitespace-nowrap p-4 ">Action</td>
                    </tr>
                  </thead>

                  <tbody>
                    {saleTargetData?.data?.map((sale_target, i) => (
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
                          {sale_target?.user_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium">
                          {sale_target?.user_id?.user_phone}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.sale_target_publisher_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.sale_target_updated_by?.user_name
                            ? sale_target?.sale_target_updated_by?.user_name
                            : "--"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.sale_target_start_date}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.sale_target_end_date}
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
                          {bankDocumentModal == sale_target?._id && (
                            <div className="  bg-success-50 shadow-xl w-[200px] flex flex-col gap-2 py-2 modal-container absolute right-14 z-30">
                              {user?.user_role_id?.sale_target_patch ==
                                true && (
                                <button
                                  className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium "
                                  onClick={() =>
                                    handleSaleTargetUpdateModal(sale_target)
                                  }
                                >
                                  <FiEdit size={18} />
                                  Edit
                                </button>
                              )}

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
          <Pagination
            setPage={setPage}
            setLimit={setLimit}
            totalData={totalData}
            page={page}
            limit={limit}
          />

          {/* Show saleTarget Update Modal */}
          {saleTargetUpdateModal && (
            <UpdateSaleTarget
              setSaleTargetUpdateModal={setSaleTargetUpdateModal}
              saleTargetUpdateData={saleTargetUpdateData}
              refetch={refetch}
              user={user}
              settingData={settingData}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SaleTargetTable;
