import { useEffect, useState } from "react";
import Pagination from "../common/pagination/Pagination";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { Button } from "../ui/button";
import { FaEye } from "react-icons/fa";
import ExpenseDocumentModalShow from "./ExpenseDocumentModalShow";

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
  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [documentModalData, setDocumentModalData] = useState("");

  return (
    <>
      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          <div className="rounded shadow-md mt-3 bg-gray-50">
            {expenses?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="font-bold text-center">
                      <th className="whitespace-nowrap p-4 font-medium ">
                        SL No
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium ">
                        Expenses Title
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium ">
                        Expenses Date
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium ">
                        Created By
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium ">
                        Product Name
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium ">
                        Supplier Name
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium ">
                        Supplier Phone
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium ">
                        Document
                      </th>

                      <th className="whitespace-nowrap p-4 font-medium  ">
                        Expenses Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {expenses?.data?.map((expense, i) => (
                      <tr
                        key={expense?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {expense?.expense_title || "--"}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {expense?.expense_date || "--"}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {expense?.expense_publisher_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {expense?.expense_product_id?.product_name || "--"}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {expense?.expense_supplier_id?.supplier_name || "--"}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {expense?.expense_supplier_id?.supplier_phone || "--"}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {expense?.expense_voucher ? (
                            <Button
                              className="text-primary-600 hover:underline"
                              onClick={() => {
                                setDocumentModalOpen(true);
                                setDocumentModalData(expense);
                              }}
                            >
                              <FaEye className="text-white" size={25} />
                            </Button>
                          ) : (
                            "--"
                          )}
                        </td>

                        <td className="whitespace-nowrap py-1.5 font-medium text-red-600">
                          {expense?.expense_amount || (
                            <span className="text-green-600">N/A</span>
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
          {/* pagination */}

          <Pagination
            setPage={setPage}
            setLimit={setLimit}
            totalData={totalData}
            page={page}
            limit={limit}
          />
        </div>
      )}

      {/* see document in modal */}
      {documentModalOpen && (
        <ExpenseDocumentModalShow
          setDocumentModalOpen={setDocumentModalOpen}
          documentModalData={documentModalData}
        />
      )}
    </>
  );
};

export default ExpensesTable;
