/**
 * Payout controller
 */
import httpStatus from "http-status";
import * as response from "../middlewares/response-handler.js";
import * as errors from "../utils/api-error.js";
import {
  create,
  findAll,
  findById,
  editById,
  deleteById,
} from "../services/payout.service.js";
import { findById as findUserById } from "../services/users.service.js";

const responseHandler = response.default;
const { NotFoundError } = errors.default;

/**
 * Register a new payout
 */
const addPayout = async (req, res) => {
  const payout = await create(req.body);

  res.status(httpStatus.CREATED).send(responseHandler(payout));
};

/**
 * Get payouts by user ID from route param
 */
const getPayoutsByUserId = async (req, res) => {
  const user_id = req.params.userId;

  const user = await findUserById(user_id);
  if (!user) {
    throw new NotFoundError("User doesn't exist");
  }
  const payouts = await findAll(user_id);
  res.status(httpStatus.OK).send(responseHandler(payouts));
};

// /**
//  * Get all payouts (optionally by user_id)
//  */
// const getPayouts = async (req, res) => {
//   const { user_id } = req.query;
//   const payouts = await findAll(user_id);
//   res.status(httpStatus.OK).send(responseHandler(payouts));
// };

// /**
//  * Get a specific payout by ID
//  */
// const getPayout = async (req, res) => {
//   const payout = await findById(req.params.payoutId);
//   if (!payout) {
//     throw new NotFoundError("Payout not found");
//   }
//   res.status(httpStatus.OK).send(responseHandler(payout));
// };

// /**
//  * Edit payout
//  */
// const editPayout = async (req, res) => {
//   const existing = await findById(req.params.payoutId);
//   if (!existing) {
//     throw new NotFoundError("Payout not found");
//   }

//   const updated = await editById(req.params.payoutId, req.body);
//   res.status(httpStatus.OK).send(responseHandler(updated));
// };

// /**
//  * Delete payout
//  */
// const deletePayout = async (req, res) => {
//   const payout = await findById(req.params.payoutId);
//   if (!payout) {
//     throw new NotFoundError("Payout not found");
//   }

//   await deleteById(req.params.payoutId);
//   res.status(httpStatus.OK).send(responseHandler());
// };

export {
  addPayout,
  getPayoutsByUserId,
  // getPayouts,
  // getPayout,
  // editPayout,
  // deletePayout,
};
