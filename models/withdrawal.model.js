/**
 * Model class for "Withdrawal"
 *
 * @param {Sequelize} sequelize - sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} Withdrawal - Sequelize model for the withdrawals table
 */
export default (sequelize, DataTypes) => {
  const Withdrawal = sequelize.define(
    "Withdrawal",
    {
      withdrawal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(20),
        defaultValue: "pending",
      },
    },
    {
      tableName: "withdrawals",
      underscored: true,
      timestamps: true,
    }
  );

  // Define associations here
  Withdrawal.associate = (models) => {
    Withdrawal.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
      as: "user",
    });
  };

  return Withdrawal;
};
