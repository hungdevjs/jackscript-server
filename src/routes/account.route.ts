import express from "express";
import * as controller from "../controllers/account.controller";

const router = express.Router();

router.post("/logIn", controller.logIn);

export default router;
