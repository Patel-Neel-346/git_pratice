// Pattern: allows alphanumeric, dashes, underscores, and spaces (1-50 chars)
const namePattern = '^[a-zA-Z0-9 _.-]{1,50}$';

// Pattern: for search-friendly terms (letters/numbers/spaces/dashes)
const searchPattern = '^[a-zA-Z0-9 _.-]{1,50}$';

/**
 * Param validation for /:designId
 */
const paramDesignIdSchema = {
  type: 'object',
  properties: {
    designId: {
      type: 'string',
      pattern: '^[0-9]+$', // INTEGER ID
    },
  },
  required: ['designId'],
  additionalProperties: false,
};

/**
 * POST /domain-designs
 */
const addDomainDesignSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      pattern: namePattern,
    },
    description: {
      type: 'string',
      maxLength: 1000, // optional constraint
    },
    is_active: {
      type: 'boolean',
    },
    created_by: {
      type: 'number',
      minimum: 1,
    },
  },
  required: ['name'],
  additionalProperties: false,
};

/**
 * GET /domain-designs?search=&is_active=
 */
const queryDesignSchema = {
  type: 'object',
  properties: {
    search: {
      type: 'string',
      pattern: searchPattern,
    },
    is_active: {
      type: 'boolean',
    },
  },
  additionalProperties: false,
};

/**
 * PUT /domain-designs/:designId
 */
const updateDomainDesignSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      pattern: namePattern,
    },
    description: {
      type: 'string',
      maxLength: 1000,
    },
    is_active: {
      type: 'boolean',
    },
    created_by: {
      type: 'number',
      minimum: 1,
    },
  },
  additionalProperties: false,
};

export {
  addDomainDesignSchema,
  queryDesignSchema,
  updateDomainDesignSchema,
  paramDesignIdSchema,
};
