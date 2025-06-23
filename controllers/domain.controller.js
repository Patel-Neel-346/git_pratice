/**
 * Domain controller
 *
 * @author
 */
import httpStatus from 'http-status';

import * as errors from '../utils/api-error.js';
import * as response from '../middlewares/response-handler.js';
import {
  findAll,
  findById,
  create,
  deleteById,
  editById,
  updateDomainStatusById,
} from '../services/domain.service.js';

import { findById as findDesignById } from '../services/domaindesign.service.js';
/**
 * @constant {function} responseHandler - function to form generic success response
 */
const responseHandler = response.default;

/**
 * @constant {NotFoundError} NotFoundError - not found error object
 */
const { NotFoundError } = errors.default;

/**
 * Add a new domain
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const addDomain = async (req, res) => {
  const domain = await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(domain));
};

/**
 * Get all domains
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getDomains = async (req, res) => {
  const { search, status } = req.query;
  const domains = await findAll(search, status);
  res.status(httpStatus.OK).send(responseHandler(domains));
};

/**
 * Get domain by ID
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getDomain = async (req, res) => {
  const domain = await findById(req.params.domainId);
  if (!domain) {
    throw new NotFoundError('Domain not found or inactive');
  }

  res.status(httpStatus.OK).send(responseHandler(domain));
};

/**
 * Edit domain by ID
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const editDomain = async (req, res) => {
  const domain = await findById(req.params.domainId);
  if (!domain) {
    throw new NotFoundError('Domain not found or inactive');
  }

  const updatedDomain = await editById(req.params.domainId, req.body);
  res.status(httpStatus.OK).send(responseHandler(updatedDomain));
};

/**
 * Delete domain by ID
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const deleteDomain = async (req, res) => {
  const domain = await findById(req.params.domainId);
  if (!domain || domain.is_deleted) {
    throw new NotFoundError();
  }
  await deleteById(req.params.domainId);

  res.status(httpStatus.OK).send(responseHandler());
};

const updateDomainStatus = async (req, res) => {
  const { status } = req.body;
  const domainId = req.params.domainId;

  const updatedDomain = await updateDomainStatusById(domainId, status);

  res.status(httpStatus.OK).send(responseHandler(updatedDomain));
};

/**
 * Assign a design to a domain
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const assignDesignToDomain = async (req, res) => {
  const { domainId, designId } = req.params;

  // Check if domain exists
  const domain = await findById(domainId);
  if (!domain) {
    throw new NotFoundError('Domain not found or inactive');
  }
  // Check if design exists
  const design = await findDesignById(designId);
  if (!design) {
    throw new NotFoundError('Design not found or inactive');
  }

  // Assign the design
  domain.design_id = designId;
  await domain.save();

  res
    .status(httpStatus.OK)
    .send(responseHandler(domain, 'Design assigned successfully'));
};

export {
  addDomain,
  getDomains,
  getDomain,
  editDomain,
  deleteDomain,
  updateDomainStatus,
  assignDesignToDomain,
};
