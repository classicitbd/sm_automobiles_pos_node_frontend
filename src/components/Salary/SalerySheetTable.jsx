import { FiEdit } from "react-icons/fi";
import Pagination from "../common/pagination/Pagination";
import { useState } from "react";
import MakePaymentModal from "./MakePaymentModal";
import SalaryUpdateModal from "./SalaryUpdateModal";

const SalerySheetTable = () => {
  const [makepaymentModalOpen, setMakepaymentModalOpen] = useState(false);
  const [makepaymentModalData, setMakepaymentModalData] = useState({});
  const [salaryUpdateModalOpen, setSalaryUpdateModalOpen] = useState(false);
  const [salaryUpdateModaldata, setSalaryUpdateModaldata] = useState({});

  //make Payment Handale Function
  const handleMakePaymentModal = () => {
    setMakepaymentModalOpen(true);
    setMakepaymentModalData();
  };
  //Salary Update Handale Function
  const handleSalaryUpdateModal = () => {
    setSalaryUpdateModalOpen(true);
    setSalaryUpdateModaldata();
  };
  return (
    <>
      <div className="mt-3">
        <div className="rounded-lg shadow-md mt-6">
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="font-semibold text-center ">
                  <td className="whitespace-nowrap p-4 ">SL No</td>
                  <td className="whitespace-nowrap p-4 ">Month</td>
                  <td className="whitespace-nowrap p-4 ">Employe Name</td>
                  <td className="whitespace-nowrap p-4 ">Employe Num</td>
                  <td className="whitespace-nowrap p-4 ">Bassic Salary</td>
                  <td className="whitespace-nowrap p-4 ">Commission</td>
                  <td className="whitespace-nowrap p-4 ">Add/Deduct</td>
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
                    01798458462
                  </td>
                  <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                    $10
                  </td>
                  <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                    $30
                  </td>
                  <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                    $20
                  </td>
                  <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                    <button className="px-4 py-1.5 bg-error-50 text-error-200 rounded-lg">
                      Unpaid
                    </button>
                    <button className="px-4 py-1.5 bg-success-100 text-success-200 rounded-lg">
                      paid
                    </button>
                  </td>
                  <td className="whitespace-nowrap py-2 font-medium text-gray-700">
                    <div className="flex items-center">
                      {" "}
                      <button
                        className="ml-3"
                        onClick={() => handleSalaryUpdateModal()}
                      >
                        <FiEdit
                          size={25}
                          className="cursor-pointer text-gray-900 hover:text-gray-500"
                        />
                      </button>
                      <button
                        className="px-4 py-2 bg-purple text-white rounded-lg ml-3"
                        onClick={() => handleMakePaymentModal()}
                      >
                        Make Payment
                      </button>
                      <div>
                        {" "}
                        <button className="px-4 py-2 bg-success-400 text-white rounded-lg">
                          Generate Payslip
                        </button>
                      </div>
                    </div>
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
      {/* // make Payment Modal */}
      {makepaymentModalOpen && (
        <MakePaymentModal
          makepaymentModalData={makepaymentModalData}
          setMakepaymentModalOpen={setMakepaymentModalOpen}
        />
      )}

      {/* //Salarry Update Modal */}
      {salaryUpdateModalOpen && (
        <SalaryUpdateModal
          salaryUpdateModaldata={salaryUpdateModaldata}
          setSalaryUpdateModalOpen={setSalaryUpdateModalOpen}
        />
      )}
    </>
  );
};

export default SalerySheetTable;
