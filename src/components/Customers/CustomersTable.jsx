import { FiEdit } from "react-icons/fi";
import UpdateCustomers from "./UpdateCustomers";
import { useEffect, useState } from "react";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const CustomersTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  customers,
}) => {
  //Update Handle contoler
  const [customerUpdateModal, setCustomerUpdateModal] = useState(false);
  const [customerUpdateData, setCustomerUpdateData] = useState({});

  const handleCustomerUpdateModal = (customer) => {
    setCustomerUpdateData(customer);
    setCustomerUpdateModal(true);
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
            {customers?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Customers Name</td>
                      <td className="whitespace-nowrap p-4 ">
                        Customer Address
                      </td>
                      <td className="whitespace-nowrap p-4 ">Customer Phone</td>
                      <td className="whitespace-nowrap p-4 ">
                        Previous Advance
                      </td>
                      <td className="whitespace-nowrap p-4 ">Previous Due</td>
                      <td className="whitespace-nowrap p-4 ">
                        Customer Status
                      </td>
                      <td className="whitespace-nowrap p-4 ">
                        First Payment Status
                      </td>
                      <td className="whitespace-nowrap p-4 ">Created By</td>
                      <td className="whitespace-nowrap p-4 ">Updated By</td>

                      <td className="whitespace-nowrap p-4 ">Action</td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {customers?.data?.map((customer, i) => (
                      <tr
                        key={customer?._id}
                        className={`divide-x divide-gray-200 ${
                          i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                        }`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {customer?.customer_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {customer?.customer_address}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {customer?.customer_phone}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {customer?.previous_advance}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {customer?.previous_due}
                        </td>
                        <td className="whitespace-nowrap py-1.5 ">
                          {customer?.customer_status === "active" ? (
                            <p className="bg-bgBtnActive text-btnActiveColor px-[10px] py-[4px] rounded-[8px]">
                              <span>Active</span>
                            </p>
                          ) : (
                            <p className="bg-bgBtnInactive text-btnInactiveColor px-[10px] py-[4px] rounded-[8px]">
                              <span>In-Active</span>
                            </p>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-1.5 ">
                          {customer?.first_payment_status === "active" ? (
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
                          {customer?.customer_publisher_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {customer?.customer_updated_by?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 px-2 text-gray-700 flex items-center">
                          <button
                            className=""
                            onClick={() => handleCustomerUpdateModal(customer)}
                          >
                            <FiEdit
                              size={25}
                              className="cursor-pointer text-gray-500 hover:text-gray-300"
                            />
                          </button>
                          <Link to="/allPaymentDueOrderList">
                            <button className="ml-3">
                              <FaEye
                                className="cursor-pointer text-gray-500 hover:text-gray-300"
                                size={25}
                              />
                            </button>
                          </Link>
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
          {/* Show Bank Update Modal */}
          {customerUpdateModal && (
            <UpdateCustomers
              setCustomerUpdateModal={setCustomerUpdateModal}
              customerUpdateData={customerUpdateData}
              refetch={refetch}
              user={user}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CustomersTable;
