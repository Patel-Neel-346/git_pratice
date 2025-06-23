/**
 * Payout service for handling DB operations related to payouts
 */
import db from "../models/index.js";
import * as errors from "../utils/api-error.js";
const { Payout, User } = db.db;

/**
 * Create a new payout entry
 *
 * @param {object} data - payout data
 * @returns {Promise<object>} Created payout
 */

/**
 * @constant {NotFoundError} NotFoundError - not found error object
 */
const { NotFoundError } = errors.default;

const create = async (data) => {
  const { user_id } = data;

  const user = await User.findOne({ where: { user_id } });
  if (!user) {
    throw new NotFoundError("Invalid user_id");
  }

  const payout = await Payout.create(data);
  return payout;
};

/**
 * Get all payouts with optional user filter
 *
 * @param {number} user_id - optional user ID filter
 * @returns {Promise<Array>} Array of payouts
 */
const findAll = async (user_id = null) => {
  const whereClause = {};
  if (user_id) {
    whereClause.user_id = user_id;
  }

  return Payout.findAll({
    where: whereClause,
    order: [["created_at", "DESC"]],
  });
};

/**
 * Get a payout by ID
 *
 * @param {number} id - Payout ID
 * @returns {Promise<object|null>} Payout object or null
 */
const findById = async (id) => {
  return Payout.findOne({
    where: { id },
  });
};

/**
 * Edit payout by ID
 *
 * @param {number} id - Payout ID
 * @param {object} data - New data
 * @returns {Promise<object>} Updated payout
 */
const editById = async (id, data) => {
  await Payout.update(data, { where: { id } });
  return await findById(id);
};

/**
 * Delete payout by ID
 *
 * @param {number} id - Payout ID
 * @returns {Promise<number>} Number of rows deleted
 */
const deleteById = async (id) => {
  return Payout.destroy({ where: { id } });
};

export { create, findAll, findById, editById, deleteById };
