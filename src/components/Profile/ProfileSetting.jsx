import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
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

            <div className="mt-2">
              <label
                htmlFor=""
                className="block text-xs font-medium text-gray-700"
              >
                Password
              </label>

              <input
                {...register("password")}
                type="password"
                placeholder="Your Password"
                readOnly
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
            </div>
            <div className="mt-2">
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
