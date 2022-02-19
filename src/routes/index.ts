import { Router } from "express";

import accountRoute from "./account.route";
import tipRoute from "./tip.route";
import roadmapRoute from "./roadmap.route";
import courseRoute from "./course.route";
import faqRoute from "./faq.route";

const router = Router();

router.use("/v1/account", accountRoute);
router.use("/v1/tip", tipRoute);
router.use("/v1/roadmap", roadmapRoute);
router.use("/v1/courses", courseRoute);
router.use("/v1/faq", faqRoute);

export default router;
