import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import ownerRoutes from "./routes/Owner.js";
import petRoutes from "./routes/Pet.js";
import recordRoutes from "./routes/Record.js";
import drugRoutes from "./routes/Drug.js";
import photoRoutes from "./routes/Photo.js";

import { connectDB } from "./config/db.js";

import path from "path";

dotenv.config();    

const app = express();

//startCronJobs();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: `${process.env.DOMAIN}:3001`, // Next.js frontend
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

// Routes
app.use("/owner", ownerRoutes);
app.use("/pet", petRoutes);
app.use("/drug", drugRoutes);
app.use("/record", recordRoutes);
app.use("/photo", photoRoutes);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => res.json({ status: "ok", service: "backend"}));

app.listen(PORT, () => console.debug(`✅ Backend running on port ${PORT}`));
