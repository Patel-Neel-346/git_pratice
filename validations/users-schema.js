// ISO 8601 or YYYY-MM-DD HH:MM:SS date pattern
const isoOrDatePattern =
  '^\\d{4}-\\d{2}-\\d{2}([T\\s]\\d{2}:\\d{2}:\\d{2}(\\.\\d{1,3})?Z?)?$';

// Optional: regex for validating percentage strings like "75%" or "50.5%"
const percentagePattern = '^\\d{1,3}(\\.\\d{1,2})?%$';

// Optional: stricter username pattern
const usernamePattern = '^[a-zA-Z0-9_.-]{3,50}$';

/**
 * Schema for adding a new system-level user
 */
const addUserSchema = {
  type: 'object',
  properties: {
    user_id: { type: 'number' },
    username: {
      type: 'string',
      pattern: usernamePattern,
    },
    user_role: {
      type: 'string',
      enum: ['user', 'admin', 'moderator', 'owner'],
    },
    progress: {
      type: 'string',
      pattern: percentagePattern, // Optional
    },
    balance: {
      type: 'number',
      minimum: 0,
    },
    logs: {
      type: 'number',
      minimum: 0,
    },
    sales: {
      type: 'number',
      minimum: 0,
    },
    hold: {
      type: 'number',
      minimum: 0,
    },
    invited_by: { type: 'number' },
    allowed_domains_count: {
      type: 'number',
      minimum: 0,
    },
    status: {
      type: 'string',
      enum: ['new', 'work', 'ban'],
    },
    owner_panel: { type: 'string' },
    hold_until: {
      type: 'string',
      pattern: isoOrDatePattern,
    },
    last_activity: {
      type: 'string',
      pattern: isoOrDatePattern,
    },
  },
  required: ['user_id'],
  additionalProperties: false,
};

/**
 * Schema for editing an existing user
 */
const editUserSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      pattern: usernamePattern,
    },
    user_role: {
      type: 'string',
      enum: ['user', 'admin', 'moderator', 'owner'],
    },
    progress: {
      type: 'string',
      pattern: percentagePattern,
    },
    balance: {
      type: 'number',
      minimum: 0,
    },
    logs: {
      type: 'number',
      minimum: 0,
    },
    sales: {
      type: 'number',
      minimum: 0,
    },
    hold: {
      type: 'number',
      minimum: 0,
    },
    invited_by: { type: 'number' },
    allowed_domains_count: {
      type: 'number',
      minimum: 0,
    },
    status: {
      type: 'string',
      enum: ['new', 'work', 'ban'],
    },
    owner_panel: { type: 'string' },
    hold_until: {
      type: 'string',
      pattern: isoOrDatePattern,
    },
    last_activity: {
      type: 'string',
      pattern: isoOrDatePattern,
    },
  },
  additionalProperties: false,
};

/**
 * Schema for route param validation: /users/:userId
 */
const userIdParamSchema = {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
      pattern: '^[0-9]+$',
    },
  },
  required: ['userId'],
  additionalProperties: false,
};

/**
 * Schema for search query validation
 */
const userNameSearchValidation = {
  type: 'object',
  properties: {
    search: {
      type: 'string',
      pattern: '^[a-zA-Z0-9_.\\s]{2,50}$',
    },
    status: {
      type: 'string',
      enum: ['new', 'work', 'ban'],
    },
  },
  additionalProperties: false,
};

export {
  addUserSchema,
  editUserSchema,
  userIdParamSchema,
  userNameSearchValidation,
};
