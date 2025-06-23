import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import {
  addPromoVisit,
  getPromoVisitsByPromoCode,
} from '../../controllers/promovisit.controller.js';
import {
  addPromoVisitSchema,
  paramPromoCodeIdSchema,
} from '../../validations/promovisit-request.schema.js';

const router = express.Router();
const { validate } = new Validator();
nal Server Error
 */

router.route('/').post(validate({ body: addPromoVisitSchema }), addPromoVisit);

router
  .route('/by-promocode/:promocodeId')
  .get(validate({ params: paramPromoCodeIdSchema }), getPromoVisitsByPromoCode);
export default router;
