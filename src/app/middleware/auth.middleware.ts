import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...requiredRoles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access! No token provided.",
        });
      }

      // Bearer Token split করা
      const accessToken = token.split(" ")[1];

      if (!accessToken) {
        return res.status(401).json({
          success: false,
          message: "Invalid token format! Use Bearer <token>",
        });
      }

      const verifiedUser = jwt.verify(
        accessToken,
        config.jwt_access_secret as string
      ) as JwtPayload;

      const { role } = verifiedUser;

      // 🛡️ রোল চেক: যদি রিকোয়েস্ট করা রাউটে নির্দিষ্ট রোল প্রয়োজন হয়
      if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access! You do not have permission.",
        });
      }

      req.user = verifiedUser;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};

export default auth;