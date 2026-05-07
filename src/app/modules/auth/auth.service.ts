import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import prisma from "../../config/prisma";
import AppError from "../../errors/AppError";
import { IAuthUser, ILoginUser } from "./auth.interface";

// ইউজার রেজিস্ট্রেশন সার্ভিস
const registerUserService = async (payload: IAuthUser) => {
  // ১. ইউজার আগে থেকেই আছে কি না চেক করা
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new AppError(400, "User already exists with this email");
  }

  // ২. পাসওয়ার্ড হ্যাশ করা
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  // ৩. ডাটাবেজে ইউজার তৈরি করা
  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return user;
};

// ইউজার লগইন সার্ভিস
const loginUserService = async (payload: ILoginUser) => {
  // ১. ইউজার খুঁজে বের করা
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  // ২. পাসওয়ার্ড চেক করা
  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatched) {
    throw new AppError(401, "Invalid credentials");
  }

  // ৩. টোকেন তৈরি করা (টাইপ কাস্টিং সমস্যা এড়াতে সরাসরি ভ্যালু দেওয়া হয়েছে)
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    config.jwt_access_secret as string,
    { expiresIn: "7d" } // অথবা config থেকে আনলে (config as any).jwt_access_expires_in
  );

  // ৪. রেসপন্স থেকে পাসওয়ার্ড বাদ দেওয়া (ম্যানুয়ালি অবজেক্ট তৈরি করা হয়েছে যেন এরর না দেয়)
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  return {
    token,
    user: userData,
  };
};

export const AuthService = {
  registerUserService,
  loginUserService,
};