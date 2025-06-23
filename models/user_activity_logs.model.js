/**
 * Model class for "user_activity_logs"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns UserActivityLog - Sequelize model for user activity log entity
 */
export default (sequelize, DataTypes) => {
  const UserActivityLog = sequelize.define(
    'UserActivityLog',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      domain_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      activity_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      country_code: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      ip_address: {
        type: DataTypes.INET,
        allowNull: true,
      },
      details: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    },
    {
      tableName: 'user_activity_logs',
      timestamps: true,
      underscored: true,
    },
  );

  UserActivityLog.associate = models => {
    // Example associations
    // UserActivityLog.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
  };

  return UserActivityLog;
};
