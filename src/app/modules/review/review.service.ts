import prisma from "../../config/prisma";

export const createReviewService = async (
  userId: string,
  payload: { foodId: string; rating: number; comment: string }
) => {
  const result = await prisma.review.create({
    data: {
      userId,
      foodId: payload.foodId,
      rating: payload.rating,
      comment: payload.comment,
    },
    include: {
      user: {
        select: { name: true } // শুধু ইউজারের নাম দেখাবে
      }
    }
  });
  return result;
};

export const getFoodReviewsService = async (foodId: string) => {
  return await prisma.review.findMany({
    where: { foodId },
    include: {
      user: { select: { name: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
};