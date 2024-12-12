import { useParams } from "react-router-dom";

const StaffPerfomance = () => {
  const { user_id } = useParams();
  return (
    <div>
      <>
        {/* search Staff PerFomance History... */}
        <div className="flex items-center justify-between mt-4">
          <h3 className="text-[26px] font-medium text-gray-800 ">
            STAFF PERFOMANCE LIST
          </h3>
          <input
            type="text"
            //defaultValue={searchTerm}
            //onChange={(e) => handleSearchValue(e.target.value)}
            placeholder="Search Target..."
            className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>

        <>
          <div className="mt-4">
            <p className="text-[18px] font-medium">
              Staff Name :{" "}
              <span className="text-[18px] font-normal">Rahamat</span>
            </p>
            <p className="text-[18px] font-medium mt-1">
              Staff Phone No :{" "}
              <span className="text-[18px] font-normal">012478941</span>
            </p>
            <p className="text-[18px] font-medium mt-1">
              Staff Email :{" "}
              <span className="text-[18px] font-normal">
                raham123@gmail.com
              </span>
            </p>
            <p className="text-[18px] font-medium mt-1">
              Staff Address :{" "}
              <span className="text-[18px] font-normal">LalMatia ,Dhaka</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6">
            {/* OrderList */}
            <div>
              <div className="mt-5">
                <p className="text-[20px] font-medium text-center">
                  Order List
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 mt-2">
                <div className="overflow-x-auto rounded-t-lg">
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                      <tr className="divide-x  divide-gray-300  font-semibold text-center text-gray-900">
                        <td className="whitespace-nowrap p-4 ">SL No</td>
                        <td className="whitespace-nowrap p-4 ">In-Voice No</td>
                        <td className="whitespace-nowrap p-4 ">Order Date</td>
                        <td className="whitespace-nowrap p-4 ">Order Amount</td>
                        <td className="whitespace-nowrap p-4 ">Order Status</td>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-center">
                      <tr className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          2
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          *#125496
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          12-01-2024
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          2000
                        </td>

                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          Active
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sale Target */}
            <div className="col-span-1">
              <div className="mt-5">
                <p className="text-[20px] font-medium text-center">
                  Sale Target
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 mt-2">
                <div className="overflow-x-auto rounded-t-lg">
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                      <tr className="divide-x  divide-gray-300  font-semibold text-center text-gray-900">
                        <td className="whitespace-nowrap p-4 ">SL No</td>
                        <td className="whitespace-nowrap p-4 ">In-Voice No</td>
                        <td className="whitespace-nowrap p-4 ">Sale Date</td>
                        <td className="whitespace-nowrap p-4 ">Sale Amount</td>
                        <td className="whitespace-nowrap p-4 ">Sale Status</td>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-center">
                      <tr className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          1
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          *#hg564
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          11-10-2024
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          3000
                        </td>

                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          In-Active
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      </>
    </div>
  );
};

export default StaffPerfomance;
