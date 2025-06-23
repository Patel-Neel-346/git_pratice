/**
 * Model class for "user_profile"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns UserProfile - Sequelize model for user profile entity
 */
export default (sequelize, DataTypes) => {
  const UserProfile = sequelize.define(
    'UserProfile',
    {
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      nickname: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      privacy: {
        type: DataTypes.STRING(20),
        defaultValue: '👩‍💻',
      },
      zelenky_linked: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: 'user_profile',
      timestamps: true,
      underscored: true,
    },
  );

  UserProfile.associate = models => {
    // Example associations
    // UserProfile.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
  };

  return UserProfile;
};
