import express from 'express';
import {
  addPayout,
  getPayoutsByUserId,
  // getPayouts,
  // getPayout,
  // editPayout,
  // deletePayout,
} from '../../controllers/payout.controller.js';
import { Validator } from 'express-json-validator-middleware';
import {
  addPayoutSchema,
  getUserPayout,
} from '../../validations/payout-request-validation.schema.js';

const router = express.Router();

const { validate } = new Validator();
/**
 * @openapi
 * components:
 *   schemas:
 *     Payout:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: string
 *           example: "102"
 *         amount:
 *           type: number
 *           format: float
 *           example: 5000
 *         withdraw_amount:
 *           type: number
 *           format: float
 *           example: 1000
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: 2025-06-18T12:00:00Z
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: 2025-06-18T12:00:00Z
 *
 *     CreatePayoutRequest:
 *       type: object
 *       required:
 *         - user_id
 *         - amount
 *       properties:
 *         user_id:
 *           type: string
 *           example: "102"
 *         amount:
 *           type: number
 *           format: float
 *           example: 5000
 *         withdraw_amount:
 *           type: number
 *           format: float
 *           example: 0
 *
 *     PayoutResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         body:
 *           $ref: '#/components/schemas/Payout'
 *
 *     PayoutListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         body:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Payout'
 */

/**
 * @openapi
 * /v1/payouts:
 *   post:
 *     summary: Register a new payout
 *     tags:
 *       - Payouts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePayoutRequest'
 *     responses:
 *       201:
 *         description: Payout created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PayoutResponse'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 *
 * /v1/payouts/{userId}:
 *   get:
 *     summary: Get all payouts by user ID
 *     tags:
 *       - Payouts
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user whose payouts are to be retrieved
 *     responses:
 *       200:
 *         description: List of payouts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PayoutListResponse'
 *       404:
 *         description: User not found
 */

// POST /v1/payouts - Create payout
router.post('/', validate({ body: addPayoutSchema }), addPayout);

// Get payouts by user ID
router.get(
  '/:user_id',
  validate({ params: getUserPayout }),
  getPayoutsByUserId,
);

// // GET /v1/payouts - Get all payouts (optional user_id query)
// router.get("/", getPayouts);

// // GET /v1/payouts/:payoutId - Get single payout by ID
// router.get("/:payoutId", getPayout);

// // PUT /v1/payouts/:payoutId - Update payout by ID
// router.put("/:payoutId", editPayout);

// // DELETE /v1/payouts/:payoutId - Delete payout by ID
// router.delete("/:payoutId", deletePayout);

export default router;
