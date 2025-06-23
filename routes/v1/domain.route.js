import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import {
  addDomain,
  getDomains,
  getDomain,
  editDomain,
  deleteDomain,
  updateDomainStatus,
  assignDesignToDomain,
} from '../../controllers/domain.controller.js';
import {
  addDomainSchema,
  assignDesignParamsSchema,
  getDomainsQuerySchema,
  paramIdSchema,
  updateDomainSchema,
  updateStatusSchema,
} from '../../validations/domain-request.schema.js';

const router = express.Router();
const { validate } = new Validator();

/**
 * @openapi
 * components:
 *   schemas:
 *     Domain:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           description: The domain name.
 *           example: example.com
 *         user_id:
 *           type: integer
 *           nullable: true
 *           example: 101
 *         influencer_id:
 *           type: integer
 *           nullable: true
 *           example: 202
 *         description:
 *           type: string
 *           nullable: true
 *           example: This is a sample domain.
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           example: active
 *         is_personal_domain:
 *           type: boolean
 *           example: false
 *         visits:
 *           type: integer
 *           example: 10
 *         ns_servers:
 *           type: array
 *           items:
 *             type: string
 *           example: ["ns1.domain.com", "ns2.domain.com"]
 *         login:
 *           type: string
 *           example: werean
 *         logs_count:
 *           type: integer
 *           example: 5
 *         design_name:
 *           type: string
 *           example: Miku
 *         is_visible:
 *           type: boolean
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     CreateDomainRequest:
 *       allOf:
 *         - $ref: '#/components/schemas/Domain'
 *
 *     CreateDomainSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         body:
 *           $ref: '#/components/schemas/Domain'
 *
 *     DomainListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         body:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Domain'
 */

/**
 * @openapi
 * /v1/domains:
 *   post:
 *     tags:
 *       - Domain
 *     description: Endpoint to create/add a new domain
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDomainRequest'
 *     responses:
 *       201:
 *         description: Created domain details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateDomainSuccess'
 *
 *   get:
 *     tags:
 *       - Domain
 *     description: Retrieve all domains (filterable by search and status)
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Partial domain name search
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *         required: false
 *         description: Filter domains by active/inactive status
 *     responses:
 *       200:
 *         description: A list of domains
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DomainListResponse'
 */

/**
 * @openapi
 * /v1/domains/{domainId}:
 *   get:
 *     tags:
 *       - Domain
 *     description: Retrieve domain by ID
 *     parameters:
 *       - in: path
 *         name: domainId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the domain to get
 *     responses:
 *       200:
 *         description: Domain details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateDomainSuccess'
 *       404:
 *         description: Domain not found
 *
 *   put:
 *     tags:
 *       - Domain
 *     description: Edit an existing domain by ID
 *     parameters:
 *       - in: path
 *         name: domainId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDomainRequest'
 *     responses:
 *       200:
 *         description: Updated domain object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateDomainSuccess'
 *
 *   patch:
 *     tags:
 *       - Domain
 *     summary: Update domain status active / inactive
 *     description: Update only the domain status
 *     parameters:
 *       - in: path
 *         name: domainId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Domain status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateDomainSuccess'
 *
 *   delete:
 *     tags:
 *       - Domain
 *     description: Soft-delete domain by ID
 *     parameters:
 *       - in: path
 *         name: domainId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the domain to delete
 *     responses:
 *       200:
 *         description: Domain deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Domain not found
 */

/**
 * @openapi
 * /v1/domains/{domainId}/assign-design/{designId}:
 *   patch:
 *     tags:
 *       - Domain
 *     summary: Assign a design to a domain
 *     description: Assign a specific design to a domain by providing both domain and design IDs.
 *     parameters:
 *       - name: domainId
 *         in: path
 *         required: true
 *         description: ID of the domain to which the design will be assigned
 *         schema:
 *           type: integer
 *       - name: designId
 *         in: path
 *         required: true
 *         description: ID of the design to assign to the domain
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Design successfully assigned to domain
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
 *                   description: Updated domain object
 *       400:
 *         description: Bad request – invalid domain or design ID
 *       404:
 *         description: Domain or Design not found
 */

// Route: /domains/
router
  .route('/')
  .post(validate({ body: addDomainSchema }), addDomain)
  .get(validate({ query: getDomainsQuerySchema }), getDomains);

// Route: /domains/:domainId
router
  .route('/:domainId')
  .get(validate({ params: paramIdSchema }), getDomain)
  .delete(validate({ params: paramIdSchema }), deleteDomain)
  .put(
    validate({ params: paramIdSchema, body: updateDomainSchema }),
    editDomain,
  )
  .patch(
    validate({ params: paramIdSchema, body: updateStatusSchema }),
    updateDomainStatus,
  );

// Route: /domains/:domainId/assign-design/:designId
router
  .route('/:domainId/assign-design/:designId')
  .patch(validate({ params: assignDesignParamsSchema }), assignDesignToDomain);

export default router;
