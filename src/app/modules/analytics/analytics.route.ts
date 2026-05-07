import { Router } from "express";
import auth from "../../middleware/auth.middleware";
import { getAdminAnalytics } from "./analytics.controller";

const router = Router();

// শুধুমাত্র অ্যাডমিন ড্যাশবোর্ড দেখতে পারবে
router.get("/", auth('ADMIN'), getAdminAnalytics);

export const AnalyticsRoutes = router;