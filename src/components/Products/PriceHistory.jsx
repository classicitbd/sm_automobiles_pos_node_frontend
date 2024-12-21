import { AuthContext } from "@/context/AuthProvider";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { DateTimeFormat } from "@/utils/dateTimeFormet";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import { SettingContext } from "@/context/SettingProvider";

const PriceHistory = () => {
  const { settingData, loading: settingLoading } = useContext(SettingContext);
  const { product_id } = useParams();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { user } = useContext(AuthContext);

  //Fetch Bank Data
  const {
    data: productPriceHistory = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/product_price_update_history?product_id=${product_id}&page=${page}&limit=${limit}&role_type=product_price_update_history_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/product_price_update_history?product_id=${product_id}&page=${page}&limit=${limit}&role_type=product_price_update_history_show`,
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

  if (settingLoading) {
    return <TableLoadingSkeleton />;
  }

  return (
    <>
      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <>
          <div className="mt-4">
            <h3 className="text-xl sm:text-2xl">
              Product Price Update History List
            </h3>

            <div className="flex items-center justify-between p-3  bg-white shadow mt-4 flex-wrap rounded-sm">
              <div className="font-bold">
                <p className="sm:text-[20px] text-bgray-700">
                  {" "}
                  Product Name :{" "}
                  {productPriceHistory?.data?.productDetails?.product_name}
                </p>
                <p className="sm:text-[20px] text-bgray-700">
                  Product Id :{" "}
                  {productPriceHistory?.data?.productDetails?.product_id}
                </p>
              </div>
              <div className="font-bold text-bgray-700">
                <p className="sm:text-[20px] text-bgray-700">
                  Product Price :{" "}
                  <span className="text-green-600 sm:text-[20px]">
                    {productPriceHistory?.data?.productDetails?.product_price}
                  </span>
                </p>
                <p className="sm:text-[20px] text-bgray-700">
                  Product Quantity :{" "}
                  <span className="text-blue-600 sm:text-[20px]">
                    {" "}
                    {
                      productPriceHistory?.data?.productDetails
                        ?.product_quantity
                    }{" "}
                    {settingData?.unit_name}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="rounded mt-6 shadow-md bg-gray-50">
            {productPriceHistory?.data?.findProductPriceHistory?.length > 0 ? (
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full  bg-white text-sm">
                  <thead>
                    <tr className="font-bold text-center  divide-gray-950">
                      <td className="whitespace-nowrap p-3 ">SL No</td>
                      <td className="whitespace-nowrap p-3 ">Created By</td>
                      <td className="whitespace-nowrap p-3 ">Time</td>
                      <td className="whitespace-nowrap p-3 ">Previous Price</td>
                      <td className="whitespace-nowrap p-3 ">Updated Price</td>
                      <td className="whitespace-nowrap p-3 ">Quantity</td>
                    </tr>
                  </thead>

                  <tbody>
                    {productPriceHistory?.data?.findProductPriceHistory?.map(
                      (payment, i) => (
                        <tr
                          key={payment?._id}
                          className={`text-center ${
                            i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                          } hover:bg-blue-100`}
                        >
                          <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                            {serialNumber + i + 1}
                          </td>
                          <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                            {payment?.price_update_publisher_id?.user_name}
                          </td>
                          <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                            {DateTimeFormat(payment?.createdAt)}
                          </td>
                          <td className="whitespace-nowrap py-2 font-medium text-yellow-500">
                            {payment?.product_previous_price}
                          </td>
                          <td className="whitespace-nowrap py-2 font-medium text-green-500">
                            {payment?.product_updated_price}
                          </td>
                          <td className="whitespace-nowrap py-2 font-medium text-blue-600">
                            {payment?.product_quantity} {settingData?.unit_name}
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
            totalData={productPriceHistory?.totalData}
            page={page}
            limit={limit}
          />
        </>
      )}
    </>
  );
};

export default PriceHistory;
