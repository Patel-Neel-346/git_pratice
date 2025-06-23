// utils/validations/promoVisitSchemas.ts

// Regex Patterns
const isoDateOrDateTimePattern =
  '^\\d{4}-\\d{2}-\\d{2}([T\\s]\\d{2}:\\d{2}:\\d{2}(\\.\\d{1,6})?Z?)?$'; // Allows "YYYY-MM-DD" or full ISO 8601

const ipv4Pattern = '^((25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)(\\.|$)){4}$'; // Matches valid IPv4

const domainPattern = '^[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'; // example.com, my-site.org, sub.domain.io

// POST /promo-visits
const addPromoVisitSchema = {
  type: 'object',
  properties: {
    promo_code_id: {
      type: 'integer',
      minimum: 1,
    },
    domain_name: {
      type: 'string',
      minLength: 3,
      maxLength: 255,
      pattern: domainPattern,
    },
    ip_address: {
      type: 'string',
      pattern: ipv4Pattern,
    },
    country_code: {
      type: 'string',
      pattern: '^[A-Z]{2}$', // ISO country code
    },
    city: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
    },
    visit_time: {
      type: 'string',
      pattern: isoDateOrDateTimePattern, // Allows full datetime or just date
    },
    // user_agent: {
    //   type: 'string',
    //   maxLength: 512,
    // },
  },
  required: ['promo_code_id', 'domain_name', 'ip_address', 'visit_time'],
  additionalProperties: false,
};

// GET /by-promocode/:promocodeId
const paramPromoCodeIdSchema = {
  type: 'object',
  properties: {
    promocodeId: {
      type: 'string',
      pattern: '^[0-9]+$', // numeric string
    },
  },
  required: ['promocodeId'],
  additionalProperties: false,
};

// GET /promo-visits?search=...&from=...&to=...
const queryPromoVisitSchema = {
  type: 'object',
  properties: {
    search: {
      type: 'string',
      maxLength: 100,
      minLength: 2,
      description: 'Search by IP, domain, city, or country code',
    },
    domain_name: {
      type: 'string',
      pattern: domainPattern,
    },
    ip_address: {
      type: 'string',
      pattern: ipv4Pattern,
    },
    country_code: {
      type: 'string',
      pattern: '^[A-Z]{2}$',
    },
    from: {
      type: 'string',
      pattern: isoDateOrDateTimePattern,
    },
    to: {
      type: 'string',
      pattern: isoDateOrDateTimePattern,
    },
  },
  additionalProperties: false,
};

export { addPromoVisitSchema, paramPromoCodeIdSchema, queryPromoVisitSchema };
