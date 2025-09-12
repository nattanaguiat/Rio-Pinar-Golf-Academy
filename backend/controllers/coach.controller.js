import Coach from "../models/coach.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Booking from "../models/booking.model.js";

// export const changeAvailability = async (req, res) => {
//   try {
//     const { coachId } = req.body;

//     const coachData = await Coach.findById(coachId);
//     await Coach.findByIdAndUpdate(coachId, { available: !coachData.available });
//     res.json({ success: true, message: "Availability Changed" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

export const coachesList = async (req, res) => {
  try {
    const coaches = await Coach.find({}).select(["-password", "-email"]);

    res.json({ success: true, coaches });
  } catch {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const loginCoach = async (req, res) => {
  try {
    const { email, password } = req.body;

    const coach = await Coach.findOne({ email });

    if (!coach) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, coach.password);

    if (isMatch) {
      const token = jwt.sign({ id: coach._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const bookingsCoach = async (req, res) => {
  try {
    const { coachId } = req.body;

    const bookings = await Booking.find({ coachId });

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const bookingComplete = async (req, res) => {
  try {
    const { coachId, bookingId } = req.body;

    const bookingData = await Booking.findById(bookingId);

    if (bookingData && bookingData.coachId === coachId) {
      await Booking.findByIdAndUpdate(bookingId, { isComplete: true });
      return res.json({ success: true, message: "Booking Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const bookingCancel = async (req, res) => {
  try {
    const { coachId, bookingId } = req.body;

    const bookingData = await Booking.findById(bookingId);

    if (bookingData && bookingData.coachId === coachId) {
      await Booking.findByIdAndUpdate(bookingId, { cancelled: true });
      return res.json({ success: true, message: "Booking Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const coachDashboard = async (req, res) => {
  try {
    const { coachId } = req.body;
    const bookings = await Booking.find({ coachId });

    let earnings = 0;

    bookings.map((booking) => {
      if (booking.isComplete || booking.payment) {
        earnings += booking.amount;
      }
    });

    let students = [];

    bookings.map((booking) => {
      if (students.includes(booking.userId)) {
        students.push(booking.userId);
      }
    });

    const dashData = {
      earnings,
      bookings: bookings.length,
      students: students.length,
      latestBookings: bookings.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const coachProfile = async (req, res) => {
  try {
    const { coachId } = req.body;
    const profileData = await Coach.findById(coachId).select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateCoachProfile = async (req, res) => {
  try {
    const { coachId, fees } = req.body;

    await Coach.findByIdAndUpdate(coachId, { fees });
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
