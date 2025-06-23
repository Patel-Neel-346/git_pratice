import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import {
  addPromocode,
  getPromocodes,
  getPromocode,
  deletePromocode,
  editPromocode,
  updatePromocodeStatus,
  reassignToAnotherWorker,
} from '../../controllers/promocode.controller.js';
import {
  addPromocodeSchema,
  getPromocodesQuerySchema,
  paramPromocodeIdSchema,
  reassignPromocodeSchema,
  updatePromocodeSchema,
  updateStatusSchema,
} from '../../validations/promocode-request.schema.js';

const router = express.Router();
const { validate } = new Validator();


router
  .route('/')
  .post(validate({ body: addPromocodeSchema }), addPromocode)
  .get(validate({ query: getPromocodesQuerySchema }), getPromocodes);

// GET /promocodes/:promocodeId - Get one promocode
// PUT /promocodes/:promocodeId - Replace promocode data
// DELETE /promocodes/:promocodeId - Remove promocode
// PATCH /promocodes/:promocodeId - Only update "active" status
router
  .route('/:promocodeId')
  .get(validate({ params: paramPromocodeIdSchema }), getPromocode)
  .put(
    validate({
      params: paramPromocodeIdSchema,
      body: updatePromocodeSchema,
    }),
    editPromocode,
  )
  .delete(validate({ params: paramPromocodeIdSchema }), deletePromocode)
  .patch(
    validate({
      params: paramPromocodeIdSchema,
      body: updateStatusSchema,
    }),
    updatePromocodeStatus,
  );

// PATCH /promocodes/:promocodeId/reassign-worker/:user_id - Reassign to another user
router
  .route('/:promocodeId/reassign-worker/:user_id')
  .patch(
    validate({ params: reassignPromocodeSchema }),
    reassignToAnotherWorker,
  );

export default router;
