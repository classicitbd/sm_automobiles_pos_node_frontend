import { Link } from "react-router-dom";
import StaffRoleTable from "../../../components/StaffRole/StaffRoleTable";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";
import { LoaderOverlay } from "@/components/common/loader/LoderOverley";

const StaffRoleTablePage = () => {
  const { user, loading: userLoading } = useContext(AuthContext);
  //Add Staff Role Modal State
  if (userLoading) return <LoaderOverlay />;
  return (
    <div className=" py-6 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl">Staff Role</h1>
        </div>
        {user?.user_role_id?.role_post == true && (
          <div>
            <Link to="/create-staff-role">
              <Button>Add Staff Role</Button>
            </Link>
          </div>
        )}
      </div>
      {/* Show Staff Role Table */}
      <StaffRoleTable user={user} />
    </div>
  );
};

export default StaffRoleTablePage;
