import { Router } from "express";

import accountRoute from "./account.route";
import tipRoute from "./tip.route";
import roadmapRoute from "./roadmap.route";

const router = Router();

router.use("/v1/account", accountRoute);
router.use("/v1/tip", tipRoute);
router.use("/v1/roadmap", roadmapRoute);

export default router;
