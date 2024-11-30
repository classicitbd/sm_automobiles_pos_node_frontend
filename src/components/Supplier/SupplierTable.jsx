// import { toast } from "react-toastify";

import { useEffect, useState } from "react";

import UpdateSupplier from "./UpdateSupplier";
import { FiEdit } from "react-icons/fi";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "../common/pagination/Pagination";
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
  const [updateModal, setUpdateModal] = useState(false);
  const [updateModalValue, setUpdateModalValue] = useState(false);
  //   console.log(supplierData);
  const handleSupplierUpdateModal = (supplier) => {
    setUpdateModal(true);
    setUpdateModalValue(supplier);
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
                    Supplier Email
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                    Supplier Phone
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                    Address
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                    Status
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
                      {supplier?.supplier_email}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {supplier?.supplier_phone}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {supplier?.supplier_address}
                    </td>
                    <td className="whitespace-nowrap py-1.5 ">
                      {supplier?.supplier_status === "active" ? (
                        <p className="bg-bgBtnActive text-btnActiveColor px-[10px] py-[4px] rounded-[8px]">
                          <span>Active</span>
                        </p>
                      ) : (
                        <p className="bg-bgBtnInactive text-btnInactiveColor px-[10px] py-[4px] rounded-[8px]">
                          <span>In-Active</span>
                        </p>
                      )}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {supplier?.supplier_publisher_id?.user_name}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {supplier?.supplier_updated_by?.user_name}
                    </td>
                    <td className="whitespace-nowrap py-1.5 px-2 text-gray-700">
                      <button
                        className="ml-3"
                        onClick={() => handleSupplierUpdateModal(supplier)}
                      >
                        <FiEdit
                          size={25}
                          className="cursor-pointer text-gray-500 hover:text-gray-300"
                        />
                      </button>
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

          {/* Update Sub Category */}
          {updateModal && (
            <UpdateSupplier
              setUpdateModal={setUpdateModal}
              updateModalValue={updateModalValue}
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
