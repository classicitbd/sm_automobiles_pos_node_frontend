import { AuthContext } from "@/context/AuthProvider";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { DateTimeFormat } from "@/utils/dateTimeFormet";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";

const PriceHistory = () => {
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

  return (
    <>
      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <>
          <div className=" mt-4">
            <h3 className="text-[26px] font-bold text-gray-800 capitalize">
              Product Price Update History List
            </h3>
            <div className="flex items-center justify-between my-5 mx-28">
              <div className="text-[26px] font-bold text-gray-800">
                <p>
                  Product Name:{" "}
                  {productPriceHistory?.data?.productDetails?.product_name}
                </p>
                <p>
                  Product Id:{" "}
                  {productPriceHistory?.data?.productDetails?.product_id}
                </p>
              </div>
              <div className="text-[26px] font-bold text-gray-800">
                <p>
                  Product Price:{" "}
                  {productPriceHistory?.data?.productDetails?.product_price}
                </p>
                <p>
                  Product Quantity:{" "}
                  {productPriceHistory?.data?.productDetails?.product_quantity}{" "}
                  {
                    productPriceHistory?.data?.productDetails?.product_unit_id
                      ?.product_unit_name
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 mt-6">
            {productPriceHistory?.data?.findProductPriceHistory?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x  divide-gray-300  font-semibold text-center text-gray-900">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Time</td>
                      <td className="whitespace-nowrap p-4 ">Previous Price</td>
                      <td className="whitespace-nowrap p-4 ">Updated Price</td>
                      <td className="whitespace-nowrap p-4 ">Quantity</td>
                      <td className="whitespace-nowrap p-4 ">Created By</td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {productPriceHistory?.data?.findProductPriceHistory?.map(
                      (payment, i) => (
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
                            {payment?.product_previous_price}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {payment?.product_updated_price}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {payment?.product_quantity}{" "}
                            {
                              productPriceHistory?.data?.productDetails
                                ?.product_unit_id?.product_unit_name
                            }
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {payment?.price_update_publisher_id?.user_name}
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
            <Pagination
              setPage={setPage}
              setLimit={setLimit}
              totalData={productPriceHistory?.totalData}
              page={page}
              limit={limit}
            />
          </div>
        </>
      )}
    </>
  );
};

export default PriceHistory;
