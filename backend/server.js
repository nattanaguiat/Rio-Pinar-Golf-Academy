import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectCloudinay from "./config/cloudinary.js";
import connectDB from "./config/connectionDB.js";
import adminRouter from "./routes/admin.routes.js";
import coachRouter from "./routes/coach.routes.js";
import path from "path"; // Importa el módulo 'path'
import { fileURLToPath } from 'url'; // Importa para manejar __dirname

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Configura __dirname para el entorno de módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexión a la base de datos y Cloudinary
connectDB();
connectCloudinay();

app.use(express.json());
app.use(cors());

// Sirve los archivos estáticos desde la carpeta 'src/assets'
// Esto permite que el frontend acceda a las imágenes a través de /assets
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));

// Rutas de la API
app.use("/api/admin", adminRouter);
app.use("/api/coaches", coachRouter);

// Ruta principal para verificar que el servidor está funcionando
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log("Server started on PORT", PORT);
});
