import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import Coach from "../models/coach.model.js";
import Booking from "../models/booking.model.js";
import razorpay from "razorpay";

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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

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
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
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

    console.log(coachId);

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

export const getAllBookings = async (req, res) => {
  try {
    const { userId } = req.body;

    const bookings = await Booking.find({ userId });

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { userId, bookingId } = req.body;

    const bookingData = await Booking.findById(bookingId);

    if (bookingData.userId !== userId) {
      return res.json({ success: false, message: "Unathorized action" });
    }

    await Booking.findByIdAndUpdate(bookingId, { cancelled: true });

    const { coachId, slotDate, slotTime } = bookingData;

    const coachData = await Coach.findById(coachId);

    let slots_booked = coachData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await Coach.findByIdAndUpdate(coachId, { slots_booked });

    res.json({ success: true, message: "Booking Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// const razorpayInstance = new razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export const paymentRazorpay = async (req, res) => {
//   try {
//     const { bookingId } = req.body;

//     const bookingData = await Booking.findById(bookingId);

//     if (!bookingData || bookingData.cancelled) {
//       return res.json({
//         success: false,
//         message: "Booking Cancelled or  not found",
//       });
//     }

//     const options = {
//       amount: bookingData.amount * 100,
//       currency: process.env.CURRENCY,
//       receipt: bookingId,
//     };

//     const order = await razorpayInstance.orders.create(options);

//     res.json({ success: true, order });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

export const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    console.log(orderInfo);
    if (orderInfo.status === "paid") {
      await Booking.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      res.json({ success: true, message: "Payment successfully" });
    } else {
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
