import { FiEdit } from "react-icons/fi";
import UpdateCustomers from "./UpdateCustomers";
import { useEffect, useState } from "react";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";

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

  const [supplierDocumentModal, setSupplierDocumentModal] = useState(null);

  const handleShowDocumentModal = (id) => {
    setSupplierDocumentModal((prevId) => (prevId === id ? null : id));
  };

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-container")) {
        setSupplierDocumentModal(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
                      {/* <td className="whitespace-nowrap p-4 ">Wallet Balance</td> */}
                      <td className="whitespace-nowrap p-4 ">
                        Customer Status
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
                        {/* <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {customer?.customer_wallet > 0 ? (
                            <span className="text-green-500">
                              {customer?.customer_wallet}
                            </span>
                          ) : (
                            <span className="text-red-500">
                              {customer?.customer_wallet}
                            </span>
                          )}
                        </td> */}
                        <td className="whitespace-nowrap py-1.5 ">
                          {customer?.customer_status === "active" ? (
                            <p className="text-green-600">
                              <span>Active</span>
                            </p>
                          ) : (
                            <p className="text-red-600">
                              <span>In-Active</span>
                            </p>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {customer?.customer_publisher_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {customer?.customer_updated_by?.user_name ? customer?.customer_updated_by?.user_name:'--'}
                        </td>

                        <td className="whitespace-nowrap py-1.5 px-2 text-gray-700">
                          <button
                            className="ml-[8px]"
                            onClick={() =>
                              handleShowDocumentModal(customer?._id)
                            }
                          >
                            <CiMenuKebab
                              size={30}
                              className="cursor-pointer text-gray-500 hover:text-gray-300 font-bold"
                            />
                          </button>
                          {supplierDocumentModal == customer?._id && (
                            <div className=" bg-bgray-200 shadow-xl w-[200px] flex flex-col gap-2 py-2 modal-container absolute right-14 z-30">
                              <button
                                className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium "
                                onClick={() =>
                                  handleCustomerUpdateModal(customer)
                                }
                              >
                                <FiEdit size={18} />
                                Edit
                              </button>
                              <Link to={`/customer-viewOrder/${customer?._id}`}>
                                {" "}
                                <button className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium">
                                  <FaEye size={18} />
                                  View Order List
                                </button>
                              </Link>
                              <Link
                                to={`/customer-paymentList/${customer?._id}`}
                              >
                                {" "}
                                <button className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium">
                                  <FaEye size={18} />
                                  Customer Payment List
                                </button>
                              </Link>
                            </div>
                          )}
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
          {/* Show customer Update Modal */}
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
