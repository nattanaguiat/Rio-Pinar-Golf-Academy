import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const CoachesList = () => {
  const { coaches, aToken, getAllCoaches } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllCoaches();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Coaches</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5">
        {coaches.map((coach) => (
          <div
            className="group border border-indigo-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all"
            key={coach._id || coach.id}
          >
            <div className="w-full h-48 bg-indigo-50">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={coach.image}
                alt={`Coach ${coach.name}`}
              />
            </div>
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">
                {coach.name}
              </p>
              <p className="text-zinc-600 text-sm">{coach.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachesList;


