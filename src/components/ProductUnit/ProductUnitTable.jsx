import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import Updateproduct_unit from "./UpdateProductUnit";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";

const ProductUnitTable = ({
  product_unitNames,
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
}) => {
  const [product_unitUpdateModal, setproduct_unitUpdateModal] = useState(false);
  const [product_unitUpdateData, setproduct_unitUpdateData] = useState({});

  //handle Update Function..

  const handleproduct_unitUpdateModal = (showrrom) => {
    setproduct_unitUpdateData(showrrom);
    setproduct_unitUpdateModal(true);
  };

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
          <div className="rounded-lg border border-gray-200 mt-6">
            {product_unitNames?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">
                        Product Unit Name
                      </td>
                      <td className="whitespace-nowrap p-4 ">
                        Product Unit Status
                      </td>
                      <td className="whitespace-nowrap p-4 ">Create By</td>
                      <td className="whitespace-nowrap p-4 ">Updated By</td>

                      <td className="whitespace-nowrap p-4 ">Action</td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {product_unitNames?.data?.map((product_unit, i) => (
                      <tr
                        key={product_unit?._id}
                        className={`divide-x divide-gray-200 ${
                          i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                        }`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {product_unit?.product_unit_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 ">
                          {product_unit?.product_unit_status === "active" ? (
                            <p className="bg-bgBtnActive text-btnActiveColor px-[10px] py-[4px] rounded-[8px]">
                              <span>Active</span>
                            </p>
                          ) : (
                            <p className="bg-bgBtnInactive text-btnInactiveColor px-[10px] py-[4px] rounded-[8px]">
                              <span>In-Active</span>
                            </p>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {product_unit?.product_unit_publisher_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {product_unit?.product_unit_updated_by?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 px-2 text-gray-700">
                          <button
                            className="ml-3"
                            onClick={() =>
                              handleproduct_unitUpdateModal(product_unit)
                            }
                          >
                            <FiEdit
                              size={25}
                              className="cursor-pointer text-gray-500 hover:text-gray-300"
                            />
                          </button>
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
          <Pagination
            setPage={setPage}
            setLimit={setLimit}
            totalData={totalData}
            page={page}
            limit={limit}
          />

          {/* Show product_unit Update Modal */}
          {product_unitUpdateModal && (
            <Updateproduct_unit
              setproduct_unitUpdateModal={setproduct_unitUpdateModal}
              product_unitUpdateData={product_unitUpdateData}
              refetch={refetch}
              user={user}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ProductUnitTable;
