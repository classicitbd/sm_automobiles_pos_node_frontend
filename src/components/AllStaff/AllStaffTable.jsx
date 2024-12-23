// import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";
import UpdateStaff from "./UpdateStaff";
import Pagination from "./../common/pagination/Pagination";
import TableLoadingSkeleton from "./../common/loadingSkeleton/TableLoadingSkeleton";
import { Link } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { FaUserCheck } from "react-icons/fa";

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

  // handle document modal open for edit view
  const [bankDocumentModal, setBankDocumentModal] = useState(null);

  const handleShowDocumentModal = (id) => {
    setBankDocumentModal((prevId) => (prevId === id ? null : id));
  };

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-container")) {
        setBankDocumentModal(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // get token
  // const token = getCookie(authKey);

  return (
    <>
      {isLoadingStaff ? (
        <TableLoadingSkeleton />
      ) : (
        <div className="rounded-lg shadow-md mt-5">
          {/* Table for showing data */}
          {staffData?.length > 0 ? (
            <div className=" overflow-x-auto rounded">
              <table className="min-w-full  text-sm">
                {" "}
                <thead>
                  <tr className="font-semibold text-center ">
                    <th className="whitespace-nowrap px-4 py-2.5 ">
                      Joining Date
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5 ">
                      Staff Name
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5 ">
                      Staff Phone
                    </th>

                    <th className="whitespace-nowrap px-4 py-2.5 ">
                      Staff Address
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5 ">
                      Staff Role
                    </th>

                    <th className="whitespace-nowrap px-4 py-2.5 ">
                      Created By
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5 ">
                      Updated By
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5 ">Status</th>
                    <th className="whitespace-nowrap px-4 py-2.5 ">
                      Staff Salary
                    </th>
                    <th className="px-4 py-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {staffData?.map((user, i) => (
                    <tr
                      key={user?._id}
                      className={`text-center ${
                        i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                      } hover:bg-blue-100`}
                    >
                      <td className="whitespace-nowrap px-4 py-2 font-semibold">
                        {user?.joining_date}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold">
                        {user?.user_name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                        {user?.user_phone ? user?.user_phone : "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                        {user?.user_phone ? user?.user_address : "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                        {user?.user_role_id?.role_name
                          ? user?.user_role_id?.role_name
                          : "-"}
                      </td>

                      <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                        {user?.user_publisher_id?.user_name}
                      </td>
                      <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                        {user?.user_updated_by?.user_name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize text-green-600">
                        {user?.user_status}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize text-green-600">
                        {user?.user_salary ? user?.user_salary : "-"}
                      </td>

                      <td className="whitespace-nowrap py-1.5 px-2 text-gray-700">
                        <button
                          className="ml-[8px]"
                          onClick={() => handleShowDocumentModal(user?._id)}
                        >
                          <CiMenuKebab
                            size={30}
                            className="cursor-pointer text-primaryVariant-300 hover:text-primaryVariant-700 font-bold"
                          />
                        </button>
                        {bankDocumentModal == user?._id && (
                          <div className="  bg-success-50 shadow-xl w-[200px] flex flex-col gap-2 py-2 modal-container absolute right-14 z-30">
                            <button
                              className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium "
                              onClick={() => updateStaffModal(user)}
                            >
                              <FiEdit size={18} />
                              Edit
                            </button>
                            <Link to={`/staff-Perfomance/${user?._id}`}>
                              {" "}
                              <button className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium ">
                                <FaUserCheck size={18} />
                                See Perfomance
                              </button>
                            </Link>
                            <Link to={`/sale-target/${user?._id}`}>
                              {" "}
                              <button className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium ">
                                <FaUserCheck size={18} />
                                Sale Target View
                              </button>
                            </Link>
                          </div>
                        )}
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
