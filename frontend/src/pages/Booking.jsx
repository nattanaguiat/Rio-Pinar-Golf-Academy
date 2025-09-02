import { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { GiGolfTee } from "react-icons/gi";
import { toast } from "react-toastify";
import axios from "axios";

const Booking = () => {
  const { coachId } = useParams();
  const { coaches, currencySymbol, backendUrl, token, getCoachesData } =
    useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [coachInfo, setCoachInfo] = useState(null);
  const [coachSlots, setCoachSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchCoachInfo = async () => {
    const coachInfo = coaches.find((coach) => coach._id === coachId);
    setCoachInfo(coachInfo);
  };

  const getAvailableSlots = async () => {
    if (!coachInfo) return;

    let slots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let startTime = new Date(currentDate);

      if (i === 0) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        if (currentMinute > 30) {
          startTime.setHours(currentHour + 1, 0, 0, 0);
        } else {
          startTime.setHours(currentHour, 30, 0, 0);
        }
      } else {
        startTime.setHours(7, 0, 0, 0);
      }

      const endTime = new Date(currentDate);
      endTime.setHours(19, 0, 0, 0);

      let timeSlots = [];
      let currentTime = new Date(startTime);

      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      while (currentTime < endTime) {
        const formattedTime = currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Verificar si el slot ya está reservado
        const isBooked =
          coachInfo.slots_booked?.[slotDate]?.includes(formattedTime);

        if (!isBooked) {
          timeSlots.push({
            datetime: new Date(currentTime),
            time: formattedTime,
          });
        }

        currentTime.setMinutes(currentTime.getMinutes() + 60);
      }

      if (timeSlots.length > 0) {
        slots.push({
          date: new Date(currentDate),
          timeSlots,
        });
      }
    }

    setCoachSlots(slots);
  };

  const bookSession = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    try {
      const date = coachSlots[slotIndex].date;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-session",
        {
          coachId,
          slotDate,
          slotTime,
        },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getCoachesData();
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCoachInfo();
  }, [coaches, coachId]);

  useEffect(() => {
    getAvailableSlots();
  }, [coachInfo]);

  useEffect(() => {
    console.log(coachSlots);
  }, [coachSlots]);

  return (
    coachInfo && (
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="w-full sm:w-72 flex-shrink-0">
            <img
              className="w-full rounded-lg object-cover aspect-[4/5] bg-primary"
              src={coachInfo.image}
              alt={coachInfo.name}
            />
          </div>

          <div className="flex-1 border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
            <p className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-900">
              {coachInfo.name} <GiGolfTee className="text-primary" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>{coachInfo.subtitle}</p>
            </div>

            <div className="mt-4">
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
                About{" "}
                <img src={assets.info_icon} alt="info" className="w-4 h-4" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1 text-justify">
                {coachInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Session fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {coachInfo.fees}
              </span>
            </p>
          </div>
        </div>

        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {coachSlots.length &&
              coachSlots.map((day, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer 
                    ${
                      slotIndex === index
                        ? "bg-primary text-white font-semibold"
                        : "border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  key={index}
                >
                  <p>{daysOfWeek[day.date.getDay()]}</p>
                  <p>{day.date.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {coachSlots.length &&
              coachSlots[slotIndex] &&
              coachSlots[slotIndex].timeSlots.map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={bookSession}
            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book Session
          </button>
        </div>
      </div>
    )
  );
};

export default Booking;
