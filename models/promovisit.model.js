/**
 * Model class for "PromoVisit"
 *
 * @param {Sequelize} sequelize - sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} PromoVisit - Sequelize model for the promo_visits table
 */
export default (sequelize, DataTypes) => {
  const PromoVisit = sequelize.define(
    'PromoVisit',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // promo_code: {
      //   type: DataTypes.STRING(255),
      //   allowNull: false,
      // },
      // domain_name: {
      //   type: DataTypes.STRING(255),
      //   allowNull: false,
      // },

      promo_code_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      // domain_id: {
      //   type: DataTypes.BIGINT,
      //   allowNull: false,
      // },

      domain_name: {
        type: DataTypes.STRING(255), // ✅ using domain_name as string
        allowNull: false,
      },
      ip_address: {
        type: DataTypes.INET,
        allowNull: true,
      },
      country_code: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      visit_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'promo_visits',
      underscored: true,
      timestamps: false,
    },
  );

  // Define associations here
  PromoVisit.associate = models => {
    // PromoVisit.belongsTo(models.Domain, {
    //   foreignKey: "domain_name",
    //   targetKey: "name",
    //   as: "domain",
    // });

    // PromoVisit.belongsTo(models.PromoCode, {
    //   foreignKey: "id",
    //   targetKey: "id",
    //   as: "promoCode",
    // });

    PromoVisit.belongsTo(models.Domain, {
      foreignKey: 'domain_name', // ✅ domain_name from PromoVisit
      targetKey: 'name', // ✅ matches with Domain.name
      as: 'domain',
    });

    PromoVisit.belongsTo(models.PromoCode, {
      foreignKey: 'promo_code_id',
      as: 'promoCode',
    });
    // Example: if promo_code relates to a separate model:
    // PromoVisit.belongsTo(models.Promocode, { foreignKey: 'promo_code', targetKey: 'code' });
  };

  return PromoVisit;
};
