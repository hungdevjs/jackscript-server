import express from "express";
import * as controller from "../controllers/course.controller";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", controller.get);
router.get("/:id", controller.getById);
router.post("/:id", auth, controller.start);
router.get("/:courseId/lessons/:id", auth, controller.getLesson);

export default router;
