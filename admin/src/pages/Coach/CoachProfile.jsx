import { useContext, useEffect, useState } from "react";
import { CoachContext } from "../../context/CoachContext";
import { AppContext } from "../../context/AppContext";
import axios from 'axios'
import {toast} from 'react-toastify'

const CoachProfile = () => {
  const { cToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(CoachContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        fees: profileData.fees
      }

      const {data} = await axios.post(backendUrl + '/api/coaches/update-profile', updateData, {headers: {cToken}})
      if( data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);
      
    }
  }

  useEffect(() => {
    if (cToken) {
      getProfileData();
    }
  }, [cToken]);

  return (
    profileData && (
      <div className="flex flex-col gap-4 m-5">
        <div>
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            <p className="flex item-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div>
              <div className="flex gap-2 mt-1 text-gray-600">
                <p>{profileData.subtitle}</p>
              </div>
              <div className="flex gap-2 mt-1 text-gray-600">
                <p>{profileData.email}</p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                  About:
                </p>
                <p className="text-sm text-gray-600 max-w-[700px] mt-1 text-justify">
                  {profileData.about}
                </p>
              </div>
              <p className="text-gray-600 font-medium mt-4">
                Appointment fee:{" "}
                <span className="text-gray-800">
                  {currency}
                  {isEdit ? (
                    <input
                      type="number"
                      className="border p-1 rounded ml-2"
                      value={profileData.fees}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    profileData.fees
                  )}
                </span>
              </p>
            </div>

            {isEdit ? (
              <div className="flex gap-2 mt-5">
                <button
                  onClick={updateProfile}
                  className="px-4 py-1 bg-primary text-white text-sm rounded-full"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEdit(false)}
                  className="px-4 py-1 border text-sm rounded-full"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default CoachProfile;
