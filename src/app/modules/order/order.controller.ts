import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createOrderService,
  getAllOrdersService,
  getMyOrdersService,
  updateOrderStatusService,
} from "./order.service";

// ➕ Create order
export const createOrder = catchAsync(
  async (req: any, res: Response) => {
    const userId = req.user.userId;

    const result = await createOrderService(userId, req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Order placed successfully",
      data: result,
    });
  }
);

// 👤 My Orders
export const getMyOrders = catchAsync(
  async (req: any, res: Response) => {
    const userId = req.user.userId;

    const result = await getMyOrdersService(userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Orders retrieved successfully",
      data: result,
    });
  }
);

// 👑 All Orders
export const getAllOrders = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllOrdersService();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All orders retrieved successfully",
      data: result,
    });
  }
);

// 🔄 Update status
export const updateOrderStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params; // ✅ Destructuring

    const result = await updateOrderStatusService(
      id as string, // ✅ Explicitly cast to string
      req.body.status
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order status updated",
      data: result,
    });
  }
);