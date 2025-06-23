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

/**
 * @openapi
 * components:
 *   schemas:
 *     AnalyticsEarning:
 *       type: object
 *       properties:
 *         week_start:
 *           type: string
 *           format: date-time
 *           example: 2025-06-01T00:00:00.000Z
 *         month_start:
 *           type: string
 *           format: date-time
 *           example: 2025-06-01T00:00:00.000Z
 *         total_earned:
 *           type: number
 *           example: 1500
 *
 *     ExportEarningsPDFResponse:
 *       type: string
 *       format: binary
 */

/**
 * @openapi
 * /v1/analytics/earnings/weekly:
 *   get:
 *     summary: Get weekly earnings for a user
 *     tags:
 *       - Analytics
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         example: 2025-06-01
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         example: 2025-06-30
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         example: 102
 *     responses:
 *       200:
 *         description: Weekly earnings breakdown
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 body:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AnalyticsEarning'
 *       400:
 *         description: Missing required parameters
 */

/**
 * @openapi
 * /v1/analytics/earnings/monthly:
 *   get:
 *     summary: Get monthly earnings for a user
 *     tags:
 *       - Analytics
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         example: 2025-01-01
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         example: 2025-12-31
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         example: 102
 *     responses:
 *       200:
 *         description: Monthly earnings breakdown
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 body:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AnalyticsEarning'
 *       400:
 *         description: Missing required parameters
 */

/**
 * @openapi
 * /v1/analytics/export/earnings:
 *   get:
 *     summary: Export user's total earnings as PDF, CSV, or XLSX
 *     tags:
 *       - Analytics
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         example: 102
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [pdf, csv, xlsx]
 *         required: false
 *         description: Format of the exported file. Defaults to pdf.
 *         example: pdf
 *     responses:
 *       200:
 *         description: File download in selected format
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing or invalid parameters
 *       404:
 *         description: User not found
 */

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
