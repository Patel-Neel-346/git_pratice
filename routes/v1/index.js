import express from "express";

import usersRoute from "./user.route.js";
import userRoute from "./users.route.js";
import domainRoute from "./domain.route.js";
import promocodeRoute from "./promocode.route.js";
import domainDesignRoute from "./domaindesign.route.js";
import promoVisitRoute from "./promovisit.route.js";
import payoutRoutes from "./payout.route.js";
import payoutHistoryRoutes from "./payout_history.route.js";
import analyticsRoutes from "./analytics.route.js";

const router = express.Router();

// router.use("/users", usersRoute);
router.use("/domains", domainRoute);
router.use("/promocode", promocodeRoute);
router.use("/user", userRoute);
router.use("/designs", domainDesignRoute);
router.use("/promovisit", promoVisitRoute);
router.use("/payouts", payoutRoutes);
router.use("/payout_history", payoutHistoryRoutes);
router.use("/analytics", analyticsRoutes);

export default router;
