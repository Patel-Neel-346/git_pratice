/**
 * Model class for "NotificationSetting"
 *
 * @param {Sequelize} sequelize - sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} NotificationSetting - Sequelize model for the notification_settings table
 */
export default (sequelize, DataTypes) => {
  const NotificationSetting = sequelize.define(
    "NotificationSetting",
    {
      user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      new_log: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      listing: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      changes: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      deletion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      trusted: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      promo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      notify_sales: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "notification_settings",
      underscored: true,
      timestamps: false,
    }
  );

  // Define associations here
  NotificationSetting.associate = (models) => {
    NotificationSetting.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
      as: "user",
    });
  };

  return NotificationSetting;
};
