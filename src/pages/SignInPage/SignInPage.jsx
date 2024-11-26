import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/baseURL";
import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const form = location?.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const handleSignIn = async (data) => {
    setLoading(true);
    const sendData = {
      login_credentials: data?.login_credentials,
      user_password: data?.user_password,
    };
    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Moved out of the headers
        body: JSON.stringify(sendData),
      });

      const result = await response.json();

      if (result?.statusCode == 200 && result?.success == true) {
        toast.success(
          result?.message ? result?.message : "Login successfully",
          {
            autoClose: 1000,
          }
        );
        navigate(form, { replace: true });
        window.location.reload();
        reset();

        setLoading(false);
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Network error or server is down", {
        autoClose: 1000,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center md:min-h-screen py-10">
      <div className="w-full mx-3 md:w-[400px] px-3 md:px-10 pt-5 pb-14 border rounded bg-slate-100 shadow-md">
        <h2 className="text-2xl text-center text-gray-900 my-4 font-bold border-b pb-2">
          Login
        </h2>

        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <div className="form-control w-full">
            <label htmlFor="login_credentials" className="label">
              <span className="label-text">Email or Phone Number</span>
            </label>
            <input
              id="login_credentials"
              type="text"
              placeholder="login with email or phone number"
              className="border rounded px-3 py-2 w-full"
              {...register("login_credentials", {
                required: "Email or Phone number is required",
              })}
            />
            {errors.login_credentials && (
              <p className="text-red-600">
                {" "}
                {errors?.login_credentials?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="user_password"
              className="block text-xs font-medium text-gray-700 mt-2"
            >
              Password
            </label>

            <input
              {...register("user_password", {
                required: "User Password is required",
              })}
              type={showPassword ? "text" : "password"} // Dynamic type based on state
              id="user_password"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
            {errors.user_password && (
              <p className="text-red-600">{errors.user_password?.message}</p>
            )}

            {/* Eye icon for toggling password visibility */}
            <div
              className="absolute top-9 right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaRegEye size={20} />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </div>
          </div>
          <button
            className="px-10 py-2 text-textColor bg-primaryColor w-full opacity-100 hover:opacity-80 transition-opacity duration-200 ease-in-out rounded-full"
            type="submit"
          >
            {loading ? <MiniSpinner /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
