// import { toast } from "react-toastify";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";
import UpdateStaff from "./UpdateStaff";
import Pagination from "./../common/pagination/Pagination";
import TableLoadingSkeleton from "./../common/loadingSkeleton/TableLoadingSkeleton";

const AllStaffTable = ({
  refetch,
  staffData,
  roleData,
  isLoading,
  user,
  isLoadingStaff,
  limit,
  page,
  setPage,
  setLimit,
  totalData,
}) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [updateModalValue, setUpdateModalValue] = useState(false);
  //   console.log(staffData);
  const updateStaffModal = (item) => {
    setUpdateModal(true);
    setUpdateModalValue(item);
  };

  // get token
  // const token = getCookie(authKey);

  return (
    <>
      {isLoadingStaff ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {/* Table for showing data */}
          {staffData?.length > 0 ? (
            <div className="mt-5 overflow-x-auto rounded">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border rounded">
                {" "}
                <thead className=" bg-[#fff9ee] ">
                  <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                    <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                      User Name
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                      User Phone
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                      User Salary
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                      User Address
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                      User Role
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
                  {staffData?.map((user, i) => (
                    <tr
                      key={user?._id}
                      className={`divide-x divide-gray-200 ${
                        i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                      }`}
                    >
                      <td className="whitespace-nowrap px-4 py-2 font-semibold">
                        {user?.user_name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                        {user?.user_phone ? user?.user_phone : "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                        {user?.user_salary ? user?.user_salary : "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                        {user?.user_phone ? user?.user_address : "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                        {user?.user_role_id?.role_name
                          ? user?.user_role_id?.role_name
                          : "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                        {user?.user_status}
                      </td>
                      <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                        {user?.user_publisher_id?.user_name}
                      </td>
                      <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                        {user?.user_updated_by?.user_name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                        <FiEdit
                          onClick={() => updateStaffModal(user)}
                          className="cursor-pointer text-gray-500 hover:text-gray-300"
                          size={25}
                        />
                      </td>
                      {/* <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                    {user?.user_role_id?.staff_delete ||
                    user?.user_role_id?.staff_update ? (
                      <>
                        {user?.user_role_id?.staff_delete && (
                          <MdDeleteForever
                            onClick={() => handleDelete(item)}
                            className="cursor-pointer text-red-500 hover:text-red-300"
                            size={25}
                          />
                        )}
                        {user?.user_role_id?.staff_update && (
                          <FiEdit
                            onClick={() => updateStaffModal(item)}
                            className="cursor-pointer text-gray-500 hover:text-gray-300"
                            size={25}
                          />
                        )}
                      </>
                    ) : (
                      <small>Access Denied</small>
                    )}
                  </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <NoDataFound />
          )}
          {totalData > 10 && (
            <Pagination
              limit={limit}
              page={page}
              setPage={setPage}
              setLimit={setLimit}
              totalData={totalData}
            />
          )}

          {/* Update Sub Category */}
          {updateModal && (
            <UpdateStaff
              setUpdateModal={setUpdateModal}
              updateModalValue={updateModalValue}
              refetch={refetch}
              roleData={roleData}
              isLoading={isLoading}
              user={user}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AllStaffTable;
