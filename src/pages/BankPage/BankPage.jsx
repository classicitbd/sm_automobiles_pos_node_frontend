import AddBankInfo from "@/components/Bank/AddBankInfo";
import AddCashBalance from "@/components/Bank/AddCashBalance";
import BankInfoTable from "@/components/Bank/BankInfoTable";
import UpdateCashModal from "@/components/Bank/UpdateCashModal";
import { LoaderOverlay } from "@/components/common/loader/LoderOverley";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import useGetCashDetails from "@/hooks/useGetCashDetails";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AiTwotoneBank } from "react-icons/ai";
import { CiBank, CiMenuKebab } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

const BankPage = () => {
  const [bankAccountCreateModal, setBankAccountCreateModal] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user, loading: userLoading } = useContext(AuthContext);

  const [cashCreateModal, setCashCreateModal] = useState(false);
  const [cashUpdateModal, setCashUpdateModal] = useState(false);
  const [cashUpdateModalValue, setCashUpdateModalValue] = useState(false);
  const [cashDropdownModal, setCashDropdownModal] = useState(false);

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

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-container")) {
        setCashDropdownModal(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  //Fetch Bank Data
  const {
    data: banks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/bank/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/bank/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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

  //get cash data
  const {
    data: cashTypes,
    isLoading: cashLoading,
    refetch: cashRefetch,
  } = useGetCashDetails();

  if (cashLoading || userLoading) return <LoaderOverlay />;

  return (
    <>
      {" "}
      {user?.user_role_id?.bank_dashboard_show == true && (
        <div className="py-6 px-4">
          {/* cash in hand and out hand */}
          <div className="mt-10">
            <div>
              <h1 className="text-2xl text-center mb-2">Cash Account Table</h1>
              {!cashTypes?.data ? (
                <div className="flex items-center justify-center">
                  <Button
                    type="button"
                    onClick={() => setCashCreateModal(true)}
                    className="mt-3"
                  >
                    Create Cash Balance
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg shadow-md">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className=" font-semibold text-center ">
                        <td className="whitespace-nowrap p-4 ">SL No</td>
                        <td className="whitespace-nowrap p-4 ">Cash Balance</td>
                        <td className="whitespace-nowrap p-4 ">Created By</td>
                        <td className="whitespace-nowrap p-4 ">Updated By</td>
                        <td className="whitespace-nowrap p-4 ">Action</td>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        className="text-center 
                     bg-secondary-100
                   hover:bg-blue-100"
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {cashTypes?.data?.cash_balance > 0 ? (
                            <span className="text-green-500">
                              {cashTypes?.data?.cash_balance}
                            </span>
                          ) : (
                            <span className="text-red-500">
                              {cashTypes?.data?.cash_balance}
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {cashTypes?.data?.cash_publisher_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {cashTypes?.data?.cash_updated_by?.user_name
                            ? cashTypes?.data?.cash_updated_by?.user_name
                            : "--"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 px-2 text-gray-700">
                          <button
                            className="ml-[8px]"
                            onClick={() =>
                              setCashDropdownModal(!cashDropdownModal)
                            }
                          >
                            <CiMenuKebab
                              size={30}
                              className="cursor-pointer text-primaryVariant-300 hover:text-primaryVariant-700 font-bold"
                            />
                          </button>
                          {cashDropdownModal && (
                            <div className=" bg-success-50 shadow-xl w-[150px] flex flex-col gap-2 py-2 modal-container absolute right-14 z-30">
                              {user?.user_role_id?.cash_patch == true && (
                                <button
                                  className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium "
                                  onClick={() => {
                                    setCashUpdateModalValue(cashTypes?.data);
                                    setCashUpdateModal(true);
                                  }}
                                >
                                  <FiEdit size={18} />
                                  Edit
                                </button>
                              )}

                              <Link to={`/cash-balance-history`}>
                                {" "}
                                <button className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium ">
                                  <CiBank size={18} />
                                  Update History
                                </button>
                              </Link>
                              <Link to={`/cash-in`}>
                                {" "}
                                <button className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium ">
                                  <CiBank size={18} />
                                  View Cash in
                                </button>
                              </Link>
                              <Link to={`/cash-out`}>
                                {" "}
                                <button className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium ">
                                  <AiTwotoneBank size={18} /> View Cash Out
                                </button>
                              </Link>
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <hr className="my-12" />

          {/* search Bank Account... */}
          <div className="flex justify-between mt-6">
            <div>
              <h1 className="text-2xl">Bank Account</h1>
            </div>

            <div>
              {user?.user_role_id?.bank_post == true && (
                <Button
                  type="button"
                  onClick={() => setBankAccountCreateModal(true)}
                >
                  Create Bank Account
                </Button>
              )}
            </div>
          </div>
          <div className="mt-3">
            <input
              type="text"
              defaultValue={searchTerm}
              onChange={(e) => handleSearchValue(e.target.value)}
              placeholder="Search Category..."
              className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          {/* Bank Account Data Show and update and delete operation file */}

          <BankInfoTable
            banks={banks}
            setPage={setPage}
            setLimit={setLimit}
            page={page}
            limit={limit}
            totalData={banks?.totalData}
            refetch={refetch}
            user={user}
            isLoading={isLoading}
          />

          {/*Bank Account Create  modal */}
          {bankAccountCreateModal && (
            <AddBankInfo
              setBankAccountCreateModal={setBankAccountCreateModal}
              refetch={refetch}
              user={user}
            />
          )}

          {/* create cash balance modal */}
          {cashCreateModal && (
            <AddCashBalance
              setCashCreateModal={setCashCreateModal}
              cashRefetch={cashRefetch}
              user={user}
            />
          )}

          {/* cash update modal */}
          {cashUpdateModal && (
            <UpdateCashModal
              setCashUpdateModal={setCashUpdateModal}
              cashUpdateModalValue={cashUpdateModalValue}
              refetch={cashRefetch}
              user={user}
            />
          )}
        </div>
      )}
    </>
  );
};

export default BankPage;
