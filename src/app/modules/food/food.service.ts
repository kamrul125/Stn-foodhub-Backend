import { Food, PrismaClient } from '@prisma/client';
import prisma from '../../config/prisma';

export class FoodService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(payload: Food): Promise<Food> {
    return await this.prisma.food.create({
      data: payload,
    });
  }

  async getAll(filters: any, options: any) {
    const { page = 1, limit = 10 } = options;
    const skip = (Number(page) - 1) * Number(limit);

    const foods = await this.prisma.food.findMany({
      where: filters,
      skip,
      take: Number(limit),
    });

    const total = await this.prisma.food.count({ where: filters });

    // ✅ এই রিটার্নটি খুব গুরুত্বপূর্ণ, যা কন্ট্রোলার খুঁজে পাচ্ছিল না
    return {
      data: foods,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
      },
    };
  }
}

export const FoodServices = new FoodService();