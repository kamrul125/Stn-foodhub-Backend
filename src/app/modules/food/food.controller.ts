import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FoodServices } from './food.service';

const createFood = catchAsync(async (req: Request, res: Response) => {
  const result = await FoodServices.create(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Food created successfully',
    data: result,
  });
});

const getAllFood = catchAsync(async (req: Request, res: Response) => {
  const options = {
    page: req.query.page,
    limit: req.query.limit,
  };
  const result = await FoodServices.getAll({}, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Foods fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// নিশ্চিত করুন যে আপনি এখানে 'createFood' যুক্ত করেছেন
export const FoodController = {
  createFood, // এই লাইনটি মিসিং থাকার কারণে এরর দিচ্ছে
  getAllFood,
};