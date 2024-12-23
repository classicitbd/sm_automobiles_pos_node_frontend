import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import { DateTimeFormat } from "@/utils/dateTimeFormet";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { useEffect, useState } from "react";
import BankInChart from "./BankInChart";
import { Link } from "react-router-dom";

const BankIn = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  bankInData,
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
          Bank In Payment List
        </h3>
      </div>
      <div className="flex items-center justify-between p-5  bg-gray-50 shadow-md mt-4 flex-wrap">
        <div className="font-bold">
          <p className="sm:text-[20px] text-bgray-700">
            {" "}
            Bank Name :{" "}
            <span className="sm:text-[20px] text-blue-600">
              {bankData?.data?.bank_name}
            </span>
          </p>
          <p className="sm:text-[20px] text-bgray-700">
            Bank Balance :{" "}
            {bankData?.data?.bank_balance ? (
              <span className="sm:text-[20px] text-green-600">
                {bankData?.data?.bank_balance}
              </span>
            ) : (
              <span className="sm:text-[20px] text-red-600">0</span>
            )}
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
        <BankInChart />
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

      {isLoading === true || bankLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div className="rounded-lg shadow-md mt-2">
          {bankInData?.data?.length > 0 ? (
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className=" font-semibold text-center ">
                    <td className="whitespace-nowrap p-4 ">SL No</td>
                    <td className="whitespace-nowrap p-4 ">
                      Payment Reference ID
                    </td>
                    <td className="whitespace-nowrap p-4 ">Title</td>
                    <td className="whitespace-nowrap p-4 ">Time</td>

                    <td className="whitespace-nowrap p-4 ">Customer Name</td>
                    <td className="whitespace-nowrap p-4 ">Customer Phone</td>

                    <td className="whitespace-nowrap p-4 ">Created By</td>
                    <td className="whitespace-nowrap p-4 ">Payment Amount</td>
                  </tr>
                </thead>

                <tbody>
                  {bankInData?.data?.map((payment, i) => (
                    <tr
                      key={payment?._id}
                      className={`text-center ${
                        i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                      } hover:bg-blue-100`}
                    >
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {serialNumber + i + 1}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        <Link>
                          <span className="text-blue-600 underline"> {payment?.bank_in_ref_no}</span>
                        </Link>
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {payment?.bank_in_title}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {DateTimeFormat(payment?.createdAt)}
                      </td>

                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {payment?.customer_id?.customer_name}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {payment?.customer_id?.customer_phone}
                      </td>

                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {payment?.bank_in_publisher_id?.user_name}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-green-600">
                        {payment?.bank_in_amount}
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
      )}

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

export default BankIn;
