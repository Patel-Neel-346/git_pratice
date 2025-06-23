/**
 * Promocode service which serves DB operations
 * required by promocode controller
 */
import db from "../models/index.js";
import { Op } from "sequelize";

/**
 * @constant {Sequelize.models} - Promocode model extracted from db import
 */
const { PromoCode, User } = db.db;

/**
 * findAll function to retrieve all promocodes in the system
 * @returns {Promise} Promocode object array
 */
const findAll = async (search = "", active = undefined) => {
  const whereClause = {};

  if (search) {
    whereClause[Op.or] = [
      {
        code: {
          [Op.iLike]: `%${search}%`,
        },
      },
      {
        domain_name: {
          [Op.iLike]: `%${search}%`,
        },
      },
    ];
  }

  if (active !== undefined) {
    whereClause.active = active === "true";
  }

  return PromoCode.findAll({
    where: whereClause,
  });
};

/**
 * findById function to fetch data for provided promocodeId
 * @param {number} promocodeId - Promocode ID for which data needs to be fetched
 * @returns {Promise} Promocode object
 */
const findById = async (promocodeId) =>
  PromoCode.findOne({
    where: {
      id: promocodeId,
      active: true,
    },
  });

/**
 * create function to add new promocode
 * @param {object} data - Promocode object with information to be saved in system
 * @returns {Promise} Created Promocode object
 */
const create = async (data) => {
  const promocode = await PromoCode.create(data);
  return promocode;
};

/**
 * deleteById function to delete a promocode by ID
 * @param {number} promocodeId - ID of the promocode to be deleted
 * @returns {Promise} Number of rows updated (0 or 1)
 */
const deleteById = async (promocodeId) =>
  PromoCode.destroy({
    where: { id: promocodeId },
  });

const editById = async (promocodeId, data) => {
  await PromoCode.update(data, {
    where: {
      id: promocodeId,
    },
  });

  const updatedPromocode = await PromoCode.findOne({
    where: { id: promocodeId },
  });

  return updatedPromocode;
};

const updatePromocodeStatusById = async (promocodeId, active) => {
  await PromoCode.update(
    { active },
    {
      where: {
        id: promocodeId,
      },
    }
  );

  const updatedPromocode = await PromoCode.findOne({
    where: { id: promocodeId },
  });

  return updatedPromocode;
};

const findByCodeAndDomain = async (code, domain_name) =>
  PromoCode.findOne({ where: { code, domain_name } });

const reassignWorker = async (promocodeId, user_id) => {
  const promocode = await PromoCode.findById(promocodeId);
  if (!promocode) throw new NotFoundError("Promocode not found");

  const user = await User.findById(user_id);
  if (!user) throw new NotFoundError("User not found");

  domain.design_id = designId;
  await domain.save();

  return domain;
};

export {
  findAll,
  findById,
  create,
  deleteById,
  editById,
  findByCodeAndDomain,
  updatePromocodeStatusById,
  reassignWorker,
};
