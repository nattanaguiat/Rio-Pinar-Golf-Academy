import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Coaches = () => {
  const { coaches, loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Loading coaches...</h1>
      </div>
    );
  }

  if (coaches.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">No coaches found.</h1>
      </div>
    );
  }


  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">OUR COACHES</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {coaches.map((coach) => (
          <Link key={coach._id} to={`/booking/${coach._id}`}>
            <div
              
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                       transform hover:scale-105 transition duration-300 cursor-pointer"
            >
              <img
                src={coach.image}
                alt={coach.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <p className="text-gray-900 text-lg font-semibold">
                  {coach.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Coaches;
