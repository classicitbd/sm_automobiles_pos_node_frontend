import { FiEdit } from "react-icons/fi";
import PurchaseDocumentModalShow from "./PurchaseDocumentModalShow";
import UpdatePurchase from "./UpdatePurchase";
import { IoMdEye } from "react-icons/io";
import { useEffect, useState } from "react";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "../common/pagination/Pagination";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";

const PurchaseTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  purchases,
}) => {
  const [OpenPurchaseModal, setOpenPurchaseModal] = useState(false);
  const [getPurchaseModalData, setGetPurchaseModalData] = useState({});
  const [openDocumentModal, setOpenDocumentModal] = useState(false);
  const [getDocumentData, setGetDocumentData] = useState({});

  //Update handle Function
  const handlePurchaseUpdateModal = (purchase) => {
    setOpenPurchaseModal(true);
    setGetPurchaseModalData(purchase);
  };

  //Document Show Function
  const handleShowDocumentModal = (purchase) => {
    setOpenDocumentModal(true);
    setGetDocumentData(purchase);
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
            {purchases?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        SL No
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Purchase Title
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Purchase Voucher
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Purchase Description
                      </th>

                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Purchase Amount
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Purchase Bank Name
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Purchase Date
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Created By
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Updated By
                      </th>

                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {purchases?.data?.map((purchase, i) => (
                      <tr
                        key={purchase?._id}
                        className={`divide-x divide-gray-200 ${
                          i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                        }`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {purchase?.purchase_title}
                        </td>
                        <td className="whitespace-nowrap px-4  py-1.5 text-gray-700 flex justify-center">
                          <button
                            className="ml-[8px]"
                            onClick={() => handleShowDocumentModal(purchase)}
                            disabled={
                              !purchase?.purchase_voucher ? true : false
                            }
                          >
                            <IoMdEye
                              size={25}
                              className="cursor-pointer text-gray-500 hover:text-gray-300"
                            />
                          </button>
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {purchase?.purchase_description}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {purchase?.purchase_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {purchase?.purchase_bank_id?.bank_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {purchase?.purchase_date}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {purchase?.purchase_publisher_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {purchase?.purchase_updated_by?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 px-2 text-gray-700">
                          <button
                            className="ml-3"
                            onClick={() => handlePurchaseUpdateModal(purchase)}
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
            {/* pagination */}

            {totalData > 10 && (
              <Pagination
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
                totalData={totalData}
              />
            )}
          </div>

          {/* Show Purchase Update Modal */}
          {OpenPurchaseModal && (
            <UpdatePurchase
              setOpenPurchaseModal={setOpenPurchaseModal}
              getPurchaseModalData={getPurchaseModalData}
              refetch={refetch}
              user={user}
            />
          )}
          {/* Show Purchase Document Modal */}
          {openDocumentModal && (
            <PurchaseDocumentModalShow
              setOpenDocumentModal={setOpenDocumentModal}
              getDocumentData={getDocumentData}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PurchaseTable;
