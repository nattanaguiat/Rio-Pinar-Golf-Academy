import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Importa tus routers y configuraciones
import connectCloudinay from "./config/cloudinary.js";
import connectDB from "./config/connectionDB.js";
import adminRouter from "./routes/admin.routes.js";
// import coachRouter from "./routes/coach.routes.js";
// import userRouter from "./routes/user.routes.js";

// Carga las variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Necesario para trabajar con rutas de archivos en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexiones a servicios externos (DB, Cloudinary, etc.)
connectDB();
connectCloudinay();

// Middlewares
app.use(express.json());
// CORS no es necesario aquí porque el frontend y admin se servirán desde el mismo dominio
app.use(cors());

// Rutas de la API (Backend)
app.use("/api/admin", adminRouter);
// app.use("/api/coaches", coachRouter);
// app.use("/api/user", userRouter);

// --- SERVIR ARCHIVOS ESTÁTICOS DEL FRONTEND ---
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// Ruta principal que sirve el frontend (SPA)
app.get("/", (req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"));
});

// --- SERVIR ARCHIVOS ESTÁTICOS DEL ADMIN ---
const adminPath = path.join(__dirname, "../admin/dist");
app.use("/admin", express.static(adminPath));

// Maneja las rutas del panel de admin (SPA)
app.get("/admin/*", (req, res) => {
  res.sendFile(path.resolve(adminPath, "index.html"));
});

// Fallback para las rutas del frontend que no coinciden con las anteriores
app.get("*", (req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server started on PORT ${PORT}`);
});