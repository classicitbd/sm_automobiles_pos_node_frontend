
import { useEffect, useState } from "react";
import Pagination from "../common/pagination/Pagination";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { Link } from "react-router-dom";
import { DateTimeFormat } from "@/utils/dateTimeFormet";

const APListTable = ({
  purchaseLists,
  isLoading,
  totalData,
  setPage,
  setLimit,
  page,
  limit,
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
        <div className="rounded-lg shadow-md mt-3">
          {purchaseLists?.data?.length > 0 ? (
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="font-semibold text-center">
                    <th className="whitespace-nowrap px-4 py-2.5    ">SL</th>
                    <td className="whitespace-nowrap p-4 ">Date</td>
                    <th className="whitespace-nowrap px-4 py-2.5    ">
                      Supplier Name
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5    ">
                      Supplier Phone
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5    ">
                      Created By
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5    ">
                      Product Name
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5    ">
                      Product Id
                    </th>

                    <th className="whitespace-nowrap px-4 py-2.5    ">
                      Invoice Id
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5    ">
                      Purchase Quantity
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5    ">
                      Purchase Amount
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5    ">
                      Total Amount
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5    ">
                      Paid Amount
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5    ">
                      Due Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseLists?.data?.map((purchaselist, i) => (
                    <tr
                      key={purchaselist?._id}
                      className={`text-center ${
                        i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                      } hover:bg-blue-100`}
                    >
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-gray-700">
                        {serialNumber + i + 1}
                      </td>
                      <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {DateTimeFormat(purchaselist?.createdAt)}
                        </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-gray-700">
                        {purchaselist?.supplier_id?.supplier_name}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-gray-700">
                        {purchaselist?.supplier_id?.supplier_phone}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-gray-700">
                        {purchaselist?.stock_publisher_id?.user_name}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-gray-700">
                        {purchaselist?.product_id?.product_name}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-gray-700">
                        {purchaselist?.product_id?.product_id}
                      </td>

                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-gray-700">
                            {purchaselist?.invoice_id}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-purple">
                        {purchaselist?.product_quantity}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-yellow-500">
                        {purchaselist?.product_buying_price}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-blue-700">
                        {purchaselist?.total_amount}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-green-600">
                        {purchaselist?.paid_amount}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-red-600">
                        {purchaselist?.due_amount}
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

export default APListTable;
