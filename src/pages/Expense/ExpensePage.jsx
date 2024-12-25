import { LoaderOverlay } from "@/components/common/loader/LoderOverley";
import AddExpenses from "@/components/Expenses/AddExpenses";
import ExpensesTable from "@/components/Expenses/ExpensesTable";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

const ExpensePage = () => {
  const [expenceCreateModal, setExpenceCreateModal] = useState(false);
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

  //Fetch expense Data
  const {
    data: expenses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/expense?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/expense?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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
  if (userLoading) return <LoaderOverlay />;
  return (
    <>
      {user?.user_role_id?.expense_show == true && (
        <div className="rounded py-6 px-4">
          <div className="flex justify-between mt-6">
            <div>
              <h1 className="text-2xl">Expense</h1>
            </div>

            <div>
              {user?.user_role_id?.expense_post == true && (
                <Button
                  type="button"
                  onClick={() => setExpenceCreateModal(true)}
                >
                  Create Expense
                </Button>
              )}
            </div>
          </div>
          {/* search Expenses... */}
          <div className="mt-3 flex justify-start">
            <input
              type="text"
              defaultValue={searchTerm}
              onChange={(e) => handleSearchValue(e.target.value)}
              placeholder="Search Customers..."
              className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          {/*Expenses Data Show and update and delete operation file */}
          <ExpensesTable
            expenses={expenses}
            setPage={setPage}
            setLimit={setLimit}
            page={page}
            limit={limit}
            totalData={expenses?.totalData}
            refetch={refetch}
            user={user}
            isLoading={isLoading}
          />

          {/*Bank Account Create  modal */}
          {expenceCreateModal && (
            <AddExpenses
              setExpenceCreateModal={setExpenceCreateModal}
              refetch={refetch}
              user={user}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ExpensePage;
