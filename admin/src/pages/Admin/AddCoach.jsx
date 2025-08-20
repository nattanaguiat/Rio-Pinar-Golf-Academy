import React from "react";
import { assets } from "../../assets/assets";

const AddCoach = () => {
  return (
    <form className="max-w-2xl mx-auto rounded-xl p-6 space-y-6">
  <h2 className="text-xl font-semibold text-gray-700">Add Coach</h2>

  {/* Upload Coach Image */}
  <div className="flex flex-col items-center gap-3">
    <label
      htmlFor="coach-img"
      className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 w-48 h-48 hover:border-blue-500"
    >
      <img src={assets.upload_area} alt="Upload placeholder" className="w-12 h-12 opacity-70" />
      <span className="mt-2 text-sm text-gray-500">Upload coach picture</span>
    </label>
    <input type="file" id="coach-img" hidden name="image" />
  </div>

  {/* Coach Info */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-600">
        Coach Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Name"
        required
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-600">
        Coach Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-600">
        Coach Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        required
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label htmlFor="subtitle" className="block text-sm font-medium text-gray-600">
        Subtitle
      </label>
      <input
        id="subtitle"
        name="subtitle"
        type="text"
        placeholder="Subtitle"
        required
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label htmlFor="fees" className="block text-sm font-medium text-gray-600">
        Fees
      </label>
      <input
        id="fees"
        name="fees"
        type="number"
        placeholder="Your Fees"
        required
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
      />
    </div>
  </div>

  {/* About */}
  <div>
    <label htmlFor="about" className="block text-sm font-medium text-gray-600">
      About
    </label>
    <textarea
      id="about"
      name="about"
      rows={5}
      placeholder="Write about the coach"
      required
      className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* Submit */}
  <button
    type="submit"
    className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-orange-200 transition"
  >
    Add Coach
  </button>
</form>

  );
};

export default AddCoach;
