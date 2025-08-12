import { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { GiGolfTee } from "react-icons/gi";

const Booking = () => {
  const { coachID } = useParams();
  const { coaches } = useContext(AppContext);

  const [coachInfo, setCoachInfo] = useState(null);

  const fetchCoachInfo = async () => {
    const coachInfo = coaches.find((coach) => coach._id === coachID);
    setCoachInfo(coachInfo);
    console.log(coachInfo);
  };

  useEffect(() => {
    fetchCoachInfo();
  }, [coaches, coachID]);

  return (
    coachInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={coachInfo.image} alt="" />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {coachInfo.name} <GiGolfTee />
            </p>
          
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>{coachInfo.subtitle}</p>
          </div>
          <div >
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{coachInfo.about}</p>
          </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Booking;
