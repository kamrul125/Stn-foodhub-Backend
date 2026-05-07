import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import config from "../config"; // আপনার কনফিগ ফাইল ইমপোর্ট করুন

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  // ডেভেলপমেন্ট মোডে কনসোলে এরর দেখা যাতে আপনি টার্মিনালে চেক করতে পারেন
  console.error("DEBUG ERROR 🔴:", err);

  // যদি এটি আমাদের কাস্টম AppError না হয় (যেমন Prisma বা JWT এরর)
  if (!(err instanceof AppError)) {
    // Prisma বা অন্যান্য আননোন এররের ক্ষেত্রে মেসেজটি ক্লিন করা
    message = err.message || message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    // এখানে এররের ডিটেইলস পাস করা হয়েছে
    error: {
        name: err.name,
        message: err.message,
        details: err.errors || err // Prisma এরর হলে এখানে সব ডিটেইল দেখাবে
    },
    // শুধুমাত্র ডেভেলপমেন্ট মোডে স্ট্যাক ট্রেস দেখা
    stack: config.env === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;