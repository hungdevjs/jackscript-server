import { Request, Response } from "express";
import * as service from "../services/account.service";
import Errors from "../utils/Errors";

export const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await service.logIn({ email, password });
    res.status(200).send(data);
  } catch (err) {
    res.status(401).send(err.message);
  }
};

export const getInfo = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error(Errors.BadCredential);

    const result = await service.getInfo(token);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const { name } = req.body;

    await service.updateProfile(id, { name });
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
