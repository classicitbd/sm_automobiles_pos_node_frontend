import { PiHouseBold } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { LoaderOverlay } from "@/components/common/loader/LoderOverley";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ImageUploader from "@/helpers/ImageUploader";
import { AuthContext } from "@/context/AuthProvider";
import { BASE_URL } from "@/utils/baseURL";

const SiteSetting = () => {
  const { user, loading: userLoading } = useContext(AuthContext);
  const { register, reset, handleSubmit } = useForm(); //get data in form
  const {
    data: settings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/site_setting`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/site_setting`);
      const data = await res.json();
      return data;
    },
  }); // get Site Settings

  if (isLoading || userLoading) {
    return <LoaderOverlay />;
  }

  const initialData = settings?.data[0];

  const handleDataPost = async (data) => {
    toast.error("Please wait a moment", {
      autoClose: 1000,
    });
    let logo;
    let favicon;
    if (data?.logo?.[0]) {
      const logoUpload = await ImageUploader(data?.logo?.[0]);
      logo = logoUpload[0];
    }
    if (data?.favicon?.[0]) {
      const faviconUpload = await ImageUploader(data?.favicon?.[0]);
      favicon = faviconUpload[0];
    }
    const sendData = {
      logo: logo || initialData?.logo,
      favicon: favicon || initialData?.favicon,
      title: data?.title || initialData?.title,
      emergency_contact:
        data?.emergency_contact || initialData?.emergency_contact,
      _id: initialData?._id,
      email: data?.email || initialData?.email,
      address: data?.address || initialData?.address,
      unit_name: data?.unit_name || initialData?.unit_name,
      setting_updated_by: user?._id,
    };
    try {
      const response = await fetch(`${BASE_URL}/site_setting`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(sendData),
      });
      const result = await response.json();
      if (result?.statusCode == 200 && result?.success == true) {
        toast.success(
          result?.message ? result?.message : "Setting created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        reset();
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Network error or server is down", {
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      {/* Site setting navbar */}

      <div className="bg-white shadow-lg rounded-xl p-6 max-w-7xl mx-auto sm:mt-6">
        {/* Header Section */}
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h3 className="text-2xl font-bold text-gray-700">Site Setting</h3>
          <div className="flex items-center gap-2 text-gray-600">
            <Link to="/" className="flex items-center gap-1">
              <PiHouseBold size={25} color="#3EA2FA" />
            </Link>
            <span className="font-semibold text-xl">/</span>
            <Link to="/site_setting" className="text-blue-500 hover:underline">
              Site Setting
            </Link>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(handleDataPost)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="logo"
              >
                Logo <span className="text-red-500">(if needed)</span>
              </label>
              <input
                {...register("logo", {
                  validate: (value) => {
                    if (value && value.length > 0) {
                      return (
                        value[0].type.startsWith("image/") ||
                        "Only image files are allowed"
                      );
                    }
                  },
                })}
                id="logo"
                type="file"
                accept="image/*"
                className="block w-full px-4 py-2 text-green-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 file:bg-green-600 file:text-white file:border-none file:rounded file:cursor-pointer "
              />
            </div>

            {/* Title */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="title"
              >
                Title <span className="text-red-500">(if needed)</span>
              </label>
              <input
                defaultValue={initialData?.title}
                {...register("title")}
                id="title"
                type="text"
                placeholder="Enter site title"
                className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="emergency_contact"
              >
                Contact No <span className="text-red-500">(if needed)</span>
              </label>
              <input
                defaultValue={initialData?.emergency_contact}
                {...register("emergency_contact")}
                id="emergency_contact"
                type="number"
                placeholder="Enter contact number"
                className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="email"
              >
                E-Mail <span className="text-red-500">(if needed)</span>
              </label>
              <input
                defaultValue={initialData?.email}
                {...register("email")}
                id="email"
                type="email"
                placeholder="Enter email address"
                className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Address */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="address"
              >
                Address <span className="text-red-500">(if needed)</span>
              </label>
              <input
                defaultValue={initialData?.address}
                {...register("address")}
                id="address"
                type="text"
                placeholder="Enter address"
                className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Global Unit Name */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="unit_name"
              >
                Global Unit Name{" "}
                <span className="text-red-500">(if needed)</span>
              </label>
              <input
                defaultValue={initialData?.unit_name}
                {...register("unit_name")}
                id="unit_name"
                type="text"
                placeholder="Enter unit name"
                className="block w-full px-4 py-2  file::bg-green-600 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          {user?.user_role_id?.site_setting_patch == true && (
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default SiteSetting;
