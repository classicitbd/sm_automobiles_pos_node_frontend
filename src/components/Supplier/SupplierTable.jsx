// import { toast } from "react-toastify";

import { useEffect, useState } from "react";

import UpdateSupplier from "./UpdateSupplier";
import { FiEdit } from "react-icons/fi";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "../common/pagination/Pagination";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlinePayment } from "react-icons/md";
import CreateAPaymentModal from "./CreateAPaymentModal";
const SupplierTable = ({
  allSupplier,
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
}) => {
  const [updateModal, setUpdateModal] = useState(false); //update modal
  const [updateModalValue, setUpdateModalValue] = useState({}); //update modal data
  const [updatePaymentCreateModal, setUpdatePaymentCreateModal] =
    useState(false); //create payment modal
  const [updatePaymentCreateModalValue, setUpdatePaymentCreateModalValue] =
    useState({}); //create payment modal data
    // handle document modal open for edit view
  const [supplierDocumentModal, setSupplierDocumentModal] = useState(null);

  const handleShowDocumentModal = (id) => {
    setSupplierDocumentModal((prevId) => (prevId === id ? null : id));
  };

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-container")) {
        setSupplierDocumentModal(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // handle supplier data update modal
  const handleSupplierUpdateModal = (supplier) => {
    setUpdateModal(true);
    setUpdateModalValue(supplier);
  };

  // handle payment add modal
  const handleSupplierPaymentUpdateModal = (supplier) => {
    setUpdatePaymentCreateModal(true);
    setUpdatePaymentCreateModalValue(supplier);
  };

  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  return (
    <>
      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {/* Table for showing data */}

          <div className="mt-5 overflow-x-auto rounded">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border rounded">
              <thead className=" bg-[#fff9ee] ">
                <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                  <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                    SL
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                    Supplier Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                    Supplier Phone
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                    Account Balance
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                    Address
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                    Created By
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                    Updated By
                  </th>
                  <th className="px-4 py-2.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center ">
                {allSupplier?.data?.map((supplier, i) => (
                  <tr
                    key={supplier?._id}
                    className={`divide-x divide-gray-200 ${
                      i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                    }`}
                  >
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {serialNumber + i + 1}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {supplier?.supplier_name}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {supplier?.supplier_phone}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {supplier?.supplier_wallet_amount > 0 ? (
                        <span className="text-green-500">
                          {supplier?.supplier_wallet_amount}
                        </span>
                      ) : (
                        <span className="text-red-500">
                          {supplier?.supplier_wallet_amount}
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {supplier?.supplier_address}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {supplier?.supplier_publisher_id?.user_name}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {supplier?.supplier_updated_by?.user_name}
                    </td>
                    <td className="whitespace-nowrap py-1.5 px-2 text-gray-700">
                      <button
                        className="ml-[8px]"
                        onClick={() => handleShowDocumentModal(supplier?._id)}
                      >
                        <CiMenuKebab
                          size={30}
                          className="cursor-pointer text-gray-500 hover:text-gray-300 font-bold"
                        />
                      </button>
                      {supplierDocumentModal == supplier?._id && (
                        <div className=" bg-bgray-200 shadow-xl w-[200px] flex flex-col gap-2 py-2 modal-container absolute right-14 z-30">
                          <button
                            className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium "
                            onClick={() => handleSupplierUpdateModal(supplier)}
                          >
                            <FiEdit size={18} />
                            Edit
                          </button>
                          <button
                            className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium "
                            onClick={() =>
                              handleSupplierPaymentUpdateModal(supplier)
                            }
                          >
                            <MdOutlinePayment size={18} />
                            Payment
                          </button>
                          <Link to={`/supplier-paymentlist/${supplier?._id}`}>
                            {" "}
                            <button className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium">
                              <FaEye size={18} /> View Payment List
                            </button>
                          </Link>
                          <Link to={`/supplier-moneylist/${supplier?._id}`}>
                            {" "}
                            <button className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium">
                              <FaEye size={18} /> View Add Money List
                            </button>
                          </Link>
                          <Link
                            to={`/stock_manage/supplier_stock/${supplier?._id}`}
                          >
                            {" "}
                            <button className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium">
                              <FaEye size={18} /> View Stock Purchase
                            </button>
                          </Link>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            setPage={setPage}
            setLimit={setLimit}
            totalData={totalData}
            page={page}
            limit={limit}
          />

          {/* Update supplier data */}
          {updateModal && (
            <UpdateSupplier
              setUpdateModal={setUpdateModal}
              updateModalValue={updateModalValue}
              refetch={refetch}
              user={user}
            />
          )}
          {/* create payment */}
          {updatePaymentCreateModal && (
            <CreateAPaymentModal
              setUpdatePaymentCreateModal={setUpdatePaymentCreateModal}
              updatePaymentCreateModalValue={updatePaymentCreateModalValue}
              refetch={refetch}
              user={user}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SupplierTable;
