const DueList = () => {
  return (
    <>
      <div className=" mt-4">
        <h3 className="text-[26px] font-bold text-gray-800 capitalize">
          Due List
        </h3>
      </div>
      <div className="rounded-lg border border-gray-200 mt-6">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
              <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                <td className="whitespace-nowrap p-4 ">SL No</td>
                <td className="whitespace-nowrap p-4 ">Due Name</td>
                <td className="whitespace-nowrap p-4 ">Due Amount</td>
                <td className="whitespace-nowrap p-4 ">Account No</td>
                <td className="whitespace-nowrap p-4 ">Reserve amount</td>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-center">
              <tr className="divide-x divide-gray-200">
                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                  1
                </td>
                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                  For X order
                </td>
                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                  2345
                </td>
                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                  588469
                </td>
                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                  10000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DueList;
