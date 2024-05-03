import { NextFunction, Request, Response } from "express";

export function isAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.user?.id) {
    next();
  } else {
    res.status(401).json({ message: "You are not logged in." });
  }
}
