/**
 * Model class for "PromoLog"
 *
 * @param {Sequelize} sequelize - sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} PromoLog - Sequelize model for the promo_logs table
 */
export default (sequelize, DataTypes) => {
  const PromoLog = sequelize.define(
    "PromoLog",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      promo_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      domain_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sale_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      commission_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      sale_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "promo_logs",
      underscored: true,
    }
  );

  // Define associations here
  PromoLog.associate = (models) => {
    PromoLog.belongsTo(models.Domain, {
      foreignKey: "domain_name",
      targetKey: "name",
      as: "domain",
    });

    PromoLog.belongsTo(models.PromoCode, {
      foreignKey: "id",
      targetKey: "id",
      as: "promoCode",
    });

    // Example: if accounts table exists
    // PromoLog.belongsTo(models.Account, { foreignKey: "account_id", as: "account" });
  };

  return PromoLog;
};
