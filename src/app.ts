import express, { Application, Request, Response } from "express";
import cors from "cors";
import routes from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express();

// ✅ 1. Middleware
app.use(cors());
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

// ✅ 4. Not Found Route (must be after all routes)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "API Not Found",
  });
});

// ✅ 5. Global Error Handler (LAST middleware)
app.use(globalErrorHandler);

export default app;