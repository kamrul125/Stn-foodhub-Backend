import express, { Application, Request, Response } from "express";
import cors from "cors";
import routes from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express();

// ✅ 1. Middleware
// প্রোডাকশনে সুরক্ষার জন্য origin নির্দিষ্ট করে দেওয়া ভালো
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"], // আপনার ফ্রন্টেন্ডের লোকাল পোর্ট
  credentials: true
}));
app.use(express.json());

// ✅ 2. API Routes
app.use("/api/v1", routes);

// ✅ 3. Root Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "FoodHub Pro API is running...",
  });
});

// ✅ 4. Not Found Route (সঠিক অর্ডারে আছে)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "API Not Found",
  });
});

// ✅ 5. Global Error Handler (সবার শেষে থাকবে)
app.use(globalErrorHandler);

export default app;