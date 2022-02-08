import { Router } from "express";

import accountRoute from "./account.route";
import tipRoute from "./tip.route";

const router = Router();

router.use("/v1/account", accountRoute);
router.use("/v1/tip", tipRoute);

export default router;
