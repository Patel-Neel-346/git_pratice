/**
 * Model class for "system_setting"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns SystemSetting - Sequelize model for system setting entity
 */
export default (sequelize, DataTypes) => {
  const SystemSetting = sequelize.define(
    'SystemSetting',
    {
      setting_key: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
      },
      setting_value: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      last_updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    {
      tableName: 'system_settings',
      underscored: true,
      timestamps: false,
    },
  );

  SystemSetting.associate = models => {
    // Example associations
    // SystemSetting.belongsTo(models.User, { foreignKey: 'updated_by', targetKey: 'user_id' });
  };

  return SystemSetting;
};
