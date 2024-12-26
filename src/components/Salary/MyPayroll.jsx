import Pagination from "../common/pagination/Pagination";

const MyPayroll = () => {
  return (
    <div className="mt-3">
      <div className="rounded-lg shadow-md">
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="font-semibold text-center ">
                <td className="whitespace-nowrap p-4 ">SL No</td>
                <td className="whitespace-nowrap p-4 ">Month</td>
                <td className="whitespace-nowrap p-4 ">Employe Name</td>
                <td className="whitespace-nowrap p-4 ">Pay Grade</td>
                <td className="whitespace-nowrap p-4 ">Bassic Salary</td>
                <td className="whitespace-nowrap p-4 ">Gross Salary</td>
                <td className="whitespace-nowrap p-4 ">Status</td>
               
                <td className="whitespace-nowrap p-4 ">Action</td>
              </tr>
            </thead>

            <tbody>
              <tr className="text-center bg-secondary-10hover:bg-blue-100">
                <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                  2
                </td>
                <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                  December 24, 2024
                </td>
                <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                  Hasibul
                </td>
               
                <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                 High
                </td>
                <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                  $30894
                </td>
                <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                  $20345
                </td>
                <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                
                  <button className="px-4 py-1.5 bg-success-50 text-success-200 rounded-lg">
                    paid
                  </button>
                </td>
                <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                
                  <button className="px-4 py-1.5 bg-green-600 text-white rounded-lg">
                   Generate Payslip
                  </button>
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
  );
};

export default MyPayroll;
