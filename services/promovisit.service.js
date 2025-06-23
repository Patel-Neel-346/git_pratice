/**
 * PromoVisit service which serves DB operations
 * required by the PromoVisit controller
 */
import db from "../models/index.js";

const { PromoVisit, PromoCode, Domain } = db.db;

/**
 * Add a new promo visit
 *
 * @param {object} data - Data to create a promo visit
 * @returns {Promise<object>} - Created PromoVisit instance
 */
const create = async (data) => {
  // Create and return the new promo visit
  const promoVisit = await PromoVisit.create(data);
  return promoVisit;
};

/**
 * Get all promo visits for a specific promo code ID
 *
 * @param {number} promoCodeId - The promo_code_id to search for
 * @returns {Promise<Array>} - List of PromoVisit entries
 */
const findAllByPromoCodeId = async (promocodeId) => {
  return await PromoVisit.findAll({
    where: { promo_code_id: promocodeId },
    include: [
      {
        model: PromoCode,
        as: "promoCode",
      },
      {
        model: Domain,
        as: "domain",
      },
    ],
  });
};

export { create, findAllByPromoCodeId };
