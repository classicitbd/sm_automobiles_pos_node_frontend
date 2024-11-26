import { LoaderOverlay } from "@/components/common/loader/LoderOverley";
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoaderOverlay />;
  }

  if (
    user &&
    user?.user_status == "active" &&
    user?.login_credentials
  ) {
    return children;
  }

  return <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
