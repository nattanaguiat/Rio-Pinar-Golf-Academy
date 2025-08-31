import { Router } from "express";
import {
  getProfile,
  login,
  signUp,
  updateProfile,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.get("/profile", authUser, getProfile);
userRouter.post("/update-profile", upload.single("image"), authUser, updateProfile);

export default userRouter;
