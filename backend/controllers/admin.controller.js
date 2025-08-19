import validator from "validator";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import Coach from "../models/coach.model.js";
import jwt from "jsonwebtoken"

const addCoach = async (req, res) => {
  try {
    const { name, email, password, subtitle, about, fees } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !subtitle || !about || !fees) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // if (validator.isEmail(email)) {
    //   return res.json({
    //     success: false,
    //     message: "Please enter a valid email",
    //   });
    // }

    if (password.lenght < 8) {
      return res.json({
        success: false,
        message: "Please enter a stronger password",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const coachData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      subtitle,
      about,
      fees,
      date: Date.now(),
    };

    const newCoach = new Coach(coachData);
    await newCoach.save();

    res.json({ success: true, message: "Coach added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, messaage: error.messaage });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const {email, password} = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({email, password}, process.env.JWT_SECRET, {expiresIn: "7h"})
      res.json({success: true, token})
    } else {
      res.json({success: false, message: "Invalid credentials"})
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, messaage: error.messaage });
  }
}

export { addCoach, loginAdmin };
