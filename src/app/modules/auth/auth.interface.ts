import { Role } from "@prisma/client";

/**
 * ইউজার রেজিস্ট্রেশনের জন্য ইন্টারফেস
 */
export interface IAuthUser {
  name: string;
  email: string;
  password: string;
}

/**
 * ইউজার লগইনের জন্য ইন্টারফেস
 */
export interface ILoginUser {
  email: string;
  password: string;
}

/**
 * লগইন করার পর যে ডেটা রিটার্ন করা হবে তার টাইপ
 * এটি সার্ভিস ফাইলে টাইপ সেফটি নিশ্চিত করবে
 */
export interface ILoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
  };
}