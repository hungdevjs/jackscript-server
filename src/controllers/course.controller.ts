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
    const { id: userId } = req;
    const { id: courseId } = req.params;
    const data = await service.getById(userId, courseId as string);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const start = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req;
    const { id: courseId } = req.params;
    const data = await service.start(userId, courseId as string);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const getLesson = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req;
    const { id: lessonId } = req.params;
    const data = await service.getLesson(userId, lessonId as string);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
