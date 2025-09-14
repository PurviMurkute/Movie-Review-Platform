import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectToDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import movieRouter from "./routes/movieRoute.js";
import watchlistRouter from "./routes/watchlistRoute.js";
dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

app.use('/api', authRouter);
app.use('/api', movieRouter);
app.use('/api', watchlistRouter);

ConnectToDB();
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});