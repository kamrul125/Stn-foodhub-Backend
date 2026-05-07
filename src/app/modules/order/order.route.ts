import { Router } from "express";
import auth from "../../middleware/auth.middleware";
import { 
  createOrder, 
  getAllOrders, 
  getMyOrders, 
  updateOrderStatus 
} from "./order.controller";

const router = Router();

// ১. যে কেউ (USER বা ADMIN) অর্ডার তৈরি করতে পারবে
router.post("/", auth('USER', 'ADMIN'), createOrder);

// ২. ইউজার শুধু তার নিজের অর্ডারগুলো দেখতে পারবে
router.get("/my-orders", auth('USER'), getMyOrders);

// ৩. শুধু ADMIN সব ইউজারের সব অর্ডার দেখতে পারবে
router.get("/", auth('ADMIN'), getAllOrders);

// ৪. শুধু ADMIN অর্ডারের স্ট্যাটাস আপডেট করতে পারবে
router.patch("/:id", auth('ADMIN'), updateOrderStatus);

export const OrderRoutes = router;