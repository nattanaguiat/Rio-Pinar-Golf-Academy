import { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { GiGolfTee } from "react-icons/gi";

const Booking = () => {
  const { coachID } = useParams();
  const { coaches, currencySymbol } = useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [coachInfo, setCoachInfo] = useState(null);
  const [bookingSlots, setBookingSlots] = useState([]);
  const [bookingIndex, setBookingIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchCoachInfo = async () => {
    const coachInfo = coaches.find((coach) => coach._id === coachID);
    setCoachInfo(coachInfo);
  };

  const getAvailableSlots = async () => {
    const slotsPerDay = [];
    const today = new Date();
  
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      let startTime = new Date(currentDate);
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); // 9:00 PM
  
      if (i === 0) {
        // Día actual: empieza en la siguiente hora disponible o a las 10:00 AM
        startTime.setHours(Math.max(currentDate.getHours() + 1, 10));
        startTime.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        startTime.setHours(10, 0, 0, 0); // 10:00 AM exacto
      }
  
      const timeSlots = [];
  
      while (startTime < endTime) {
        const formattedTime = startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit", // ✅ corregido
        });
  
        timeSlots.push({
          datetime: new Date(startTime),
          time: formattedTime,
        });
  
        startTime.setMinutes(startTime.getMinutes() + 30); // incrementa 30 minutos
      }
  
      slotsPerDay.push(timeSlots);
    }
  
    setBookingSlots(slotsPerDay);
  };
  

  useEffect(() => {
    fetchCoachInfo();
  }, [coaches, coachID]);

  useEffect(() => {
    getAvailableSlots();
  }, [coachInfo]);

  useEffect(() => {
    console.log(bookingSlots);
  }, [bookingSlots]);

  return (
    coachInfo && (
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          {/* Imagen del coach */}
          <div className="w-full sm:w-72 flex-shrink-0">
            <img
              className="w-full rounded-lg object-cover aspect-[4/5] bg-primary"
              src={coachInfo.image}
              alt={coachInfo.name}
            />
          </div>

          {/* Información del coach */}
          <div className="flex-1 border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
            {/* Nombre y título */}
            <p className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-900">
              {coachInfo.name} <GiGolfTee className="text-primary" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>{coachInfo.subtitle}</p>
            </div>

            {/* Sección "About" */}
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
            {
              bookingSlots.length && bookingSlots.map((item, index) => (
                <div onClick={() => setBookingIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${bookingIndex === index ? 'bg-primary text-white' : 'border border-gray-600'}`} key={index}>
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))
            }
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {bookingSlots.length && bookingSlots[bookingIndex].map((item, index) => (
              <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary tesxt-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>
          <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">Book a session</button>
        </div>
      </div>
    )
  );
};

export default Booking;
