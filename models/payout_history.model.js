/**
 * Model class for "PayoutHistory"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} PayoutHistory - Sequelize model for the payout_history table
 */
export default (sequelize, DataTypes) => {
  const PayoutHistory = sequelize.define(
    "PayoutHistory",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      payout_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      amount: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      tableName: "payout_history",
      underscored: true,
      timestamps: true, // Automatically adds and manages created_at, updated_at
    }
  );

  PayoutHistory.associate = (models) => {
    PayoutHistory.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    PayoutHistory.belongsTo(models.Payout, {
      foreignKey: "payout_id",
      as: "payout",
    });
  };

  return PayoutHistory;
};
