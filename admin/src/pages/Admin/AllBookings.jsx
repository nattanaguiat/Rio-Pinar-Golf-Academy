import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllSessions = () => {
  const { aToken, bookings, getAllBookings, cancelBooking } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllBookings();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Bookings</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Student</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Coach</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {bookings.map((booking, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm: grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={booking.userData.image}
                alt=""
              />{" "}
              <p>{booking.userData.name}</p>
            </div>
            <p className="max-sm:hidden">
              {calculateAge(booking.userData.dob)}
            </p>
            <p>
              {slotDateFormat(booking.slotDate)}, {booking.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full bg-gray-200"
                src={booking.coachData.image}
                alt=""
              />{" "}
              <p>{booking.coachData.name}</p>
            </div>
            <p>
              {currency}
              {booking.amount}
            </p>
            {booking.cancelled ? (
              <p className="text-red-400 text-sm font-md">Cancelled</p>
            ) : (
              <img onClick={()=> cancelBooking(booking._id)}
                className="w-10 cursor-pointer"
                src={assets.cancel_icon}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSessions;
