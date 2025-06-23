// Regex for validating real-world domain names (without protocol)
const domainRegex =
  '^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\\.(?!-)[A-Za-z0-9-]{1,63})*\\.[A-Za-z]{2,}$';

// Regex for flexible search input (supports domain names, URLs, text)
const searchRegex =
  '^(https?:\\/\\/)?(www\\.)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$';

// Regex for promocode (uppercase alphanumeric, dashes/underscores, 4–20 chars)
const promocodeRegex = '^[A-Z0-9_-]{4,20}$';

// Schema to validate body when creating a promocode
const addPromocodeSchema = {
  type: 'object',
  properties: {
    code: {
      type: 'string',
      pattern: promocodeRegex,
      description: 'Uppercase promocode like SAVE20 or XMAS_2025',
    },
    domain_name: {
      type: 'string',
      pattern: domainRegex,
      description: 'e.g., example.com (without protocol)',
    },
    user_id: { type: 'integer', minimum: 1 },
    active: { type: 'boolean' },
    visits: { type: 'integer', minimum: 0 },
    earnings: { type: 'number', minimum: 0, multipleOf: 0.01 },
    login: { type: 'string' },
    logs_count: { type: 'number', minimum: 0, multipleOf: 0.01 },
  },
  required: ['code'],
  additionalProperties: false,
};

// Schema to validate body when updating a promocode (partial update)
const updatePromocodeSchema = {
  type: 'object',
  properties: {
    code: {
      type: 'string',
      pattern: promocodeRegex,
    },
    domain_name: {
      type: 'string',
      pattern: domainRegex,
    },
    active: { type: 'boolean' },
  },
  anyOf: [
    { required: ['code'] },
    { required: ['domain_name'] },
    { required: ['active'] },
  ],
  additionalProperties: false,
};

// Schema to validate promocodeId param
const paramPromocodeIdSchema = {
  type: 'object',
  properties: {
    promocodeId: {
      type: 'string',
      pattern: '^[0-9]+$', // INTEGER ID in string format
    },
  },
  required: ['promocodeId'],
  additionalProperties: false,
};

// Schema for query params used in GET /promocodes
const getPromocodesQuerySchema = {
  type: 'object',
  properties: {
    search: {
      type: 'string',
      pattern: searchRegex,
      description: 'Supports domain name, URL, or search keyword',
    },
    active: { type: 'boolean' },
  },
  required: [],
  additionalProperties: false,
};

// PATCH /:promocodeId - to update active flag only
const updateStatusSchema = {
  type: 'object',
  properties: {
    active: { type: 'boolean' },
  },
  required: ['active'],
  additionalProperties: false,
};

// Schema to reassign a promocode to a user
const reassignPromocodeSchema = {
  type: 'object',
  properties: {
    promocodeId: {
      type: 'string',
      pattern: '^[0-9]+$',
    },
    user_id: {
      type: 'string',
      pattern: '^[0-9]+$',
    },
  },
  required: ['promocodeId', 'user_id'],
  additionalProperties: false,
};

export {
  addPromocodeSchema,
  updatePromocodeSchema,
  paramPromocodeIdSchema,
  updateStatusSchema,
  getPromocodesQuerySchema,
  reassignPromocodeSchema,
};
