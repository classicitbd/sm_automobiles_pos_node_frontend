import { FaRegEdit } from "react-icons/fa";
import ProfileSetting from "./ProfileSetting";
import { FiSettings } from "react-icons/fi";
import { useState } from "react";

const MyProfile = () => {
  const [userupdateModalOpen, setUserupdateModalOpen] = useState(false);
  const [userupdateModaldata, setUserupdateModaldata] = useState();

  //updateUser function
  const handleUpdateUser = () => {
    setUserupdateModalOpen(true);
    setUserupdateModaldata();
  };
  return (
    <div>
      <h4 className=" bg-primary  p-4 flex items-center gap-3 text-white mb-2 max-w-5xl mx-auto rounded">
        <FiSettings className=" text-2xl text-white" />
        <span>Profile Details</span>
      </h4>
      <div className="my-10 bg-slate-50 shadow relative max-w-5xl mx-auto rounded">
        <button
          className="absolute right-5 top-5 flex items-center text-xl gap-2 font-semibold text-gray-500 hover:text-gray-900"
          onClick={() => handleUpdateUser()}
        >
          Edit <FaRegEdit size={30} className="" />
        </button>
        <div className="p-10 flex justify-center items-center sm:gap-x-10 flex-wrap">
          <div className=" ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoYhb61Moi9JBoHyjir5XfRZ-V-8OxIopyrw&s"
              alt=""
              className="w-[180px] h-[180px] object-cover rounded-full"
            />
          </div>
          <div className="mt-4 sm:mt-0">
            <p className="text-3xl font-medium uppercase">Ramim Ahamed</p>

            <p className="text-2xl font-medium">Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>

      {userupdateModalOpen && (
        <ProfileSetting setUserupdateModalOpen={setUserupdateModalOpen} />
      )}
    </div>
  );
};

export default MyProfile;
