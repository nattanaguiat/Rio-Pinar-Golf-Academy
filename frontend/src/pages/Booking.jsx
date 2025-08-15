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
  const [coachSlots, setCoachSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchCoachInfo = async () => {
    const coachInfo = coaches.find((coach) => coach._id === coachID);
    setCoachInfo(coachInfo);
  };

  const getAvailableSlots = async () => {
    let slots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let startTime = new Date(currentDate);

      if (i === 0) {
        // Para el día actual
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        if (currentMinute > 30) {
          startTime.setHours(currentHour + 1, 0, 0, 0);
        } else {
          startTime.setHours(currentHour, 30, 0, 0);
        }
      } else {
        // Para los días siguientes
        startTime.setHours(7, 0, 0, 0);
      }

      const endTime = new Date(currentDate);
      endTime.setHours(19, 0, 0, 0);

      let timeSlots = [];
      let currentTime = new Date(startTime);
      while (currentTime < endTime) {
        timeSlots.push({
          datetime: new Date(currentTime),
          time: currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
        currentTime.setMinutes(currentTime.getMinutes() + 60);
      }

      // Almacenamos la información del día, incluso si no tiene turnos disponibles
      slots.push({
        date: new Date(currentDate),
        timeSlots: timeSlots,
      });
    }
    setCoachSlots(slots);
  };

  useEffect(() => {
    fetchCoachInfo();
  }, [coaches, coachID]);

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
          {/* Aquí está el cambio: se usa el slotIndex para mostrar las horas del día seleccionado */}
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
          <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">
            Book Session
          </button>
        </div>
      </div>
    )
  );
};

export default Booking;
