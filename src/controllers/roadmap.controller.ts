import { Request, Response } from "express";

import * as service from "../services/roadmap.service";

export const get = async (req: Request, res: Response) => {
  try {
    const data = await service.get();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
