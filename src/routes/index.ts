import { Router } from "express";

import accountRoute from "./account.route";

const router = Router();

router.use("/v1/account", accountRoute);

export default router;
