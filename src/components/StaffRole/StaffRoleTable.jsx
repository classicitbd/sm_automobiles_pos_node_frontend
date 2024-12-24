
import { FiEdit } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../utils/baseURL";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import { useState } from "react";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";
import UpDateStaffRole from "./UpDateStaffRole";

const StaffRoleTable = () => {
  const [updateModal, setUpdateModal] = useState(false);
  const [updateModalValue, setUpdateModalValue] = useState(false);
  //   console.log(roleData);
  const updateStaffModal = (item) => {
    setUpdateModal(true);
    setUpdateModalValue(item);
  };
  const {
    data: roleData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/role`],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/role`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();
      return data?.data;
    },
  });

  if (isLoading) {
    return <LoaderOverlay />;
  }
  return (
    <div className="rounded-lg shadow-md">
      {/* Table for showing data */}
      {roleData?.length > 0 ? (
        <div className="mt-8 overflow-x-auto rounded-lg">
          <table className="min-w-full  text-sm ">
            <thead>
              <tr className="font-semibold text-center ">
                <th className="whitespace-nowrap p-4   text-center">
                  Role Name
                </th>
                <th className="whitespace-nowrap p-4  text-center">
                  Created By
                </th>
                <th className="whitespace-nowrap p-4   text-center">
                  Updated By
                </th>

                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-center ">
              {roleData?.map((role, i) => (
                <tr
                  key={role?._id}
                  className={`text-center ${
                    i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                  } hover:bg-blue-100`}
                >
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {role?.role_name}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    {role?.role_publisher_id?.user_name}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    {role?.role_updated_by?.user_name}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                    <>
                      <FiEdit
                        onClick={() => updateStaffModal(role)}
                        className="cursor-pointer text-gray-500 hover:text-gray-300"
                        size={25}
                      />
                    </>
                  </td>
                  {/* <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                    {user?.user_role_id?.staff_permission_delete ||
                    user?.user_role_id?.staff_permission_update ? (
                      <>
                        {user?.user_role_id?.staff_permission_delete && (
                          <MdDeleteForever
                            onClick={() => handleDelete(item)}
                            className="cursor-pointer text-red-500 hover:text-red-300"
                            size={25}
                          />
                        )}
                        {user?.user_role_id?.staff_permission_update && (
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
      {updateModal && (
        <UpDateStaffRole
          setUpdateModal={setUpdateModal}
          updateModalValue={updateModalValue}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default StaffRoleTable;
