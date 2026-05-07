import { Router } from "express";
import auth from "../../middleware/auth.middleware";
import { createReview, getFoodReviews } from "./review.controller";

const router = Router();

// ১. শুধুমাত্র লগইন করা ইউজাররা রিভিও দিতে পারবে
router.post("/", auth('USER', 'ADMIN'), createReview);

// ২. যে কেউ খাবারের রিভিও দেখতে পারবে (auth ছাড়া)
router.get("/:foodId", getFoodReviews);

export const ReviewRoutes = router;