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
app.use("/api/coach", coachRouter);
app.use("/api/user", userRouter);

// --- Servir frontend (client) ---
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// --- Servir admin panel ---
const adminPath = path.join(__dirname, "../admin/dist");
app.use("/admin", express.static(adminPath));

// ✅ Fallback para Admin SPA
app.get("/admin/*", (req, res) => {
  res.sendFile(path.resolve(adminPath, "index.html"));
});

// ✅ Fallback general para frontend SPA
app.get("*", (req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"));
});

// --- Iniciar servidor ---
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
