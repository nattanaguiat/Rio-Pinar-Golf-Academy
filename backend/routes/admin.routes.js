import { Router } from "express";
import {
  addCoach,
  adminDashboard,
  allCoaches,
  bookingCancelled,
  bookingsAdmin,
  loginAdmin,
} from "../controllers/admin.controller.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = Router();

// adminRouter.post("/add-coach", authAdmin, upload.single("image"), addCoach);
// adminRouter.post("/login", loginAdmin);
// adminRouter.post("/all-coaches", authAdmin, allCoaches);
// adminRouter.get("/bookings", authAdmin, bookingsAdmin);
// adminRouter.post("/cancel-booking", authAdmin, bookingCancelled);
// adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
