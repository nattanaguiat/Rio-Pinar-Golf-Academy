import { useContext } from "react"
import { AppContext } from "../context/AppContext"


const MyBookings = () => {

  const {coaches}=  useContext(AppContext)

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Bookings</p>
      <div>
        {coaches.slice(0,2).map((coach, index) => (
          <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
            <div>
              <img className="w-32 bg-indigo-50" src={coach.image} alt="" />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{coach.name}</p>
              <p className="text-neutral-700">{coach.subtitle}</p>
              <p>{coach.fees}</p>
              <p className="text-xs mt-1"><span className="text-sm text-neutral-700 font-medium">Date & Time:</span>25, August, 2025 | 8:00 AM</p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">Pay Online</button><button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">Cancel Booking</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings
