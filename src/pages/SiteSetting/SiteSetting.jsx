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
  const { user } = useContext(AuthContext);
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

  if (isLoading) {
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
      const response = await fetch(
        `${BASE_URL}/site_setting?role_type=site_setting_update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(sendData),
        }
      );
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

      <div className="flex items-center justify-between bg-white p-4 rounded-xl">
        <h3 className="text-[20px] font-semibold">Site Seeting</h3>
        <div className="flex items-center gap-2">
          <Link to="/">
            <p>
              <PiHouseBold size={25} color="#3EA2FA" />
            </p>
          </Link>
          <p className="font-semibold text-xl">/</p>
          <Link to="/seeting">
            <p className="font-semibold">Site Seeting</p>
          </Link>
        </div>
      </div>

      <div className="md:mt-10 mt-8 bg-white">
        <div className="p-5">
          <h4 className="font-semibold text-[20px] mt-2">
            Software Information
          </h4>
          <hr className="mt-2 mb-4" />
          <form onSubmit={handleSubmit(handleDataPost)}>
            <div className="grid gap-6 grid-cols-2">
              <div>
                <label className="font-semibold" htmlFor="logo">
                  Logo<span className="text-red-500"> if need</span>{" "}
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
                  className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold" htmlFor="title">
                  Title<span className="text-red-500"> if need</span>{" "}
                </label>
                <input
                  defaultValue={initialData?.title}
                  {...register("title")}
                  id="title"
                  type="text"
                  className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold" htmlFor="emergency_contact">
                  Contact No<span className="text-red-500"> if need</span>{" "}
                </label>
                <input
                  defaultValue={initialData?.emergency_contact}
                  {...register("emergency_contact")}
                  id="emergency_contact"
                  type="number"
                  className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold" htmlFor="email">
                  E-Mail
                  <span className="text-red-500"> if need</span>{" "}
                </label>
                <input
                  defaultValue={initialData?.email}
                  {...register("email")}
                  id="email"
                  type="text"
                  className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold" htmlFor="address">
                  Address
                  <span className="text-red-500"> if need</span>{" "}
                </label>
                <input
                  defaultValue={initialData?.address}
                  {...register("address")}
                  id="address"
                  type="text"
                  className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold" htmlFor="unit_name">
                  Global Unit Name
                  <span className="text-red-500"> if need</span>{" "}
                </label>
                <input
                  defaultValue={initialData?.unit_name}
                  {...register("unit_name")}
                  id="unit_name"
                  type="text"
                  className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
              </div>
            </div>
            {}
            {/* {user?.role_id?.site_setting_update && ( */}
            <div className="mt-2 flex items-center justify-end">
              <button
                type="submit"
                className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
              >
                Submit
              </button>
            </div>
            {/* )} */}
          </form>
        </div>
      </div>
    </>
  );
};

export default SiteSetting;
