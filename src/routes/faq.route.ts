import express from "express";
import * as controller from "../controllers/faq.controller";

const router = express.Router();

router.get("/", controller.get);

export default router;
