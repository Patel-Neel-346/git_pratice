/**
 * DomainDesign service which serves DB operations
 * required by domain design controller
 */

import db from "../models/index.js";
import { Op } from "sequelize";

/**
 * @constant {Sequelize.models} - DomainDesign model extracted from db import
 */
const { DomainDesign } = db.db;

/**
 * findAll function to retrieve all domain designs
 *
 * @param {string} search - Optional search term to filter by name
 * @param {string} status - Optional status filter ('true' or 'false')
 * @returns {Promise<Array>} DomainDesign object array
 */
const findAll = async (search = "", is_active = undefined) => {
  const whereClause = {};

  if (search) {
    whereClause[Op.or] = [
      {
        name: {
          [Op.iLike]: `%${search}%`, // Case-insensitive match on name
        },
      },
      {
        description: {
          [Op.iLike]: `%${search}%`, // Case-insensitive match on description
        },
      },
    ];
  }

  if (is_active !== undefined) {
    whereClause.is_active = is_active === "true";
  }

  return DomainDesign.findAll({
    where: whereClause,
  });
};

/**
 * findById function to fetch data for provided designId
 *
 * @param {number} designId - Design ID for which data needs to be fetched
 * @returns {Promise<Object|null>} DomainDesign object or null if not found
 */
const findById = async (designId) => {
  return DomainDesign.findOne({
    where: { design_id: designId, is_active: true },
  });
};

/**
 * create function to add new domain design
 *
 * @param {object} data - DomainDesign object with information to be saved
 * @returns {Promise<Object>} Created DomainDesign object
 */
const create = async (data) => {
  return DomainDesign.create(data);
};

/**
 * editById function to update a domain design by ID
 *
 * @param {number} designId - ID of the domain design to update
 * @param {object} data - Updated domain design data
 * @returns {Promise<Object>} Updated DomainDesign object
 */
const editById = async (designId, data) => {
  await DomainDesign.update(data, {
    where: { design_id: designId },
  });

  return DomainDesign.findOne({
    where: { design_id: designId },
  });
};

/**
 * deleteById function to delete a domain design by ID
 *
 * @param {number} designId - ID of the domain design to delete
 * @returns {Promise<number>} Number of rows affected
 */
const deleteById = async (designId) => {
  return DomainDesign.destroy({
    where: { design_id: designId },
  });
};

export { findAll, findById, create, editById, deleteById };
