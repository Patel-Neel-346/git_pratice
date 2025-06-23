import express from 'express';
const router = express.Router();
import { Validator } from 'express-json-validator-middleware';
import { withdrawAmountFromPayout } from '../../controllers/payout_history.controller.js';
import { withdrawSchema } from '../../validations/payout-request-validation.schema.js';
const { validate } = new Validator();


router.post(
  '/withdraw',
  validate({ body: withdrawSchema }),
  withdrawAmountFromPayout,
);

export default router;
