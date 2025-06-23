// Regex for validating full domain names like "example.com", "sub.example.co.uk"
const domainNameRegex =
  '^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\\.(?!-)[A-Za-z0-9-]{1,63})*\\.[A-Za-z]{2,}$';

// Regex for flexible search input: plain text, domain, or URL-style
const searchPattern =
  '^(https?:\\/\\/)?(www\\.)?([a-zA-Z0-9-]+\\.)*([a-zA-Z0-9-]+)(\\.[a-zA-Z]{2,})?$';

// Required for all :domainId routes
const paramIdSchema = {
  type: 'object',
  properties: {
    domainId: {
      type: 'string',
      pattern: '^[0-9]+$',
    },
  },
  required: ['domainId'],
  additionalProperties: false,
};

// Used for assigning a design
const assignDesignParamsSchema = {
  type: 'object',
  properties: {
    domainId: {
      type: 'string',
      pattern: '^[0-9]+$',
    },
    designId: {
      type: 'string',
      pattern: '^[0-9]+$',
    },
  },
  required: ['domainId', 'designId'],
  additionalProperties: false,
};

// POST /domains
const addDomainSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      pattern: domainNameRegex,
    },
    user_id: { type: 'number' },
    influencer_id: { type: 'number' },
    description: { type: 'string' },
    status: { type: 'string', enum: ['active', 'inactive'] },
    is_personal_domain: { type: 'boolean' },
    visits: { type: 'number' },
    ns_servers: {
      type: 'array',
      items: {
        type: 'string',
        pattern: domainNameRegex,
      },
    },
    login: { type: 'string' },
    logs_count: { type: 'number' },
    design_id: { type: 'number' },
    is_visible: { type: 'boolean' },
  },
  required: ['name'],
  additionalProperties: false,
};

// PUT /domains/:domainId
const updateDomainSchema = {
  type: 'object',
  properties: {
    user_id: { type: 'number' },
    influencer_id: { type: 'number' },
    design_id: { type: 'number' },
  },
  required: ['user_id', 'influencer_id', 'design_id'],
  additionalProperties: false,
};

// PATCH /domains/:domainId/status
const updateStatusSchema = {
  type: 'object',
  properties: {
    status: { type: 'string', enum: ['active', 'inactive'] },
  },
  required: ['status'],
  additionalProperties: false,
};

// GET /domains?search=&status=
const getDomainsQuerySchema = {
  type: 'object',
  properties: {
    search: {
      type: 'string',
      pattern: searchPattern,
    },
    status: {
      type: 'string',
      enum: ['active', 'inactive'],
    },
  },
  required: [],
  additionalProperties: false,
};

export {
  addDomainSchema,
  updateDomainSchema,
  updateStatusSchema,
  paramIdSchema,
  getDomainsQuerySchema,
  assignDesignParamsSchema,
};
