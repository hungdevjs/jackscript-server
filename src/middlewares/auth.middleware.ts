import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import environment from "../utils/environment";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    jwt.verify(token, environment.JWT_ACCESS_TOKEN_SECRET_KEY);

    const userInfo: any = jwt.decode(token);

    req.id = userInfo.id;

    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};
