import express from 'express';
const router = express.Router();
import { Validator } from 'express-json-validator-middleware';
import { withdrawAmountFromPayout } from '../../controllers/payout_history.controller.js';
import { withdrawSchema } from '../../validations/payout-request-validation.schema.js';
const { validate } = new Validator();

/**
 * @openapi
 * components:
 *   schemas:
 *     WithdrawPayoutRequest:
 *       type: object
 *       required:
 *         - payout_id
 *         - amount
 *         - user_id
 *       properties:
 *         payout_id:
 *           type: integer
 *           example: 2
 *         amount:
 *           type: number
 *           format: float
 *           example: 500
 *         user_id:
 *           type: integer
 *           example: 101
 *
 *     WithdrawPayoutResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         body:
 *           type: object
 *           properties:
 *             payout:
 *               type: object
 *               description: Updated payout record
 *             payoutHistory:
 *               type: object
 *               description: New payout history entry
 */

/**
 * @openapi
 * /v1/payout_history/withdraw:
 *   post:
 *     summary: Withdraw amount from payout
 *     tags:
 *       - Payout History
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WithdrawPayoutRequest'
 *     responses:
 *       201:
 *         description: Withdrawal successful and history recorded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WithdrawPayoutResponse'
 *       400:
 *         description: Bad request (e.g., insufficient balance or invalid input)
 *       404:
 *         description: Payout or User not found
 */

router.post(
  '/withdraw',
  validate({ body: withdrawSchema }),
  withdrawAmountFromPayout,
);

export default router;
