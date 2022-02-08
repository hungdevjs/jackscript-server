import { Request, Response } from "express";

import * as service from "../services/tip.service";

export const getTip = async (req: Request, res: Response) => {
  try {
    const data = await service.getTip();
    res.status(200).send(data);
  } catch (err) {
    res.status(401).send(err.message);
  }
};
