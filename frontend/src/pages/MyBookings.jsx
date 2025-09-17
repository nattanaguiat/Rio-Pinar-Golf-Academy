import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const { backendUrl, token, getCoachesData } = useContext(AppContext);

  const [bookings, setBookings] = useState([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
    );
  };

  const navigate = useNavigate();

  const getUserBookings = async () => {
    try {
      const { data } = await axios.get("/api/user/bookings", {
        headers: { token },
      });

      if (data.success) {
        setBookings(data.bookings.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post("/api/user/cancel-booking",
        { bookingId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserBookings();
        getCoachesData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // const initPay = (order) => {
  //   const options = {
  //     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //     amount: order.amount,
  //     currency: order.currency,
  //     name: "Appointment Payment",
  //     description: "Appointmnet Payment",
  //     order_id: order.id,
  //     receipt: order.receipt,
  //     handler: async (response) => {
  //       console.log(response);
  //       try {
  //         const { data } = await axios.post(
  //           backendUrl + "/api/user/verifyRazorpay",
  //           response,
  //           { headers: { token } }
  //         );

  //         if (data.success) {
  //           getUserBookings();
  //           navigate("/my-bookings");
  //         }
  //       } catch (error) {
  //         console.log(error);
  //         toast.error(error.message);
  //       }
  //     },
  //   };
  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };

  // const bookingRazorpay = async (bookingId) => {
  //   try {
  //     const { data } = await axios.post(
  //       backendUrl + "/api/user/payment-razorpay",
  //       { bookingId },
  //       { headers: { token } }
  //     );

  //     if (data.succes) {
  //       initPay(data.order);
  //     }
  //   } catch (error) {}
  // };

  useEffect(() => {
    if (token) {
      getUserBookings();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Bookings
      </p>
      <div>
        {bookings.map((booking, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={booking.coachData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {booking.coachData.name}
              </p>
              <p className="text-neutral-700">{booking.coachData.subtitle}</p>
              <p>Fees: {booking.coachData.fees}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>
                {slotDateFormat(booking.slotDate)} | {booking.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {/* {!booking.cancelled && booking.payment && (
                <button className="w-48 py-2 border rounded text-stone-500 bg-indigo-50">
                  Paid
                </button>
              )} */}
              {!booking.cancelled && !booking.isComplete && /**Implement !booking.payment */ (
                <button
                  onClick={() => bookingRazorpay(booking._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
              )}

              {!booking.cancelled && !booking.isComplete &&  (
                <button
                  onClick={() => cancelBooking(booking._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Booking
                </button>
              )}
              {booking.cancelled && !booking.isComplete &&  (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Booking Cancelled
                </button>
              )}
              {booking.isComplete && <button className="sm:min-w-48 border border-green-500 rounded text-green-500">Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
