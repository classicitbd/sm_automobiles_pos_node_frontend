import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";

const ProfileSetting = ({ setUserupdateModalOpen }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [changePassword, setChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //Image preview....
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("user_logo", file);
    }
  };
  const clearImagePreview = () => {
    setImagePreview(null);
    setValue("user_logo", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  //Image preview end....

  const handleDataPost = async (data) => {
    console.log(data);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[750px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin">
        {" "}
        <div className="">
          <div className="flex items-center justify-between mt-4">
            <h3
              className="text-[26px] font-bold text-gray-800 capitalize"
              id="modal-title"
            >
              Update Profile
            </h3>
            <button
              type="button"
              className="btn bg-white hover:bg-error-50 hover:text-error-200  p-1 absolute right-3 rounded-full top-3"
              onClick={() => setUserupdateModalOpen(false)}
            >
              {" "}
              <RxCross1 size={20}></RxCross1>
            </button>
          </div>

          <hr className="mt-2 mb-6" />

          <form onSubmit={handleSubmit(handleDataPost)} className="">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Name
              </label>

              <input
                {...register("name")}
                type="text"
                placeholder="Write Your Name"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
              {errors.name && (
                <p className="text-red-600">{errors.name?.message}</p>
              )}
            </div>

            <div className="mt-5">
              <div className="flex justify-between   bg-gray-100 p-2 rounded-lg shadow border ">
                <p className="text-gray-700 font-semibold text-sm">
                  Do you want to change your password
                </p>
                <label
                  htmlFor="changePassword"
                  className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-800"
                >
                  <span className="relative">
                    <input
                      id="changePassword"
                      type="checkbox"
                      className="hidden peer"
                      checked={changePassword} // Control the toggle state
                      onChange={() => setChangePassword(!changePassword)}
                    />
                    <div className="w-12 h-4 rounded-full shadow bg-slate-300  peer-checked:bg-bgBtnActive"></div>
                    <div className="absolute left-0 w-6 h-6 rounded-full -inset-y-1 peer-checked:right-0 peer-checked:left-auto peer-checked:bg-primary bg-white ring-[1px] shadow-lg  ring-gray-300  "></div>
                  </span>
                </label>
              </div>
              {changePassword && (
                <div className="relative">
                  <label
                    htmlFor="user_password"
                    className="block text-sm font-medium text-gray-700 mt-2"
                  >
                    Password
                  </label>

                  <input
                    {...register("user_password", {
                      validate: {
                        isPassword: (value) =>
                          value.length >= 4 ||
                          " Password must be at least 4 characters",
                      },
                      required: "User Password is required",
                    })}
                    type={showPassword ? "text" : "password"} // Dynamic type based on state
                    id="user_password"
                    placeholder="Enter your new password"
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  {errors.user_password && (
                    <p className="text-red-600 text-sm">
                      {errors.user_password?.message}
                    </p>
                  )}

                  {/* Eye icon for toggling password visibility */}
                  <div
                    className="absolute top-9 right-3 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaRegEye size={20} />
                    ) : (
                      <FaRegEyeSlash size={20} />
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4">
              <label
                htmlFor=""
                className="block text-xs font-medium text-gray-700"
              >
                Address
              </label>

              <input
                {...register("address")}
                type="text"
                placeholder="Write Your Address"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
            </div>

            <div className="mt-6">
              {imagePreview ? (
                <div className="relative">
                  <button
                    type="button"
                    className="btn bg-red-300 border p-1 absolute right-1 rounded-full top-1 text-red-600 "
                    onClick={clearImagePreview}
                  >
                    {" "}
                    <RxCross1 size={15}></RxCross1>
                  </button>

                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover my-2 rounded "
                  />
                </div>
              ) : (
                <label
                  className="mt-4 w-full h-[160px] bg-gray-200 border-dashed border flex justify-center items-center rounded cursor-pointer"
                  htmlFor="user_logo"
                  type="button"
                >
                  <div className="flex flex-col items-center justify-center ">
                    <div>
                      <RiImageAddFill size={25} />
                    </div>
                  </div>
                </label>
              )}

              <input
                {...register("user_logo", {
                  valiDate: {
                    isImage: (value) =>
                      (value[0] && value[0].type.startsWith("image/")) ||
                      "Only image files are allowed",
                  },
                })}
                accept="image/*"
                type="file"
                ref={fileInputRef}
                id="user_logo"
                className="mt-2  sm:text-sm p-0.5 file:cursor-pointer file:bg-primaryVariant-400 file:text-white file:border-none file:rounded file:px-2 file:py-1.5"
                onChange={handleImageChange}
              />
            </div>

            <div className="flex justify-end">
              {loading == true ? (
                <div className="px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded">
                  <MiniSpinner />
                </div>
              ) : (
                <button
                  className="px-10 py-2  bg-primary   text-white rounded"
                  type="submit"
                >
                  Save
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
