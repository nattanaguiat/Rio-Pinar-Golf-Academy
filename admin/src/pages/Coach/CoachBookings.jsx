import { useContext, useEffect } from "react";
import { CoachContext } from "../../context/CoachContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const CoachBookings = () => {
  const { cToken, bookings, getBookings, completeBooking, cancelBooking } =
    useContext(CoachContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (cToken) {
      getBookings();
    }
  }, [cToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Bookings</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Students</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {bookings.reverse().map((booking, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={booking.userData.image}
                alt=""
              />
              <p>{booking.userData.name}</p>
            </div>
            <div>
              <p className="text-xs inline border border-primary px-2  rounded-full">
                {booking.payment ? "Online" : "CASH"}
              </p>
            </div>
            <p className="max-sm:hidden">
              {calculateAge(booking.userData.dob)}
            </p>
            <p>
              {slotDateFormat(booking.slotDate)}, {booking.slotTime}
            </p>
            <p>
              {currency}
              {booking.amount}
            </p>
            {booking.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : booking.isComplete ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex">
                <img
                  onClick={() => cancelBooking(booking._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => completeBooking(booking._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachBookings;
