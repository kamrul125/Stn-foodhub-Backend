import express, { Application, Request, Response } from "express";
import cors from "cors";
import routes from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express();

// ✅ 1. Middleware (সংশোধিত CORS)
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "http://localhost:5173",
    "https://stn-foodhub-frontend.vercel.app" // আপনার ভার্সেল ফ্রন্টএন্ডের লিংকটি এখানে যোগ করা হয়েছে
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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

// ✅ 4. Not Found Route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "API Not Found",
  });
});

// ✅ 5. Global Error Handler
app.use(globalErrorHandler);

export default app;