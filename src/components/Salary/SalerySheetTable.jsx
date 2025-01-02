import { FiEdit } from "react-icons/fi";
import Pagination from "../common/pagination/Pagination";
import { useContext, useEffect, useState } from "react";
import MakePaymentModal from "./MakePaymentModal";
import SalaryUpdateModal from "./SalaryUpdateModal";
import { AuthContext } from "@/context/AuthProvider";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import useDebounced from "@/hooks/useDebounced";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";

const SalerySheetTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user, loading: userLoading } = useContext(AuthContext);

  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  // handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value);
    setLimit(10);
    setPage(1);
  };

  //Fetch salary Data
  const {
    data: salaryDatas = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/salary/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/salary/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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

  const [makepaymentModalOpen, setMakepaymentModalOpen] = useState(false);
  const [makepaymentModalData, setMakepaymentModalData] = useState({});
  const [salaryUpdateModalOpen, setSalaryUpdateModalOpen] = useState(false);
  const [salaryUpdateModaldata, setSalaryUpdateModaldata] = useState({});

  //make Payment Handale Function
  const handleMakePaymentModal = (salaryData) => {
    setMakepaymentModalData(salaryData);
    setMakepaymentModalOpen(true);
  };
  //Salary Update Handale Function
  const handleSalaryUpdateModal = (salaryData) => {
    setSalaryUpdateModaldata(salaryData);
    setSalaryUpdateModalOpen(true);
  };

  if (userLoading) return <LoaderOverlay />;

  return (
    <>
      {/* search salery Payment... */}
      <div className="mt-8">
        <input
          type="text"
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="Search Salary..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>
      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <div className="mt-3">
          <div className="rounded-lg shadow-md mt-6">
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="font-semibold text-center ">
                    <td className="whitespace-nowrap p-4 ">SL No</td>
                    <td className="whitespace-nowrap p-4 ">Month</td>
                    <td className="whitespace-nowrap p-4 ">Employe Name</td>
                    <td className="whitespace-nowrap p-4 ">Phone</td>
                    <td className="whitespace-nowrap p-4 ">Bassic Salary</td>
                    <td className="whitespace-nowrap p-4 ">Commission</td>
                    <td className="whitespace-nowrap p-4 ">Add/Deduct</td>
                    <td className="whitespace-nowrap p-4 ">Total</td>
                    <td className="whitespace-nowrap p-4 ">Received</td>
                    <td className="whitespace-nowrap p-4 ">Due</td>
                    <td className="whitespace-nowrap p-4 ">Status</td>
                    <td className="whitespace-nowrap p-4 ">Action</td>
                  </tr>
                </thead>

                <tbody>
                  {salaryDatas?.data?.map((salaryData, i) => (
                    <tr
                      key={salaryData?._id}
                      className={`text-center ${
                        i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                      } hover:bg-blue-100`}
                    >
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {serialNumber + i + 1}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {salaryData?.salary_month || "--"}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {salaryData?.user_id?.user_name || "--"}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {salaryData?.user_id?.user_phone || "--"}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {salaryData?.basic_salary || "--"}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {salaryData?.commision_amount || "--"}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {salaryData?.add_or_deduct_amount || "--"}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {salaryData?.grand_total_amount || "--"}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {salaryData?.received_amount || "--"}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {salaryData?.due_amount || "--"}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {salaryData?.salary_status == "paid" ? (
                          <p className="px-4 py-1.5 bg-success-100 text-success-200 rounded-lg">
                            paid
                          </p>
                        ) : (
                          <p className="px-4 py-1.5 bg-error-50 text-error-200 rounded-lg">
                            Unpaid
                          </p>
                        )}
                      </td>
                      <td className="whitespace-nowrap py-2 font-medium text-gray-700 flex items-center justify-center gap-4">
                        {salaryData?.received_amount == 0 && (
                          <button
                            className="ml-3"
                            onClick={() => handleSalaryUpdateModal(salaryData)}
                          >
                            <FiEdit
                              size={25}
                              className="cursor-pointer text-gray-900 hover:text-gray-500"
                            />
                          </button>
                        )}
                        {salaryData?.salary_status == "unpaid" && (
                          <button
                            className="px-4 py-2 bg-purple text-white rounded-lg ml-3"
                            onClick={() => handleMakePaymentModal(salaryData)}
                          >
                            Make Payment
                          </button>
                        )}
                        <button className="px-4 py-2 bg-success-400 text-white rounded-lg">
                          Generate Payslip
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* pagination */}

          {salaryDatas?.totalData > 10 && (
            <Pagination
              setPage={setPage}
              setLimit={setLimit}
              totalData={salaryDatas?.totalData}
              page={page}
              limit={limit}
            />
          )}
        </div>
      )}
      {/* // make Payment Modal */}
      {makepaymentModalOpen && (
        <MakePaymentModal
          makepaymentModalData={makepaymentModalData}
          setMakepaymentModalOpen={setMakepaymentModalOpen}
          refetch={refetch}
          user={user}
        />
      )}

      {/* //Salarry Update Modal */}
      {salaryUpdateModalOpen && (
        <SalaryUpdateModal
          user={user}
          salaryUpdateModaldata={salaryUpdateModaldata}
          setSalaryUpdateModalOpen={setSalaryUpdateModalOpen}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default SalerySheetTable;
