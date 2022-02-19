import express from "express";
import * as controller from "../controllers/account.controller";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/logIn", controller.logIn);
router.get("/me", auth, controller.getInfo);
router.put("/me", auth, controller.updateProfile);
router.put("/me/avatar", auth, controller.updateAvatar);
router.put("/me/password", auth, controller.changePassword);
router.get("/me/search", auth, controller.search);

export default router;
