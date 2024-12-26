import { useState } from "react";

import Pagination from "../common/pagination/Pagination";
const PaymentHistory = () => {
  const [month, setMonth] = useState("");

  //get the month input value
  const handleInputChange = (e) => {
    setMonth(e.target.value);
  };

  //submit Month Function
  const handleButtonClick = () => {
    console.log("Selected Month:", month);
  };
  return (
    <div className="py-6 px-4 ">
      <div className="mt-6 max-w-6xl mx-auto">
        <div className="sm:flex sm:items-center sm:gap-4">
          <div className="w-1/2">
            <label
              htmlFor="month"
              className="block font-medium text-gray-700 mb-2 mt-2 sm:mt-0"
            >
              Month Payment History
            </label>

            <input
              id="month"
              type="month"
              max={`${new Date().getFullYear()}-${String(
                new Date().getMonth()
              ).padStart(2, "0")}`}
              placeholder="Supplier Payment Month"
              className="w-full px-2 rounded-md border-gray-200 shadow-sm sm:text-sm py-2 border-2"
              value={month}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-end mt-3 sm:mt-8">
            <button
              onClick={handleButtonClick}
              className="px-10 py-2 flex items-center justify-center bg-primary text-white rounded text-[16px]"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="mt-10">
          <div className="rounded-lg shadow-md mt-6">
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="font-semibold text-center ">
                    <td className="whitespace-nowrap p-4 ">SL No</td>

                    <td className="whitespace-nowrap p-4 ">Employe Name</td>

                    <td className="whitespace-nowrap p-4 ">Pay Grade</td>
                    <td className="whitespace-nowrap p-4 ">Net Salary</td>
                    <td className="whitespace-nowrap p-4 ">To be Paid</td>
                  </tr>
                </thead>

                <tbody>
                  <tr className="text-center bg-secondary-10hover:bg-blue-100">
                    <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                      2
                    </td>

                    <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                      Hasibul
                    </td>

                    <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                      15 Days (Monthly)
                    </td>
                    <td className="whitespace-nowrap py-2 font-medium text-blue-600">
                      7,689
                    </td>
                    <td className="whitespace-nowrap py-2 font-medium text-green-600">
                      5,689
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* pagination */}

          <Pagination
          // setPage={setPage}
          // setLimit={setLimit}
          // totalData={totalData}
          // page={page}
          // limit={limit}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
