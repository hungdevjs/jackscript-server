import { Request, Response } from "express";

import * as service from "../services/cloudinary.service";

export const getSignature = (req: Request, res: Response) => {
  try {
    const { folder, eager } = req.query;
    const data = service.generateSignature(folder as string, eager as string);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
