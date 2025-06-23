/**
 * User controller
 *
 * @author Chetan Patil
 */
import httpStatus from "http-status";

import * as errors from "../utils/api-error.js";
import * as response from "../middlewares/response-handler.js";
import { findAll, findById, create } from "../services/user.service.js";
import userModel from "../models/user.model.js";
import referralModel from "../models/referral.model.js";

/**
 * @constant {function} responseHandler - function to form generic success response
 */
const responseHandler = response.default;
/**
 * @constant {NotFoundError} NotFoundError - not found error object
 */
const { NotFoundError } = errors.default;

/**
 * Function which provides functionality
 * to add/create new user in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const addUser = async (req, res) => {
  const userDetails = await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(userDetails));
};

/**
 * Function which provides functionality
 * to retrieve all users present in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getUsers = async (req, res) => {
  const users = await findAll();
  res.status(httpStatus.OK).send(responseHandler(users));
};

/**
 * Function which provides functionality
 * to retrieve specific user based on provided userId
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such user exists for provided userId
 */
const getUser = async (req, res) => {
  const user = await findById(req.params.userId);
  if (!user) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(user));
};

const getRef = async (req, res) => {
  const user = await userModel.findByPk(1, {
    include: [
      {
        model: referralModel,
        as: "referrals",
      },
    ],
  });
  console.log(user.referrals); // Should log array of Referral instances
}


export { addUser, getUsers, getUser, getRef };
