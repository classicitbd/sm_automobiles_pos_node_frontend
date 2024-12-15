import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import { DateTimeFormat } from "@/utils/dateTimeFormet";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { useEffect, useState } from "react";

const BankOut = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  bankOutData,
  bankLoading,
  bankData,
}) => {
  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  return (
    <>
      {isLoading === true || bankLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <>
          <div className=" mt-4">
            <h3 className="text-[26px] font-bold text-gray-800 capitalize">
              Bank In Payment List
            </h3>
            <div className="flex items-center justify-between my-5 mx-28">
              <div className="text-[26px] font-bold text-gray-800">
                <p>Bank Name: {bankData?.data?.bank_name}</p>
                <p>Bank Balance: {bankData?.data?.bank_balance}</p>
              </div>
              <div className="text-[26px] font-bold text-gray-800">
                <p>Accout Name: {bankData?.data?.account_name}</p>
                <p>Accout Number: {bankData?.data?.account_no}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 mt-6">
            {bankOutData?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x  divide-gray-300  font-semibold text-center text-gray-900">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Time</td>
                      <td className="whitespace-nowrap p-4 ">Title</td>
                      <td className="whitespace-nowrap p-4 ">
                        Payment Reference ID
                      </td>
                      <td className="whitespace-nowrap p-4 ">Payment Amount</td>
                      <td className="whitespace-nowrap p-4 ">Created By</td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {bankOutData?.data?.map((payment, i) => (
                      <tr
                        key={payment?._id}
                        className={`divide-x divide-gray-200 ${
                          i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                        }`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {DateTimeFormat(payment?.createdAt)}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {payment?.bank_out_title}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {payment?.bank_out_ref_no}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {payment?.bank_out_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {payment?.bank_out_publisher_id?.user_name}
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
              totalData={totalData}
              page={page}
              limit={limit}
            />
          </div>
        </>
      )}
    </>
  );
};

export default BankOut;
