/**
 * Model class for "promo_notification"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns PromoNotification - Sequelize model for promo notification entity
 */
export default (sequelize, DataTypes) => {
  const PromoNotification = sequelize.define(
    'PromoNotification',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      domain: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      notification_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: 'promo_notifications',
      underscored: true,
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['domain', 'code'],
        },
      ],
    },
  );

  PromoNotification.associate = models => {
    // Example associations
    // PromoNotification.belongsTo(models.Domain, { foreignKey: 'domain', targetKey: 'name' });
  };

  return PromoNotification;
};
