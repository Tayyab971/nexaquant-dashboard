import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const userAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized. Please login first",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    if (!decodedToken?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login again.",
      });
    }

    req.userId = decodedToken.id;

    next();
  } catch (err: any) {
    return res.status(401).json({
      success: false,
      message: err.message || "Authentication failed",
    });
  }
};

export default userAuth;
