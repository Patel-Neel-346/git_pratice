/**
 * Model class for "ProfileSetting"
 *
 * @param {Sequelize} sequelize - sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} ProfileSetting - Sequelize model for the profile_settings table
 */
export default (sequelize, DataTypes) => {
  const ProfileSetting = sequelize.define(
    "ProfileSetting",
    {
      user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      nickname: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "****",
      },
      privacy: {
        type: DataTypes.STRING(20),
        defaultValue: "private",
      },
      zelenky_linked: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "profile_settings",
      underscored: true,
      timestamps: false,
    }
  );

  // Define associations here
  ProfileSetting.associate = (models) => {
    ProfileSetting.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
      as: "user",
    });
  };

  return ProfileSetting;
};
