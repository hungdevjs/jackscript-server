import express from "express";
import * as controller from "../controllers/course.controller";

const router = express.Router();

router.get("/", controller.get);
router.get("/:id", controller.getById);

export default router;
