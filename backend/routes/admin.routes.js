import { Router } from "express";
import { addCoach, loginAdmin } from "../controllers/admin.controller.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = Router();

adminRouter.post("/add-coach", authAdmin, upload.single("image"), addCoach);
adminRouter.post("/login", loginAdmin);

export default adminRouter;