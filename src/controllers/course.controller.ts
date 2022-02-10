import { Request, Response } from "express";

import * as service from "../services/course.service";

export const get = async (req: Request, res: Response) => {
  try {
    const data = await service.get();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const data = await service.getById(id as string);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
