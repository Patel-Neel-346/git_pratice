/**
 * User controller
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
  editById,
  deleteById,
} from '../services/users.service.js';

/**
 * @constant {function} responseHandler - function to form generic success response
 */
const responseHandler = response.default;

/**
 * @constant {NotFoundError} NotFoundError - not found error object
 */
const { NotFoundError } = errors.default;

/**
 * Add a new user
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const addUser = async (req, res) => {
  const user = await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(user));
};

/**
 * Get all users
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getUsers = async (req, res) => {
  const { search, status } = req.query;
  const users = await findAll(search, status);
  res.status(httpStatus.OK).send(responseHandler(users));
};

/**
 * Get user by ID
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getUser = async (req, res) => {
  const user = await findById(req.params.userId);
  if (!user) {
    throw new NotFoundError();
  }
  res.status(httpStatus.OK).send(responseHandler(user));
};

/**
 * Edit user by ID
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const editUser = async (req, res) => {
  const user = await findById(req.params.userId);
  if (!user) {
    throw new NotFoundError();
  }

  const updatedUser = await editById(req.params.userId, req.body);
  res.status(httpStatus.OK).send(responseHandler(updatedUser));
};

/**
 * Delete user by ID
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const deleteUser = async (req, res) => {
  const user = await findById(req.params.userId);
  if (!user) {
    throw new NotFoundError();
  }

  await deleteById(req.params.userId);
  res.status(httpStatus.OK).send(responseHandler());
};

export { addUser, getUsers, getUser, editUser, deleteUser };
