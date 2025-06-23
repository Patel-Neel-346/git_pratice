import db from "../models/index.js";
import { Op, fn, col, literal } from "sequelize";
const { PayoutHistory } = db.db;
import dayjs from "dayjs";
import * as errors from "../utils/api-error.js";

const { NotFoundError, BadRequestError } = errors.default;

const getWeeklyEarnings = async (from, to, user_id) => {
  return PayoutHistory.findAll({
    where: {
      user_id,
      created_at: {
        [Op.between]: [new Date(from), new Date(to)],
      },
    },
    attributes: [
      [fn("date_trunc", "week", col("created_at")), "week_start"],
      [fn("SUM", col("amount")), "total_earned"],
    ],
    group: [literal("week_start")],
    order: [[literal("week_start"), "ASC"]],
    raw: true,
  });
};

const getMonthlyEarnings = async (from, to, user_id) => {
  return PayoutHistory.findAll({
    where: {
      user_id,
      created_at: {
        [Op.between]: [new Date(from), new Date(to)],
      },
    },
    attributes: [
      [fn("date_trunc", "month", col("created_at")), "month_start"],
      [fn("SUM", col("amount")), "total_earned"],
    ],
    group: [literal("month_start")],
    order: [[literal("month_start"), "ASC"]],
    raw: true,
  });
};

/**
 * Fetch total earnings (payouts) for a given user.
 * You can customize it to return weekly/monthly records if needed.
 *
 * @param {string|number} userId - User ID
 * @returns {Promise<Array>} - List of earnings with date and amount
 */
// const getUserEarnings = async (userId) => {
//   // console.log("Inside getUserEarnings with userId:", userId);
//   const payouts = await PayoutHistory.findAll({
//     where: { user_id: userId },
//     attributes: ["created_at", "amount"],
//     order: [["created_at", "ASC"]],
//   });

//   // console.log(payouts, "payouts");

//   payouts.forEach((payout, i) => {
//     // console.log(`${i + 1}: created_at = ${payout.dataValues.created_at}`);
//   });

//   return payouts.map((payout) => {
//     const created = payout.get("created_at"); // ✅ safest access
//     return {
//       date: dayjs(created).format("YYYY-MM-DD"),
//       // date: created,
//       amount: parseFloat(payout.amount),
//     };
//   });
// };

const getUserEarnings = async (userId) => {
  const payouts = await PayoutHistory.findAll({
    where: { user_id: userId },
    attributes: [
      [fn("DATE", col("created_at")), "date"],
      [fn("SUM", col("amount")), "total_amount"],
    ],
    group: [literal("date")],
    order: [[literal("date"), "ASC"]],
    raw: true,
  });

  return payouts.map((entry) => ({
    date: dayjs(entry.date).format("YYYY-MM-DD"),
    amount: parseFloat(entry.total_amount),
  }));
};

export { getWeeklyEarnings, getMonthlyEarnings, getUserEarnings };
