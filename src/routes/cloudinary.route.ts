import express from "express";
import * as controller from "../controllers/cloudinary.controller";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", auth, controller.getSignature);

export default router;
