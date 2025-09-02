import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import Coach from "../models/coach.model.js";
import Booking from "../models/booking.model.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.json({ success: false, message: "All fields arre required" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid email" });
    }

    if (password.lenght < 8) {
      return res.json({ success: false, message: "Enter a stronger password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new User(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7h",
      });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await User.findById(userId).select("-password");

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Fields Missing" });
    }

    await User.findByIdAndUpdate(userId, { name, phone, dob, gender });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await User.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const bookSession = async (req, res) => {
  try {
    const { userId, coachId, slotDate, slotTime } = req.body;

    console.log(coachId)

    const coachData = await Coach.findById(coachId).select("-password");

    let slots_booked = coachData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ succes: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await User.findById(userId).select("-password");

    delete coachData.slots_booked;

    const bookingData = {
      userId,
      coachId,
      userData,
      coachData,
      amount: coachData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newBooking = new Booking(bookingData);
    await newBooking.save();

    await Coach.findByIdAndUpdate(coachId, { slots_booked });

    res.json({ success: true, message: "Booking Created" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
