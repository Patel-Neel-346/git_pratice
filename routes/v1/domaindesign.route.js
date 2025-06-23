import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import {
  addDomainDesign,
  getDomainDesigns,
  getDomainDesign,
  editDomainDesign,
  deleteDomainDesign,
} from '../../controllers/domaindesign.controller.js';
import {
  addDomainDesignSchema,
  paramDesignIdSchema,
  queryDesignSchema,
  updateDomainDesignSchema,
} from '../../validations/design-request.schema.js';

const router = express.Router();
const { validate } = new Validator();

/**
 * @openapi
 * components:
 *   schemas:
 *     DomainDesign:
 *       type: object
 *       properties:
 *         design_id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           description: The design name
 *           example: Miku
 *         is_active:
 *           type: boolean
 *           description: Whether the design is active
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     CreateDomainDesignRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Oceanic
 *         is_active:
 *           type: boolean
 *           example: true
 *       required:
 *         - name
 *
 *     CreateDomainDesignSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         body:
 *           $ref: '#/components/schemas/DomainDesign'
 *
 *     DomainDesignListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         body:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DomainDesign'
 */

/**
 * @openapi
 * /v1/designs:
 *   post:
 *     tags:
 *       - DomainDesign
 *     description: Create a new domain design
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDomainDesignRequest'
 *     responses:
 *       201:
 *         description: Created domain design
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateDomainDesignSuccess'
 *
 *   get:
 *     tags:
 *       - DomainDesign
 *     description: Get all domain designs (optional search and status filter)
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search designs by name (case-insensitive)
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         required: false
 *         description: Filter designs by active status
 *     responses:
 *       200:
 *         description: List of domain designs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DomainDesignListResponse'
 */

/**
 * @openapi
 * /v1/designs/{designId}:
 *   get:
 *     tags:
 *       - DomainDesign
 *     description: Get domain design by ID
 *     parameters:
 *       - in: path
 *         name: designId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Domain design details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateDomainDesignSuccess'
 *       404:
 *         description: Domain design not found
 *
 *   put:
 *     tags:
 *       - DomainDesign
 *     description: Update a domain design by ID
 *     parameters:
 *       - in: path
 *         name: designId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDomainDesignRequest'
 *     responses:
 *       200:
 *         description: Updated domain design
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateDomainDesignSuccess'
 *       404:
 *         description: Domain design not found
 *
 *   delete:
 *     tags:
 *       - DomainDesign
 *     description: Delete a domain design by ID
 *     parameters:
 *       - in: path
 *         name: designId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Domain design deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Domain design not found
 */

router
  .route('/')
  .post(validate({ body: addDomainDesignSchema }), addDomainDesign)
  .get(validate({ query: queryDesignSchema }), getDomainDesigns);

router
  .route('/:designId')
  .get(validate({ params: paramDesignIdSchema }), getDomainDesign)
  .delete(validate({ params: paramDesignIdSchema }), deleteDomainDesign)
  .put(
    validate({ params: paramDesignIdSchema, body: updateDomainDesignSchema }),
    editDomainDesign,
  );

export default router;
