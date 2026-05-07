import { Request, Response } from "express";
import { getAdminAnalyticsService } from "./analytics.service";

export const getAdminAnalytics = async (req: Request, res: Response) => {
  try {
    const result = await getAdminAnalyticsService();

    res.status(200).json({
      success: true,
      message: "Analytics data fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch analytics",
    });
  }
};