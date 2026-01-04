import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import ownerRoutes from "./routes/Owner.js";
import petRoutes from "./routes/Pet.js";
import recordRoutes from "./routes/Record.js";
import drugRoutes from "./routes/Drug.js";
import photoRoutes from "./routes/Photo.js";
import formRoutes from "./routes/Form.js";

import { connectDB } from "./config/db.js";

import path from "path";

import { fileURLToPath } from "url";

// Recreate __dirname (since it's not available in ES modules)
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
const __dirname = path.resolve();

dotenv.config();    

const app = express();

//startCronJobs();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [ `${process.env.DOMAIN}:3001`, process.env.DOMAIN ], // allow frontend with or without port
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/owner", ownerRoutes);
app.use("/pet", petRoutes);
app.use("/drug", drugRoutes);
app.use("/record", recordRoutes);
app.use("/photo", photoRoutes);
app.use("/form", formRoutes);

app.get("/", (req, res) => res.json({ status: "ok", service: "backend"}));

app.listen(PORT, '0.0.0.0',() => console.debug(`✅ Backend running on port ${PORT}`));
