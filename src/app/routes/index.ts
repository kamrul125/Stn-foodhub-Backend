import express from 'express';
import { AuthRoutes } from "../modules/auth/auth.route";
import { FoodRoutes } from "../modules/food/food.route";
import { OrderRoutes } from "../modules/order/order.route";
import { ReviewRoutes } from "../modules/review/review.route"; // ✅ Review মডিউল ইমপোর্ট
import { AnalyticsRoutes } from "../modules/analytics/analytics.route"; // ✅ Analytics মডিউল ইমপোর্ট

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/food",
    route: FoodRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes, // 👈 URL হবে: /api/v1/review
  },
  {
    path: "/analytics",
    route: AnalyticsRoutes, // 👈 URL হবে: /api/v1/analytics
  },
];

// সবগুলো রাউটকে লুপের মাধ্যমে রেজিস্টার করা হচ্ছে
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;