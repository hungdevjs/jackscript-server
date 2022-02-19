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

export const updateAvatar = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const { avatarPublicId } = req.body;

    await service.updateAvatar(id, { avatarPublicId });
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const { password, newPassword } = req.body;

    await service.changePassword(id, { password, newPassword });
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const search = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const { searchString } = req.query;

    const data = await service.search(id, searchString as string);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const generateUpdateAvatarSignature = async (req: Request, res: Response) => {
  try {
    const { id } = req;

    const data = await service.generateUpdateAvatarSignature(id);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
