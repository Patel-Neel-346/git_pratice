/**
 * Model class for "PromoCode"
 *
 * @param {Sequelize} sequelize – Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes – Sequelize data types
 *
 * @returns {Model} PromoCode – Sequelize model for the promo_codes table
 */
export default (sequelize, DataTypes) => {
  const PromoCode = sequelize.define(
    'PromoCode',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      domain_name: {
        type: DataTypes.STRING(255),
      },
      user_id: {
        type: DataTypes.BIGINT,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      visits: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      earnings: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      login: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'werean',
      },
      logs_count: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
    },
    {
      tableName: 'promo_codes',
      underscored: true,
      indexes: [
        {
          name: 'idx_promo_codes_user_id',
          fields: ['user_id'],
          using: 'BTREE',
        },
        {
          unique: true,
          fields: ['domain_name', 'code'],
        },
      ],
    },
  );

  /** Define associations here */
  PromoCode.associate = models => {
    // Each promo code belongs to one user
    PromoCode.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'user_id',
      as: 'users',
    });

    // Each promo code belongs to one domain (by domain name)
    PromoCode.belongsTo(models.Domain, {
      foreignKey: 'domain_name',
      targetKey: 'name',
      as: 'domains',
    });

    PromoCode.hasMany(models.PromoVisit, {
      foreignKey: 'id',
      sourceKey: 'id',
      as: 'promoVisits',
    });

    PromoCode.hasMany(models.PromoLog, {
      foreignKey: 'id',
      sourceKey: 'id',
      as: 'promoLogs',
    });
  };

  return PromoCode;
};
