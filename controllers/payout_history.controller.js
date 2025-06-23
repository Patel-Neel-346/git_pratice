import httpStatus from "http-status";
import * as response from "../middlewares/response-handler.js";
import * as errors from "../utils/api-error.js";
import { withdrawFromPayout } from "../services/payout_history.service.js";

const responseHandler = response.default;

/**
 * @constant {NotFoundError} NotFoundError - not found error object
 */
const { NotFoundError, BadRequestError } = errors.default;

/**
 * Withdraw amount from payout
 */
const withdrawAmountFromPayout = async (req, res) => {
  const { payout_id, amount, user_id } = req.body;

  if (!payout_id || !amount || !user_id) {
    throw new BadRequestError(
      "Missing required fields: payout_id, amount, user_id"
    );
  }

  const result = await withdrawFromPayout({ payout_id, amount, user_id });

  res.status(httpStatus.CREATED).send(responseHandler(result));
};

export { withdrawAmountFromPayout };
