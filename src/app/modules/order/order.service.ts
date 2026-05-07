import { OrderStatus } from "@prisma/client";
import prisma from "../../config/prisma";

// 🛍️ Create a new order
export const createOrderService = async (
  userId: string,
  payload: { foodId: string; quantity: number }
) => {
  const food = await prisma.food.findUnique({
    where: {
      id: payload.foodId,
    },
  });

  if (!food) {
    throw new Error("Food not found");
  }

  const totalPrice = food.price * payload.quantity;

  const order = await prisma.order.create({
    data: {
      userId,
      foodId: payload.foodId,
      quantity: payload.quantity,
      totalPrice,
    },
    include: {
      food: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          // পাসওয়ার্ড বাদ দেওয়া হয়েছে সিকিউরিটির জন্য
        },
      },
    },
  });

  return order;
};

// 👤 Get My orders
export const getMyOrdersService = async (userId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      food: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

// 👑 Admin will see all orders
export const getAllOrdersService = async () => {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      food: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

// 🔄 Update order status (Enum based)
export const updateOrderStatusService = async (
  id: string,
  status: OrderStatus // ✅ string এর বদলে OrderStatus enum ব্যবহার করা হয়েছে
) => {
  const order = await prisma.order.update({
    where: { id },
    data: { 
      status // এটি এখন টাইপ-সেফ
    },
  });

  return order;
};