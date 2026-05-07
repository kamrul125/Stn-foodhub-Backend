import { OrderStatus } from "@prisma/client";
import prisma from "../../config/prisma";

export const getAdminAnalyticsService = async () => {
  // ১. ওভারভিউ কার্ডের জন্য টোটাল ডাটা (ইউজার, খাবার এবং অর্ডারের সংখ্যা)
  const [totalUsers, totalFoods, totalOrders] = await Promise.all([
    prisma.user.count(),
    prisma.food.count(),
    prisma.order.count(),
  ]);

  // ২. টোটাল রেভিনিউ (শুধুমাত্র ডেলিভারড অর্ডার থেকে টাকার পরিমাণ যোগ করা)
  const revenueData = await prisma.order.aggregate({
    where: { status: OrderStatus.DELIVERED },
    _sum: { totalPrice: true },
  });

  // ৩. অর্ডার স্ট্যাটাস অনুযায়ী গ্রুপিং (Pie Chart-এ দেখানোর জন্য: কতটি PENDING, কতটি DELIVERED)
  const orderStatusStats = await prisma.order.groupBy({
    by: ['status'],
    _count: { id: true },
  });

  // ৪. রিসেন্ট ৫টি অর্ডার (ড্যাশবোর্ড টেবিলের জন্য)
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      user: { 
        select: { 
          name: true, 
          email: true 
        } 
      },
      food: { 
        select: { 
          // ⚠️ এখানে 'name' না থাকলে আপনার স্কিমার ফিল্ড (যেমন title) দিন
          title: true, 
          price: true 
        } 
      },
    },
  });

  // ৫. মাসিক রেভিনিউ ডাটা (চার্টের জন্য কাঁচা ডাটা পাঠানো হচ্ছে)
  const monthlyRevenue = await prisma.order.findMany({
    where: { status: OrderStatus.DELIVERED },
    select: { 
      totalPrice: true, 
      createdAt: true 
    },
  });

  return {
    overview: {
      totalUsers,
      totalFoods,
      totalOrders,
      totalRevenue: revenueData._sum.totalPrice || 0,
    },
    orderStatusStats,
    recentOrders,
    monthlyRevenue,
  };
};