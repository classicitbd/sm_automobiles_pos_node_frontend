import TableLoadingSkeleton from "@/components/common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "@/components/common/pagination/Pagination";
import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Customers = () => {
  const [serialNumber, setSerialNumber] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  // handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value);
    setLimit(10);
    setPage(1);
  };

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  const customer_publisher_id = user?.customer_publisher_id
    ? user?.customer_publisher_id
    : user?._id;

  //Fetch Customer Data
  const {
    data: allCustomers = [],
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/customer/self_customer?customer_publisher_id=${customer_publisher_id}&page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/customer/self_customer?customer_publisher_id=${customer_publisher_id}&page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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

  const [supplierDocumentModal, setSupplierDocumentModal] = useState(null);

  const handleShowDocumentModal = (id) => {
    setSupplierDocumentModal((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl">Customers</h1>
        </div>

        <div className="mt-3">
          <input
            type="text"
            defaultValue={searchTerm}
            onChange={(e) => handleSearchValue(e.target.value)}
            placeholder="Search Customers..."
            className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
      </div>
      <>
        {isLoading === true ? (
          <TableLoadingSkeleton />
        ) : (
          <div>
            <div className="rounded-lg shadow-md mt-6">
              {allCustomers?.data?.length > 0 ? (
                <div className="overflow-x-auto rounded-lg">
                  <table className="min-w-full  text-sm">
                    <thead>
                      <tr className=" font-semibold text-center ">
                        <td className="whitespace-nowrap p-4 ">SL No</td>
                        <td className="whitespace-nowrap p-4 ">
                          Customer Name
                        </td>
                        <td className="whitespace-nowrap p-4 ">
                          Customer Phone
                        </td>
                        <td className="whitespace-nowrap p-4 ">
                          Customer Address
                        </td>

                        <td className="whitespace-nowrap p-4 ">
                          Customer Status
                        </td>
                        {/* <td className="whitespace-nowrap p-4 ">
                          Customer Wallet
                        </td> */}
                        <td className="whitespace-nowrap p-4 ">Action</td>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-center">
                      {allCustomers?.data?.map((customer, i) => (
                        <tr
                          key={customer?._id}
                          className={`text-center ${
                            i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                          } hover:bg-blue-100`}
                        >
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {serialNumber + i + 1}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {customer?.customer_name}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {customer?.customer_phone}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {customer?.customer_address}
                          </td>

                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {customer?.customer_status === "active" ? (
                              <span className="text-green-600">
                                {customer?.customer_status}
                              </span>
                            ) : (
                              <span className="text-red-600">
                                {customer?.customer_status}
                              </span>
                            )}
                          </td>
                          {/* <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {customer?.customer_wallet > 0 ? (
                              <span className="text-green-600">
                                {customer?.customer_wallet}
                              </span>
                            ) : (
                              <span className="text-red-600">
                                {customer?.customer_wallet}
                              </span>
                            )}
                          </td> */}
                          <td className="whitespace-nowrap py-1.5 px-2 text-gray-700">
                            <button
                              className="ml-[8px]"
                              onClick={() =>
                                handleShowDocumentModal(customer?._id)
                              }
                            >
                              <CiMenuKebab
                                size={30}
                                className="cursor-pointer text-primaryVariant-300 hover:text-primaryVariant-700 font-bold"
                              />
                            </button>
                            {supplierDocumentModal == customer?._id && (
                              <div className=" bg-success-50 shadow-xl w-[200px] flex flex-col gap-2 py-2 modal-container absolute right-14 z-30">
                                <Link
                                  to={`/customer-viewOrder/${customer?._id}`}
                                >
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
          </div>
        )}
        <Pagination
          setPage={setPage}
          setLimit={setLimit}
          totalData={allCustomers?.data?.length}
          page={page}
          limit={limit}
        />
      </>
    </>
  );
};

export default Customers;
