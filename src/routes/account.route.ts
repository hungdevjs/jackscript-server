import express from "express";
import * as controller from "../controllers/account.controller";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/logIn", controller.logIn);
router.get("/me", auth, controller.getInfo);
router.post("/me", auth, controller.updateProfile);

export default router;
