const datePatternDash =
  "^(19|20)\\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$"; // YYYY-MM-DD
const datePatternSlash =
  "^(19|20)\\d{2}/(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])$"; // YYYY/MM/DD

const queryEarningsSchema = {
  type: "object",
  properties: {
    from: {
      anyOf: [
        { type: "string", pattern: datePatternDash },
        { type: "string", pattern: datePatternSlash },
      ],
    },
    to: {
      anyOf: [
        { type: "string", pattern: datePatternDash },
        { type: "string", pattern: datePatternSlash },
      ],
    },
    user_id: {
      type: "string",
      pattern: "^[0-9]+$",
    },
  },
  required: ["from", "to", "user_id"],
  additionalProperties: false,
};

// const exportEarningsSchema = {
//   type: 'object',
//   properties: {
//     userId: {
//       type: 'string',
//       pattern: '^[0-9]+$',
//     },
//   },
//   required: ['userId'],
//   additionalProperties: false,
// };

const exportEarningsSchema = {
  type: "object",
  properties: {
    userId: {
      type: "string",
      pattern: "^[0-9]+$",
    },
    format: {
      type: "string",
      enum: ["pdf", "csv", "xlsx"],
    },
  },
  required: ["userId"],
  additionalProperties: false,
};

export { queryEarningsSchema, exportEarningsSchema };
