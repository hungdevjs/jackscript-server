import { Request, Response } from "express";

import * as service from "../services/roadmap.service";

export const getRoadmap = async (req: Request, res: Response) => {
  try {
    const data = await service.getRoadmap();
    res.status(200).send(data);
  } catch (err) {
    res.status(401).send(err.message);
  }
};
