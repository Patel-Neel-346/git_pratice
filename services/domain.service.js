/**
 * Domain service which serves DB operations
 * required by domain controller
 *
 */
import db from '../models/index.js';
import { Op } from 'sequelize';
const { User } = db.db; // Replace `User` with your actual model name

/**
 * @constant {Sequelize.models} - Domain model extracted from db import
 */
const { Domain } = db.db;
const { DomainDesign } = db.db;
/**
 * findAll function to retrieve all domains in the system
 *
 * @returns {Promise} Domain object array
 */

const findAll = async (search = '', status = undefined) => {
  const whereClause = {};

  if (search) {
    whereClause.name = {
      [Op.iLike]: `%${search}%`, // Case-insensitive partial match
    };
  }

  if (status !== undefined) {
    whereClause.status = status === 'active' ? 'active' : 'inactive';
  }

  return Domain.findAll({
    where: whereClause,
  });
};

/**
 * findById function to fetch data for provided domainId
 *
 * @param {number} domainId - Domain ID for which data needs to be fetched
 * @returns {Promise<Object|null>} Domain object or null if not found
 */
const findById = async domainId => {
  return Domain.findOne({
    where: { id: domainId, status: 'active' },
  });
};

const findDomainByName = async domain_name => {
  return await Domain.findOne({
    where: { name: domain_name, status: 'active' },
  });
};

/**
 * create function to add new domain
 *
 * @param {object} data - domain object with information to be saved in system
 * @returns {Promise} Created domain object
 */
const create = async data => {
  const domain = await Domain.create(data);
  return domain;
};

/**
 * Update domain by ID
 *
 * @param {number} domainId - ID of the domain to update
 * @param {object} data - Updated domain data
 * @returns {Promise} Updated domain object
 */
const editById = async (domainId, data) => {
  const { user_id, influencer_id, design_id } = data;

  // Validate foreign keys if present
  if (user_id) {
    const user = await User.findOne({ where: { user_id } });
    if (!user) {
      throw new NotFoundError('Invalid user_id');
    }
  }

  if (influencer_id) {
    const influencer = await User.findOne({
      where: { user_id: influencer_id },
    });
    if (!influencer) {
      throw new NotFoundError('Invalid influencer_id');
    }
  }

  if (design_id) {
    const design = await DomainDesign.findOne({ where: { design_id } });
    if (!design) {
      throw new NotFoundError('Invalid design_id');
    }
  }

  await Domain.update(data, {
    where: { id: domainId },
  });

  const updatedDomain = await Domain.findOne({ where: { id: domainId } });
  return updatedDomain;
};

/**
 * Soft delete a domain by setting is_deleted to true
 *
 * @param {number} domainId - ID of the domain to be soft-deleted
 * @returns {Promise} Number of rows affected
 */
const deleteById = async domainId =>
  Domain.destroy({
    where: { id: domainId },
  });

const updateDomainStatusById = async (domainId, status) => {
  await Domain.update(
    { status },
    {
      where: {
        id: domainId,
      },
    },
  );

  const updatedDomain = await Domain.findOne({
    where: { id: domainId },
  });

  return updatedDomain;
};

const assignDesign = async (domainId, designId) => {
  const domain = await Domain.findById(domainId);
  if (!domain) throw new NotFoundError('Domain not found');

  const design = await DomainDesign.findById(designId);
  if (!design) throw new NotFoundError('Design not found');

  domain.design_id = designId;
  await domain.save();

  return domain;
};

export {
  findAll,
  findById,
  create,
  editById,
  deleteById,
  updateDomainStatusById,
  findDomainByName,
  assignDesign,
};
