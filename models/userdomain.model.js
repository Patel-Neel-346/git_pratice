/**
 * Model class for "UserDomain"
 *
 * @param {Sequelize} sequelize - sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} UserDomain - Sequelize model for the user_domains table
 */
export default (sequelize, DataTypes) => {
  const UserDomain = sequelize.define(
    "UserDomain",
    {
      user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      domain: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        references: {
          model: "domains",
          key: "name",
        },
      },
      promo_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "user_domains",
      timestamps: false,
      underscored: true,
    }
  );

  // Define associations here if needed
  UserDomain.associate = (models) => {
    UserDomain.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
      as: "user",
    });

    UserDomain.belongsTo(models.Domain, {
      foreignKey: "domain",
      targetKey: "name",
      as: "domain_ref",
    });
  };



  return UserDomain;
};
