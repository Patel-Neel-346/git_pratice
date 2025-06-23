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
