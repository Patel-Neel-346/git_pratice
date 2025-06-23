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

/**
 * @openapi
 * components:
 *   schemas:
 *     PromoVisit:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         promo_code_id:
 *           type: integer
 *           example: 101
 *         domain_name:
 *           type: string
 *           example: "example.com"
 *         ip_address:
 *           type: string
 *           example: "192.168.1.1"
 *         country_code:
 *           type: string
 *           example: "IN"
 *         city:
 *           type: string
 *           example: "Delhi"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     CreatePromoVisitRequest:
 *       type: object
 *       required:
 *         - promo_code_id
 *         - domain_name
 *       properties:
 *         promo_code_id:
 *           type: integer
 *           example: 101
 *         domain_name:
 *           type: string
 *           example: "example.com"
 *         ip_address:
 *           type: string
 *           example: "192.168.1.1"
 *         country_code:
 *           type: string
 *           example: "IN"
 *         city:
 *           type: string
 *           example: "Delhi"
 *
 *     CreatePromoVisitSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         body:
 *           $ref: '#/components/schemas/PromoVisit'
 *
 *     PromoVisitListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         body:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PromoVisit'
 */

/**
 * @openapi
 * /v1/promovisit:
 *   post:
 *     tags:
 *       - PromoVisit
 *     summary: Add a new promo visit
 *     description: Endpoint to log a new promo visit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePromoVisitRequest'
 *     responses:
 *       201:
 *         description: Promo visit successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreatePromoVisitSuccess'
 *       404:
 *         description: Promocode or Domain not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /v1/promovisit/by-promocode/{promocodeId}:
 *   get:
 *     tags:
 *       - PromoVisit
 *     summary: Get promo visits by promocode ID
 *     description: Fetch all promo visits associated with a particular promocode
 *     parameters:
 *       - in: path
 *         name: promocodeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the promocode
 *     responses:
 *       200:
 *         description: List of promo visits
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromoVisitListResponse'
 *       500:
 *         description: Internal Server Error
 */

router.route('/').post(validate({ body: addPromoVisitSchema }), addPromoVisit);

router
  .route('/by-promocode/:promocodeId')
  .get(validate({ params: paramPromoCodeIdSchema }), getPromoVisitsByPromoCode);
export default router;
