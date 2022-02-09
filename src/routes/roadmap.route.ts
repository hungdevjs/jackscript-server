import express from "express";
import * as controller from "../controllers/roadmap.controller";

const router = express.Router();

router.get("/", controller.get);

export default router;
