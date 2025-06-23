/**
 * User service which serves DB operations
 * required by user controller
 */

import db from "../models/index.js";
import { Op } from "sequelize";

/**
 * @constant {Sequelize.models} - User model extracted from db import
 */
const { User } = db.db;

/**
 * findAll function to retrieve all users in the system
 *
 * @param {string} search - Search keyword for username
 * @param {string} status - Optional status filter
 * @returns {Promise<User[]>} Array of User objects
 */
const findAll = async (search = "", status = undefined) => {
  const whereClause = {};

  if (search) {
    whereClause.username = {
      [Op.iLike]: `%${search}%`, // Case-insensitive partial match
    };
  }

  if (status !== undefined) {
    whereClause.status = status; // status can be: "new", "work", "ban"
  }

  return User.findAll({
    where: whereClause,
  });
};

/**
 * findById function to fetch data for provided userId
 *
 * @param {number} userId - User ID
 * @returns {Promise<Object|null>} User object or null if not found
 */
const findById = async (userId) => {
  return User.findOne({
    where: { user_id: userId },
  });
};

/**
 * create function to add new user
 *
 * @param {object} data - user object to create
 * @returns {Promise<Object>} Created user object
 */
const create = async (data) => {
  const user = await User.create(data);
  return user;
};

/**
 * editById function to update user by ID
 *
 * @param {number} userId - ID of user to update
 * @param {object} data - Updated user data
 * @returns {Promise<Object>} Updated user object
 */
const editById = async (userId, data) => {
  await User.update(data, {
    where: { user_id: userId },
  });

  return await User.findOne({
    where: { user_id: userId },
  });
};

/**
 * deleteById function to delete a user by ID
 *
 * @param {number} userId - ID of the user to delete
 * @returns {Promise<number>} Number of rows deleted
 */
const deleteById = async (userId) => {
  return User.destroy({
    where: { user_id: userId },
  });
};

export { findAll, findById, create, editById, deleteById };
