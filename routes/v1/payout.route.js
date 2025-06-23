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
