/**
 * Model class for "Payout"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} Payout - Sequelize model for the payout table
 */
export default (sequelize, DataTypes) => {
  const Payout = sequelize.define(
    "Payout",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      withdraw_amount: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      tableName: "payout",
      underscored: true, // maps createdAt => created_at
      timestamps: true, // Sequelize will manage createdAt & updatedAt
    }
  );

  Payout.associate = (models) => {
    Payout.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  return Payout;
};
