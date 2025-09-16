import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectionDB.js";
import adminRouter from "./routes/admin.routes.js";
import coachRouter from "./routes/coach.routes.js";
import userRouter from "./routes/user.routes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Obtener __dirname en ESM ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Middlewares globales ---
app.use(cors());
app.use(express.json());

// --- Rutas API ---
app.use("/api/admin", adminRouter);
app.use("/api/coaches", coachRouter);
app.use("/api/user", userRouter);

// --- Servir archivos estáticos del frontend y admin ---
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

const adminPath = path.join(__dirname, "../admin/dist");
app.use("/admin", express.static(adminPath));

// --- Iniciar servidor ---
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});