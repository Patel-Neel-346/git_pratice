import express from "express";
const router = express.Router();
import { Validator } from "express-json-validator-middleware";
import {
  getWeekly,
  getMonthly,
  // exportEarningsAsPDF,
  exportEarnings,
} from "../../controllers/analytics.controller.js";
import {
  exportEarningsSchema,
  queryEarningsSchema,
} from "../../validations/analytics-request-validation.schema.js";

const { validate } = new Validator();


router.get(
  "/earnings/weekly",
  validate({ query: queryEarningsSchema }),
  getWeekly
);
router.get(
  "/earnings/monthly",
  validate({ query: queryEarningsSchema }),
  getMonthly
);
router.get(
  "/export/earnings",
  validate({ query: exportEarningsSchema }),
  // exportEarningsAsPDF
  exportEarnings
);
export default router;
