import express from "express";
import * as controller from "../controllers/tip.controller";

const router = express.Router();

router.get("/", controller.getTip);

export default router;
