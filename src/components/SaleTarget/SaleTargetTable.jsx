import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import UpdateSaleTarget from "./UpdateSaleTarget";

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
}) => {
  const [saleTargetUpdateModal, setSaleTargetUpdateModal] = useState(false);
  const [saleTargetUpdateData, setSaleTargetUpdateData] = useState({});

  //handle Update Function..

  const handlesaleTargetUpdateModal = (saleTarget) => {
    setSaleTargetUpdateData(saleTarget);
    setSaleTargetUpdateModal(true);
  };

  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);
  return (
    <>
      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          <div className="rounded-lg border border-gray-200 mt-6">
            {saleTargetData?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">User Name</td>
                      <td className="whitespace-nowrap p-4 ">User Phone</td>
                      <td className="whitespace-nowrap p-4 ">Start Date</td>
                      <td className="whitespace-nowrap p-4 ">End Date</td>
                      <td className="whitespace-nowrap p-4 ">Total Target</td>
                      <td className="whitespace-nowrap p-4 ">Get Amount</td>
                      <td className="whitespace-nowrap p-4 ">Status</td>
                      <td className="whitespace-nowrap p-4 ">Create By</td>
                      <td className="whitespace-nowrap p-4 ">Updated By</td>
                      <td className="whitespace-nowrap p-4 ">Action</td>
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
                          {sale_target?.user_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 ">
                          {sale_target?.user_id?.user_phone}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.sale_target_start_date}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.sale_target_end_date}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.sale_target} {settingData?.unit_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.sale_target_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.sale_target_success == true
                            ? "Success"
                            : "Pending"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.sale_target_publisher_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {sale_target?.sale_target_updated_by?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 px-2 text-gray-700">
                          <button
                            className="ml-3"
                            onClick={() =>
                              handlesaleTargetUpdateModal(sale_target)
                            }
                          >
                            <FiEdit
                              size={25}
                              className="cursor-pointer text-gray-500 hover:text-gray-300"
                            />
                          </button>
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
