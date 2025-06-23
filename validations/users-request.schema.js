// Schema for creating a new user
const addUserSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', minLength: 1 },
    lastName: { type: 'string', minLength: 1 },
    gender: {
      type: 'string',
      enum: ['Male', 'Female', 'Other'],
    },
    skills: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 1 },
          proficiency: {
            type: 'string',
            enum: ['Beginner', 'Intermediate', 'Advanced'], // fixed typo
          },
        },
        required: ['name', 'proficiency'],
        additionalProperties: false,
      },
    },
    username: { type: 'string', maxLength: 250 },
    user_role: { type: 'string', enum: ['worker', 'admin', 'user'] },
    status: { type: 'string', enum: ['new', 'work', 'ban'] },
    invited_by: {
      type: 'integer',
      minimum: 1,
    },
  },
  required: ['firstName', 'lastName', 'gender'],
  additionalProperties: false,
};

// Schema for validating :userId param
const getUserParamSchema = {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
      pattern: '^[0-9]+$', // assuming numeric string IDs
    },
  },
  required: ['userId'],
  additionalProperties: false,
};

// Schema for updating a user (PATCH /user/:id)
const updateUserSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', minLength: 1 },
    lastName: { type: 'string', minLength: 1 },
    gender: {
      type: 'string',
      enum: ['Male', 'Female', 'Other'],
    },
    username: { type: 'string', maxLength: 250 },
    user_role: { type: 'string', enum: ['worker', 'admin', 'user'] },
    progress: { type: 'string', pattern: '^\\d{1,3}(\\.\\d{1,2})?%$' }, // e.g., "40.0%"
    balance: { type: 'number', minimum: 0 },
    logs: { type: 'integer', minimum: 0 },
    sales: { type: 'number', minimum: 0 },
    hold: { type: 'number', minimum: 0 },
    status: { type: 'string', enum: ['new', 'work', 'ban'] },
    invited_by: { type: 'integer', minimum: 1 },
    allowed_domains_count: { type: 'integer', minimum: 0 },
    owner_panel: { type: 'string', maxLength: 250 },
    hold_until: {
      type: 'string',
      format: 'date-time',
    },
    last_activity: {
      type: 'string',
      format: 'date-time',
    },
  },
  additionalProperties: false,
  anyOf: [
    { required: ['firstName'] },
    { required: ['lastName'] },
    { required: ['gender'] },
    { required: ['username'] },
    { required: ['user_role'] },
    { required: ['progress'] },
    { required: ['balance'] },
    { required: ['logs'] },
    { required: ['sales'] },
    { required: ['hold'] },
    { required: ['status'] },
    { required: ['invited_by'] },
    { required: ['allowed_domains_count'] },
    { required: ['owner_panel'] },
    { required: ['hold_until'] },
    { required: ['last_activity'] },
  ],
};

export { addUserSchema, getUserParamSchema, updateUserSchema };
