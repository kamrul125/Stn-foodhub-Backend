import { Request, Response, NextFunction } from "express";

const roleMiddleware = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // ✅ role check
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden access",
      });
    }

    next();
  };
};

export default roleMiddleware;