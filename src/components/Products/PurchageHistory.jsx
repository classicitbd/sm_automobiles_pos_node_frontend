import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../common/pagination/Pagination";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { SettingContext } from "@/context/SettingProvider";

const PurchageHistory = () => {
  const { product_id } = useParams();
  const [serialNumber, setSerialNumber] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  // const { user } = useContext(AuthContext);
  const { settingData, loading: settingLoading } = useContext(SettingContext);

  //Fetch Bank Data
  const {
    data: purchaseHistory = [],
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/stock_manage/${product_id}?page=${page}&limit=${limit}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/stock_manage/${product_id}?page=${page}&limit=${limit}`,
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

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  return (
    <>
      {/* search Supplier Payment History... */}

      {isLoading === true || settingLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <>
          <div className=" mt-4">
            <h3 className="text-xl sm:text-2xl">Purchase History</h3>
            <div className="flex items-center justify-between p-3  bg-white shadow mt-4 flex-wrap rounded-sm">
              <div className="font-bold">
                <p className="sm:text-[20px] text-bgray-700">
                  Product Name :{" "}
                  {purchaseHistory?.data?.productDetails?.product_name}
                </p>
                <p className="sm:text-[20px] text-bgray-700">
                  Product Id :{" "}
                  {purchaseHistory?.data?.productDetails?.product_id}
                </p>
              </div>
              <div className="text-[26px] font-bold text-gray-800">
                <p className="sm:text-[20px] text-bgray-700">
                  Product Quantity :{" "}
                  <span className="text-blue-600 sm:text-[20px] ">
                    {purchaseHistory?.data?.productDetails?.product_quantity}{" "}
                    {settingData?.unit_name}
                  </span>
                </p>
                <p className="sm:text-[20px] text-bgray-700">
                  Total Purchase :{" "}
                  <span className="text-blue-600 sm:text-[20px] ">
                    {purchaseHistory?.data?.productDetails?.total_purchase}{" "}
                    {settingData?.unit_name}
                  </span>
                </p>
                <p className="sm:text-[20px] text-bgray-700">
                  Product Total Sale :{" "}
                  <span className="text-green-600 sm:text-[20px] ">
                    {" "}
                    {purchaseHistory?.data?.productDetails?.total_sale}{" "}
                    {settingData?.unit_name}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg shadow-md mt-6">
            {purchaseHistory?.data?.stockDetails?.length > 0 ? (
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="font-semibold text-center">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Supplier Name</td>
                      <td className="whitespace-nowrap p-4 ">
                        Stock PubLisher Name
                      </td>
                      <td className="whitespace-nowrap p-4 ">
                        Stock PubLisher Phone
                      </td>

                      <td className="whitespace-nowrap p-4 ">Purchase Price</td>
                      <td className="whitespace-nowrap p-4 ">Selling Price</td>
                      <td className="whitespace-nowrap p-4 ">Quantity</td>
                    </tr>
                  </thead>

                  <tbody>
                    {purchaseHistory?.data?.stockDetails?.map(
                      (stockDetails, i) => (
                        <tr
                          key={stockDetails?._id}
                          className={`text-center  ${
                            i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                          } hover:bg-blue-100`}
                        >
                          <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                            {serialNumber + i + 1}
                          </td>
                          <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                            {stockDetails?.supplier_id?.supplier_name}
                          </td>
                          <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                            {stockDetails?.stock_publisher_id?.user_name}
                          </td>
                          <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                            {stockDetails?.stock_publisher_id?.user_phone}
                          </td>

                          <td className="whitespace-nowrap py-2.5 font-medium text-yellow-500">
                            {stockDetails?.product_buying_price}
                          </td>
                          <td className="whitespace-nowrap py-2.5 font-medium text-green-600">
                            {stockDetails?.product_selling_price}
                          </td>
                          <td className="whitespace-nowrap py-2.5 font-medium text-blue-600">
                            {stockDetails?.product_quantity}{" "}
                            {settingData?.unit_name}
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
            totalData={purchaseHistory?.totalData}
            page={page}
            limit={limit}
          />
        </>
      )}
    </>
  );
};

export default PurchageHistory;
