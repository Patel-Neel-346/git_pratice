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
