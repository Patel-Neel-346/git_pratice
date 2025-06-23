import db from "../models/index.js";
import * as errors from "../utils/api-error.js";
const { Payout, PayoutHistory, User, sequelize } = db.db;

/**
 * @constant {NotFoundError} NotFoundError - not found error object
 */
const { NotFoundError, BadRequestError } = errors.default;

/**
 * Withdraw amount from a payout and record it in payout_history
 *
 * @param {object} data - { payout_id, amount, user_id }
 * @returns {object} - Updated payout and payout history
 */
const withdrawFromPayout = async ({ payout_id, amount, user_id }) => {
  // Transaction to ensure atomicity
  const t = await sequelize.transaction();

  try {
    const payout = await Payout.findOne({
      where: { id: payout_id },
      transaction: t,
    });
    //console.log(payout, "payout-===");

    if (!payout) {
      throw new NotFoundError("Payout record not found.");
    }
    const user = await User.findOne({
      where: { user_id: user_id },
      transaction: t,
    });

    if (!user) {
      throw new NotFoundError("User record not found.");
    }

    if (Number(payout.user_id) !== user_id) {
      throw new BadRequestError("Unauthorized operation for this payout.");
    }

    if (Number(payout.amount) < amount) {
      throw new BadRequestError("Insufficient payout amount.");
    }

    // Update payout
    payout.amount = Number(payout.amount) - amount;
    payout.withdraw_amount = Number(payout.withdraw_amount || 0) + amount;
    await payout.save({ transaction: t });

    // Create payout_history entry
    const payoutHistory = await PayoutHistory.create(
      {
        payout_id,
        amount,
        user_id,
      },
      { transaction: t }
    );

    await t.commit();

    return {
      payout,
      payoutHistory,
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export { withdrawFromPayout };
