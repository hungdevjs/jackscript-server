import { Request, Response } from "express";

import * as service from "../services/tip.service";

export const get = async (req: Request, res: Response) => {
  try {
    const data = await service.get();
    res.status(200).send(data);
  } catch (err) {
    res.status(401).send(err.message);
  }
};
