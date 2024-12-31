import { useEffect, useState } from "react";
import Pagination from "../common/pagination/Pagination";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { Link } from "react-router-dom";

const PurchaseListTable = ({
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
                  {purchaseLists?.data?.map((purchaseList, i) => (
                    <tr
                      key={purchaseList?._id}
                      className={`text-center ${i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
                    >
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-gray-700">
                        {serialNumber + i + 1}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-gray-700">
                        {purchaseList?.supplier_id?.supplier_name}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-gray-700">
                        {purchaseList?.supplier_id?.supplier_phone}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-gray-700">
                        {purchaseList?.stock_publisher_id?.user_name}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-gray-700">
                        {purchaseList?.product_id?.product_name}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-gray-700">
                        {purchaseList?.product_id?.product_id}
                      </td>

                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-gray-700">
                        <Link to="">
                          <span className="text-blue-600 underline ">
                            {purchaseList?.invoice_id}
                          </span>
                        </Link>
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-purple">
                        {purchaseList?.product_quantity}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-yellow-500">
                        {purchaseList?.product_buying_price}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-blue-700">
                        {purchaseList?.total_amount}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-green-600">
                        {purchaseList?.paid_amount}
                      </td>
                      <td className="whitespace-nowrap py-3 px-1.5 font-medium text-red-600">
                        {purchaseList?.due_amount}
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

export default PurchaseListTable;
