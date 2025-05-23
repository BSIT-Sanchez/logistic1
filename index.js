import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import { refreshToken } from "./middleware/refreshToken.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import listingRoutes from "./routes/listing.routes.js";
import listingStocksRoutes from "./routes/listingStocks.routes.js";
import requestRoutes from "./routes/request.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import docsRoutes from "./routes/docs.routes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import contractRoutes from "./routes/contractRoutes.js";
import path from "path";
import forecastRoutes from "./routes/demandForecast.js";
import topItemsRoutes from "./routes/topSellingItems.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://log1.nodadogenhospital.com'   // <-- your deployed frontend URL
  ],
  credentials: true
}));

app.use(cookieParser());
app.use(refreshToken);

// Serve static files from public directory
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/stocks", listingStocksRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/docs", docsRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api", contractRoutes);
app.use("/api/forecast", forecastRoutes);
app.use("/api/top-items", topItemsRoutes);
app.get("/", (req,res) => {
  res.send("server running on port 3000");
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});