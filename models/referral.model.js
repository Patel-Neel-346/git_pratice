/**
 * Model class for "Referral"
 *
 * @param {Sequelize} sequelize - sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} Referral - Sequelize model for the referrals table
 */
export default (sequelize, DataTypes) => {
  const Referral = sequelize.define(
    "Referral",
    {
      inviter_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      referral_code: {
        type: DataTypes.STRING(8),
        unique: true,
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "referrals",
      underscored: true,
      timestamps: false, // optional; add timestamps if needed
    }
  );

  // Define associations here
  Referral.associate = (models) => {
    Referral.belongsTo(models.User, {
      foreignKey: "inviter_id",
      targetKey: "user_id",
      as: "inviter",
    });
  };

  return Referral;
};
