import { Request, Response } from "express";
import * as service from "../services/account.service";

export const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await service.logIn({ email, password });
    res.status(200).send(data);
  } catch (err) {
    res.status(401).send(err.message);
  }
};
