import { Request, Response } from "express";
import { createReviewService, getFoodReviewsService } from "./review.service";

export const createReview = async (req: any, res: Response) => {
  try {
    const { id: userId } = req.user;
    const result = await createReviewService(userId, req.body);

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getFoodReviews = async (req: Request, res: Response) => {
  try {
    // ✅ Type casting used to solve "string | string[]" error
    const { foodId } = req.params as { foodId: string };

    const result = await getFoodReviewsService(foodId);

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};