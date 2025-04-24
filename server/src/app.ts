import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import appointmentRoutes from "./routes/appointments.routes";
import hospitalRoutes from "./routes/hospitals.routes";
import serviceRoutes from "./routes/services.routes";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middlewares/error-handler";
import { routeNotFound } from "./middlewares/route-not-found";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://client:3000"],
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/hospitals", hospitalRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/appointments", appointmentRoutes);

app.use(routeNotFound);
app.use(errorHandler);

export default app;
