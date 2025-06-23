const addPayoutSchema = {
  type: 'object',
  properties: {
    amount: {
      type: 'integer',
      minimum: 1,
    },
    withdraw_amount: {
      type: 'integer',
      minimum: 0,
    },
    user_id: {
      type: 'string',
      pattern: '^[0-9]+$',
    },
  },
  required: ['amount', 'user_id'],
  additionalProperties: false,
};

const getUserPayout = {
  type: 'object',
  properties: {
    user_id: {
      type: 'string',
      pattern: '^[0-9]+$',
    },
  },
  required: ['user_id'],
  additionalProperties: false,
};
const withdrawSchema = {
  type: 'object',
  properties: {
    payout_id: {
      type: 'integer',
      minimum: 1,
    },
    amount: {
      type: 'number',
      minimum: 0.01, // assuming amount must be positive
    },
    user_id: {
      type: 'string',
      pattern: '^[0-9]+$',
    },
  },
  required: ['payout_id', 'amount', 'user_id'],
  additionalProperties: false,
};

export { addPayoutSchema, getUserPayout, withdrawSchema };
