//import { AuthContext } from "@/context/AuthProvider";

import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../common/pagination/Pagination";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import StockPurchaseChart from "./StockPurchaseChart";

const StockPurchase = () => {
  const { supplier_id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  // const { user } = useContext(AuthContext);

  //Fetch Bank Data
  const {
    data: supplierStockPurchase = [],
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/stock_manage/supplier_stock/${supplier_id}?page=${page}&limit=${limit}&role_type=supplier_payment_history_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/stock_manage/supplier_stock/${supplier_id}?page=${page}&limit=${limit}&role_type=supplier_payment_history_show`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          const errorData = await res.text();
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          );
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
  });

  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  return (
    <>
      {/* search Supplier Payment History... */}

      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <>



          <div className="mt-4">
            <h3 className="sm:text-[26px] sm:font-medium text-gray-800 uppercase">
              Supplier Stock Purchase
            </h3>
          </div>
          <div className="flex items-center justify-between p-5  bg-gray-50 shadow-md mt-4 flex-wrap">
            <div className="font-bold">
              <p className="sm:text-[20px] text-bgray-700">  Supplier Name :{" "}
                {supplierStockPurchase?.data?.supplierDetails?.supplier_name}</p>
              <p className="sm:text-[20px] text-bgray-700">
                Supplier Phone : {" "}
                {supplierStockPurchase?.data?.supplierDetails?.supplier_phone}
              </p>
            </div>
            <div className="font-bold text-bgray-700">
              <p className="sm:text-[20px] text-bgray-700">
                Supplier Address : {" "}
                {
                  supplierStockPurchase?.data?.supplierDetails
                    ?.supplier_address
                }
              </p>
              <p className="sm:text-[20px] text-bgray-700">
                Supplier Wallet Ammount : {supplierStockPurchase?.data?.supplierDetails
                  ?.supplier_wallet_amount ? <span className="sm:text-[20px] text-green-600">{supplierStockPurchase?.data?.supplierDetails
                    ?.supplier_wallet_amount}</span> : <span className="sm:text-[20px] text-red-600">0</span>}
              </p>
            </div>
            </div>
            
            <div className="bg-gray-50  p-5 shadow-md mt-8">

              <StockPurchaseChart />
            </div> 

            <div className="bg-white rounded py-6 px-4 shadow mt-8">
              <div className="rounded-lg border border-gray-200 mt-6">
            {supplierStockPurchase?.data?.stockDetails?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x  divide-gray-300  font-semibold text-center text-gray-900">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Product Name</td>
                      <td className="whitespace-nowrap p-4 ">Product ID</td>
                      <td className="whitespace-nowrap p-4 ">Purchase Price</td>
                      <td className="whitespace-nowrap p-4 ">Quantity</td>

                      <td className="whitespace-nowrap p-4 ">Created By</td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {supplierStockPurchase?.data?.stockDetails?.map(
                      (stockDetails, i) => (
                        <tr
                          key={stockDetails?._id}
                          className={`divide-x divide-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                            }`}
                        >
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {serialNumber + i + 1}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {stockDetails?.product_id?.product_name}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {stockDetails?.product_id?.product_id}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                            {stockDetails?.product_buying_price}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-blue-600">
                            {stockDetails?.product_quantity}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {stockDetails?.stock_publisher_id?.user_name}
                          </td>
                        </tr>
                      )
                    )}
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
              totalData={supplierStockPurchase?.totalData}
              page={page}
              limit={limit}
            />
          </div>


        </>
      )}
    </>
  );
};

export default StockPurchase;
