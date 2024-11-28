import { IoMdEye } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";
import ExpenseDocumentModalShow from "./ExpenseDocumentModalShow";
import UpdateExpenses from "./UpdateExpenses";
import Pagination from "../common/pagination/Pagination";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";

const ExpensesTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  expenses,
}) => {
  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const [getExpenseModalData, setGetExpenseModalData] = useState({});
  const [openDocumentModal, setOpenDocumentModal] = useState(false);
  const [getDocumentData, setGetDocumentData] = useState({});

  //Update handle Function
  const handleExpensesUpdateModal = (expense) => {
    setOpenExpenseModal(true);
    setGetExpenseModalData(expense);
  };

  //Document Show Function
  const handleShowDocumentModal = (expense) => {
    setOpenDocumentModal(true);
    setGetDocumentData(expense);
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
            {expenses?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        SL No
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Expenses Title
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Expense Voucher
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Expense Description
                      </th>

                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Expenses Amount
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Expenses Bank Name
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Expenses Date
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
                  {expenses?.data?.map((expense, i) => (
                      <tr
                        key={expense?._id}
                        className={`divide-x divide-gray-200 ${
                          i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                        }`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {expense?.expense_title}
                        </td>
                        <td className="whitespace-nowrap px-4  py-1.5 text-gray-700 flex justify-center">
                        <button
                          className="ml-[8px]"
                          onClick={() => handleShowDocumentModal(expense)}
                          disabled={!expense?.expense_voucher ? true : false}
                        >
                          <IoMdEye
                            size={25}
                            className="cursor-pointer text-gray-500 hover:text-gray-300"
                          />
                        </button>
                      </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {expense?.expense_description}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {expense?.expense_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {expense?.expense_bank_id?.bank_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {expense?.expense_date}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {expense?.expense_publisher_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {expense?.expense_updated_by?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 px-2 text-gray-700">
                          <button
                            className="ml-3"
                            onClick={() => handleExpensesUpdateModal(expense)}
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
          
              <Pagination
                setPage={setPage}
                setLimit={setLimit}
                totalData={totalData}
                page={page}
                limit={limit}
              />
            
          </div>

          {/* Show Expense Update Modal */}
          {openExpenseModal && (
            <UpdateExpenses
              setOpenExpenseModal={setOpenExpenseModal}
              getExpenseModalData={getExpenseModalData}
              refetch={refetch}
              user={user}
            />
          )}
          {/* Show Expense Document Modal */}
          {openDocumentModal && (
            <ExpenseDocumentModalShow
              setOpenDocumentModal={setOpenDocumentModal}
              getDocumentData={getDocumentData}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ExpensesTable;
