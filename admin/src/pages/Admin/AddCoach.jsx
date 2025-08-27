import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddCoach = () => {
  const [coachImg, setCoachImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!coachImg) {
        return toast.error("Image Not Selected");
      }

      const formData = new FormData();

      formData.append("image", coachImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("subtitle", subtitle);
      formData.append("fees", Number(fees));
      formData.append("about", about);

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-coach",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setCoachImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setSubtitle("");
        setFees("");
        setAbout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error)
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto rounded-xl p-6 space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-700">Add Coach</h2>

      <div className="flex flex-col items-center gap-3">
        <label
          htmlFor="coach-img"
          className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 w-48 h-48 hover:border-blue-500"
        >
          <img
            src={coachImg ? URL.createObjectURL(coachImg) : assets.upload_area}
            alt="Upload placeholder"
            className="w-12 h-12 opacity-70"
          />
          <span className="mt-2 text-sm text-gray-500">
            Upload coach picture
          </span>
        </label>
        <input
          onChange={(e) => setCoachImg(e.target.files[0])}
          type="file"
          id="coach-img"
          hidden
          name="image"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Coach Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            required
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Coach Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Coach Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="subtitle"
            className="block text-sm font-medium text-gray-600"
          >
            Subtitle
          </label>
          <input
            onChange={(e) => setSubtitle(e.target.value)}
            value={subtitle}
            id="subtitle"
            name="subtitle"
            type="text"
            placeholder="Subtitle"
            required
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="fees"
            className="block text-sm font-medium text-gray-600"
          >
            Fees
          </label>
          <input
            onChange={(e) => setFees(e.target.value)}
            value={fees}
            id="fees"
            name="fees"
            type="number"
            placeholder="Your Fees"
            required
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="about"
          className="block text-sm font-medium text-gray-600"
        >
          About
        </label>
        <textarea
          onChange={(e) => setAbout(e.target.value)}
          value={about}
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
