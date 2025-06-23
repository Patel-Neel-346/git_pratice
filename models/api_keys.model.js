// /**
//  * Model class for "api_keys"
//  *
//  * @param {Sequelize} sequelize - Sequelize instance
//  * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
//  *
//  * @returns ApiKey - Sequelize model for API key entity
//  */
// export default (sequelize, DataTypes) => {
//   const ApiKey = sequelize.define(
//     'ApiKey',
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       login: {
//         type: DataTypes.STRING(255),
//         references: {
//           model: 'panel_users',
//           key: 'login',
//         },
//         allowNull: false,
//       },
//       key: {
//         type: DataTypes.TEXT,
//         unique: true,
//         allowNull: false,
//       },
//     },
//     {
//       tableName: 'api_keys',
//       timestamps: true,
//       underscored: true,
//     },
//   );

//   ApiKey.associate = models => {
//     // Example associations
//     // ApiKey.belongsTo(models.PanelUsers, { foreignKey: 'login', targetKey: 'login' });
//   };

//   return ApiKey;
// };
/**
 * Model class for "api_keys"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns ApiKeys - Sequelize model for api keys entity
 */
export default (sequelize, DataTypes) => {
  const ApiKeys = sequelize.define(
    'ApiKeys',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      key: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: 'api_keys',
      timestamps: true,
      underscored: true,
    },
  );

  ApiKeys.associate = models => {
    ApiKeys.belongsTo(models.PanelUsers, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'user',
    });
  };

  return ApiKeys;
};
