import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneBank } from "react-icons/ai";

import UpdateBankInfo from "./UpdateBankInfo";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import { CiBank, CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";

const BankInfoTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  banks,
}) => {
  //Update Handle contoler
  const [bankAccountUpdateModal, setBankAccountUpdateModal] = useState(false);
  const [bankAccountUpdateData, setBankAccountUpdateData] = useState({});

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

  // bank update modal
  const handleBankUpdateModal = (bank) => {
    setBankAccountUpdateData(bank);
    setBankAccountUpdateModal(true);
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
            {banks?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x divide-gray-300  font-semibold text-center ">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Bank Name</td>
                      <td className="whitespace-nowrap p-4 ">Account Name</td>
                      <td className="whitespace-nowrap p-4 ">Account No</td>
                      <td className="whitespace-nowrap p-4 ">Bank Balance</td>
                      <td className="whitespace-nowrap p-4 ">Created By</td>
                      <td className="whitespace-nowrap p-4 ">Updated By</td>
                      <td className="whitespace-nowrap p-4 ">Action</td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {banks?.data?.map((bank, i) => (
                      <tr
                        key={bank?._id}
                        className={`divide-x divide-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                          }`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-blue-600">
                          {bank?.bank_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {bank?.account_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {bank?.account_no}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {bank?.bank_balance > 0 ? (
                            <span className="text-green-500">
                              {bank?.bank_balance}
                            </span>
                          ) : (
                            <span className="text-red-500">
                              {bank?.bank_balance}
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {bank?.bank_publisher_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {bank?.bank_updated_by?.user_name ? bank?.bank_updated_by?.user_name : '--'}
                        </td>
                        <td className="whitespace-nowrap py-1.5 px-2 text-gray-700">
                          <button
                            className="ml-[8px]"
                            onClick={() => handleShowDocumentModal(bank?._id)}
                          >
                            <CiMenuKebab
                              size={30}
                              className="cursor-pointer text-gray-500 hover:text-gray-300 font-bold"
                            />
                          </button>
                          {bankDocumentModal == bank?._id && (
                            <div className=" bg-bgray-200 shadow-xl w-[150px] flex flex-col gap-2 py-2 modal-container absolute right-14 z-30">
                              <button
                                className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium "
                                onClick={() => handleBankUpdateModal(bank)}
                              >
                                <FiEdit size={18} />
                                Edit
                              </button>
                              <Link to={`/bank-balance-history/${bank?._id}`}>
                                {" "}
                                <button className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium ">
                                  <CiBank size={18} />
                                  Update History
                                </button>
                              </Link>
                              <Link to={`/bank-in/${bank?._id}`}>
                                {" "}
                                <button className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium ">
                                  <CiBank size={18} />
                                  View Bank in
                                </button>
                              </Link>
                              <Link to={`/bank-out/${bank?._id}`}>
                                {" "}
                                <button className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium ">
                                  <AiTwotoneBank size={18} /> View Bank Out
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

          {/* Show Bank Update Modal */}
          {bankAccountUpdateModal && (
            <UpdateBankInfo
              setBankAccountUpdateModal={setBankAccountUpdateModal}
              bankAccountUpdateData={bankAccountUpdateData}
              refetch={refetch}
              user={user}
            />
          )}
        </div>
      )}
    </>
  );
};

export default BankInfoTable;
