/**
 * DomainDesign controller
 *
 * @author
 */

import httpStatus from "http-status";
import * as errors from "../utils/api-error.js";
import * as response from "../middlewares/response-handler.js";
import {
  findAll,
  findById,
  create,
  editById,
  deleteById,
} from "../services/domaindesign.service.js";

/**
 * @constant {function} responseHandler - function to form generic success response
 */
const responseHandler = response.default;

/**
 * @constant {NotFoundError} NotFoundError - not found error object
 */
const { NotFoundError } = errors.default;

/**
 * Add a new domain design
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const addDomainDesign = async (req, res) => {
  const domainDesign = await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(domainDesign));
};

/**
 * Get all domain designs
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getDomainDesigns = async (req, res) => {
  const { search, is_active } = req.query;
  const designs = await findAll(search, is_active);
  res.status(httpStatus.OK).send(responseHandler(designs));
};

/**
 * Get domain design by ID
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getDomainDesign = async (req, res) => {
  const design = await findById(req.params.designId);
  if (!design) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(design));
};

/**
 * Edit domain design by ID
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const editDomainDesign = async (req, res) => {
  const design = await findById(req.params.designId);
  if (!design) {
    throw new NotFoundError();
  }

  const updatedDesign = await editById(req.params.designId, req.body);
  res.status(httpStatus.OK).send(responseHandler(updatedDesign));
};

/**
 * Delete domain design by ID
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const deleteDomainDesign = async (req, res) => {
  const design = await findById(req.params.designId);
  if (!design) {
    throw new NotFoundError("Design not found or inactive");
  }

  await deleteById(req.params.designId);
  res.status(httpStatus.OK).send(responseHandler());
};

export {
  addDomainDesign,
  getDomainDesigns,
  getDomainDesign,
  editDomainDesign,
  deleteDomainDesign,
};
