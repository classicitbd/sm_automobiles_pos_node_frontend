import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import { DateTimeFormat } from "@/utils/dateTimeFormet";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { useEffect, useState } from "react";
import BankOutChart from "./BankOutChart";

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
  handleSearchValue,
  searchTerm
}) => {
  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  return (

    <>



      <div className="mt-4">
        <h3 className="sm:text-[26px] sm:font-medium text-gray-800 uppercase">
          Bank Out Payment List
        </h3>
      </div>
      <div className="flex items-center justify-between p-5  bg-gray-50 shadow-md mt-4 flex-wrap">
        <div className="font-bold">
          <p className="sm:text-[20px] text-bgray-700">  Bank Name : <span className="sm:text-[20px] text-blue-600">{bankData?.data?.bank_name}</span></p>
          <p className="sm:text-[20px] text-bgray-700">
            Bank Balance : {bankData?.data?.bank_balance ? <span className="sm:text-[20px] text-green-600">{bankData?.data?.bank_balance}</span> : <span className="sm:text-[20px] text-red-600">0</span>}
          </p>
        </div>
        <div className="font-bold text-bgray-700">
          <p className="sm:text-[20px] text-bgray-700">
            Accout Name : {bankData?.data?.account_name}
          </p>
          <p className="sm:text-[20px] text-bgray-700">
            Accout Number : {bankData?.data?.account_no}
          </p>
        </div>
      </div>


      <div className="bg-gray-50  p-5 shadow-md mt-8">

        <BankOutChart />
      </div>

      {/* search Bank Account... */}
      <div className="mt-8 flex justify-end">
        <input
          type="text"
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="Search ref no..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>

      {
        isLoading === true || bankLoading ? (
          <TableLoadingSkeleton />
        ) : <div className="rounded-lg border border-gray-200 mt-2">
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
                      className={`divide-x divide-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
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
                      <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
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

        </div>
      }


      <Pagination
        setPage={setPage}
        setLimit={setLimit}
        totalData={totalData}
        page={page}
        limit={limit}
      />
    </>

  );
};

export default BankOut;
