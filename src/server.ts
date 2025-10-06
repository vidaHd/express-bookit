import express, { Application } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import resetRoutes from "./routes/reset.routes";
import companyRoutes from "./routes/company.routes";
import serviceRoutes from "./routes/service.routes";
import userService from "./routes/user-service.routes";
import jobRoutes from "./routes/job.routes";
import availableTime from "./routes/available.time";


import { connectDB } from "./config/db";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// MongoDB
connectDB();
// Routes
app.use("/auth", authRoutes);
app.use("/", profileRoutes);
app.use("/", resetRoutes);
app.use("/", companyRoutes);
app.use("/", jobRoutes);
app.use("/", serviceRoutes);
app.use("/", userService);
app.use("/", availableTime);




const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
