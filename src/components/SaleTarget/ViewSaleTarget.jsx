const ViewSaleTarget = () => {
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
                  <td className="whitespace-nowrap p-4 ">User Name</td>
                  <td className="whitespace-nowrap p-4 ">User Phone</td>
                  <td className="whitespace-nowrap p-4 ">Start Date</td>
                  <td className="whitespace-nowrap p-4 ">End Date</td>
                  <td className="whitespace-nowrap p-4 ">Total Target</td>
                  <td className="whitespace-nowrap p-4 ">Get Amount</td>
                  <td className="whitespace-nowrap p-4 ">Status</td>
                  <td className="whitespace-nowrap p-4 ">Create By</td>
                  <td className="whitespace-nowrap p-4 ">Updated By</td>
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
                    Ahamed
                  </td>
                  <td className="whitespace-nowrap py-1.5 ">015846896</td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    12-4-24
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    12-5-24
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    10 L
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    100
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    Pending
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    rahat
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    rahat
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

export default ViewSaleTarget;
