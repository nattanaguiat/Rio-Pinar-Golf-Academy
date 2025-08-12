import React from "react";
import { assets } from "../assets/assets";

const JuniorAcademy = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-20 text-gray-800">
      {/* Título principal */}
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
        THE NEXT LEVEL
      </h1>

      {/* Subtítulo */}
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
        FULL-TIME JUNIOR & POST GRAD ACADEMY
      </h2>

      {/* Descripción inicial */}
      <p className="max-w-4xl mx-auto text-center mb-8 leading-relaxed">
        We are very proud of our Full-time Player Development programs for Junior and Post Grad student athletes here at Rio Junior Golf Academy...
      </p>

      {/* Cita */}
      <blockquote className="max-w-4xl mx-auto italic border-l-4 border-primary pl-4 mb-10">
        “This program is for those parents who want to take the next step in their Junior or Post Grad athletes future...”
      </blockquote>

      {/* Outline del programa */}
      <h3 className="text-2xl font-bold text-center mb-6">
        FULL-TIME PROGRAM OUTLINE
      </h3>
      <ul className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12 list-disc list-inside">
        <li>Intensive daily instruction in all aspects of high-performance golf...</li>
        <li>Mentoring by PGA and LPGA Tour players</li>
        <li>Supervised practice and play in a tropical climate...</li>
        <li>Unlimited access to all of Rio’s practice facilities...</li>
        <li>Competition on two of Florida’s top junior tours...</li>
        <li>Counselling on college scholarships and career development...</li>
        <li>Transition to elite amateur competition...</li>
        <li>Implementation of High-End Technology...</li>
        <li>Access to custom club fitting</li>
        <li>An academic experience at a world class private school</li>
        <li>A safe and caring home life experience</li>
        <li>Development of life skills and friendships...</li>
      </ul>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
        <img
          src={assets.golf_academy1}
          alt="Junior Academy training"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
        <img
          src={assets.golf_academy2}
          alt="Golf training session"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center leading-relaxed">
        <p>
          At the Rio Junior Golf Academy, we are dedicated to providing a supportive learning environment that helps young golfers reach great heights...
        </p>
      </div>
    </section>
  );
};

export default JuniorAcademy;



