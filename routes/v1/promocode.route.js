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

/**
 * @openapi
 * components:
 *   schemas:
 *     PromoCode:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         code:
 *           type: string
 *           example: SUMMER2025
 *         domain_name:
 *           type: string
 *           example: example.com
 *         user_id:
 *           type: integer
 *           example: 101
 *         active:
 *           type: boolean
 *           example: true
 *         visits:
 *           type: integer
 *           example: 15
 *         earnings:
 *           type: number
 *           format: float
 *           example: 200.50
 *         login:
 *           type: string
 *           example: werean
 *         logs_count:
 *           type: number
 *           format: float
 *           example: 3
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     CreatePromoCodeRequest:
 *       type: object
 *       required:
 *         - code
 *         - domain_name
 *         - user_id
 *       properties:
 *         code:
 *           type: string
 *           example: SPRING2025
 *         domain_name:
 *           type: string
 *           example: example.com
 *         user_id:
 *           type: integer
 *           example: 102
 *
 *     PromoCodeResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         body:
 *           $ref: '#/components/schemas/PromoCode'
 *
 *     PromoCodeListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         body:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PromoCode'
 */

/**
 * @openapi
 * /v1/promocode:
 *   post:
 *     tags:
 *       - PromoCode
 *     description: Create a new promocode
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePromoCodeRequest'
 *     responses:
 *       201:
 *         description: Promo code created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromoCodeResponse'
 *       400:
 *         description: Invalid user_id or domain_name
 *       409:
 *         description: Promo code already exists for the given domain
 *
 *   get:
 *     tags:
 *       - PromoCode
 *     description: Retrieve all promo codes
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by code or domain name
 *       - in: query
 *         name: active
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         required: false
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: List of all promo codes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromoCodeListResponse'
 */

/**
 * @openapi
 * /v1/promocode/{promocodeId}:
 *   get:
 *     tags:
 *       - PromoCode
 *     description: Retrieve a single promocode by ID
 *     parameters:
 *       - in: path
 *         name: promocodeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the promocode
 *     responses:
 *       200:
 *         description: Promo code details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromoCodeResponse'
 *       404:
 *         description: Promo code not found
 *
 *   put:
 *     tags:
 *       - PromoCode
 *     description: Update an existing promocode
 *     parameters:
 *       - in: path
 *         name: promocodeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the promocode
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePromoCodeRequest'
 *     responses:
 *       200:
 *         description: Promo code updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromoCodeResponse'
 *       400:
 *         description: Invalid domain or duplicate code/domain combo
 *       404:
 *         description: Promo code not found
 *
 *   patch:
 *     tags:
 *       - PromoCode
 *     summary: Update promocode active / inactive
 *     description: Update the active status of a promo code
 *     parameters:
 *       - in: path
 *         name: promocodeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the promocode
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - active
 *             properties:
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Promo code status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromoCodeResponse'
 *       404:
 *         description: Promo code not found
 *
 *   delete:
 *     tags:
 *       - PromoCode
 *     description: Delete a promocode by ID
 *     parameters:
 *       - in: path
 *         name: promocodeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the promocode
 *     responses:
 *       200:
 *         description: Promo code deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Promo code not found
 */

/**
 * @openapi
 * /v1/promocode/{promocodeId}/reassign-worker/{user_id}:
 *   patch:
 *     tags:
 *       - PromoCode
 *     summary: Reassign a worker to a promocode
 *     description: Assign a specific worker to a promocode by providing both promocode and worker IDs.
 *     parameters:
 *       - name: promocodeId
 *         in: path
 *         required: true
 *         description: ID of the promocode to which the worker will be assigned
 *         schema:
 *           type: integer
 *       - name: user_id
 *         in: path
 *         required: true
 *         description: ID of the worker to assign to the promocode
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Worker successfully assigned to promocode
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 body:
 *                   type: object
 *                   description: Updated promocode object
 *       400:
 *         description: Bad request – invalid promocode or worker ID
 *       404:
 *         description: Promocode or Worker not found
 */

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
