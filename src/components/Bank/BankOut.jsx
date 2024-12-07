const BankOut = () => {
  return (
    <>
      {/* {isLoading === true ? (
          <TableLoadingSkeleton />
        ) : ( */}
      <div>
        <div className="rounded-lg border border-gray-200 mt-6">
          {/* {.data?.length > 0 ? ( */}
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                  <td className="whitespace-nowrap p-4 ">SL No</td>
                  <td className="whitespace-nowrap p-4 ">Bank Name</td>
                  <td className="whitespace-nowrap p-4 ">Account Name</td>
                  <td className="whitespace-nowrap p-4 ">Account Number</td>
                  <td className="whitespace-nowrap p-4 ">Bank Balance</td>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-center">
                <tr
                  //key={}
                  className="divide-x divide-gray-200"
                >
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    1
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    Sonali
                  </td>
                  <td className="whitespace-nowrap py-1.5 "> Abdur rahaman</td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    {" "}
                    1258879541
                  </td>

                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    10 Lalks
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankOut;
