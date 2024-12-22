import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { useEffect, useState } from "react";
import { DateTimeFormat } from "@/utils/dateTimeFormet";
import { Link } from "react-router-dom";

const ProfitTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  //refetch,
  // user,
  isLoading,
  profits,
}) => {
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
          <div className="shadow-md mt-3 rounded-lg">
            {profits?.data?.length > 0 ? (
              <div className="overflow-x-auto ">
                <table className="min-w-full  text-sm">
                  <thead>
                    <tr className=" font-semibold text-center ">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Invoice No</td>
                      <td className="whitespace-nowrap p-4 ">Create Date</td>
                      <td className="whitespace-nowrap p-4 ">Total Amount</td>
                      <td className="whitespace-nowrap p-4 ">
                        Received Amount
                      </td>
                      <td className="whitespace-nowrap p-4 ">Profit Amount</td>
                      <td className="whitespace-nowrap p-4 ">Due Amount</td>
                    </tr>
                  </thead>

                  <tbody>
                    {profits?.data?.map((profit, i) => (
                      <tr
                        key={profit?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                          <Link to="">
                            <span className="text-blue-600 underline ">
                              {profit?.order_id}
                            </span>
                          </Link>
                        </td>
                        <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                          {" "}
                          {DateTimeFormat(profit?.createdAt)}
                        </td>
                        <td className="whitespace-nowrap py-3 font-medium text-green-600">
                          {profit?.sub_total_amount}
                        </td>

                        <td className="whitespace-nowrap py-3 font-medium text-blue-600">
                          {profit?.received_amount}
                        </td>
                        <td className="whitespace-nowrap py-3 font-medium text-green-600">
                          {profit?.profit_amount}
                        </td>
                        <td className="whitespace-nowrap py-3 font-medium text-red-600">
                          {profit?.due_amount}
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

          {totalData > 3 && (
            <Pagination
              setPage={setPage}
              setLimit={setLimit}
              totalData={totalData}
              page={page}
              limit={limit}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ProfitTable;
