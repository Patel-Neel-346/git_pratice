/**
 * Model class for "domain_notification_settings"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns DomainNotificationSettings - Sequelize model for domain notification settings entity
 */
export default (sequelize, DataTypes) => {
  const DomainNotificationSettings = sequelize.define(
    'DomainNotificationSettings',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      domain_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      notify_visits: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      notify_logs: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      notify_changes: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      notify_sales: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      hide_in_top: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      hide_stats: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'domain_notification_settings',
      timestamps: false,
      underscored: true,
    },
  );

  DomainNotificationSettings.associate = models => {
    // Example associations
    // DomainNotificationSettings.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
  };

  return DomainNotificationSettings;
};
