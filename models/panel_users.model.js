// /**
//  * Model class for "panel_users"
//  *
//  * @param {Sequelize} sequelize - Sequelize instance
//  * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
//  *
//  * @returns PanelUsers - Sequelize model for panel users entity
//  */
// export default (sequelize, DataTypes) => {
//   const PanelUsers = sequelize.define(
//     'PanelUsers',
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       login: {
//         type: DataTypes.STRING(255),
//         unique: true,
//         allowNull: true,
//       },
//       password: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//       role: {
//         type: DataTypes.STRING(255),
//         defaultValue: 'admin',
//       },
//       is_active: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//       },
//       last_login: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//       },
//       percent: {
//         type: DataTypes.DECIMAL(10, 2),
//         defaultValue: 50.0,
//       },
//       logs: {
//         type: DataTypes.BIGINT,
//         defaultValue: 0,
//       },
//       balance: {
//         type: DataTypes.DECIMAL(10, 2),
//         defaultValue: 0.0,
//       },
//       domain_limits: {
//         type: DataTypes.INTEGER,
//         defaultValue: 10,
//       },
//       isBan: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//       },
//     },
//     {
//       tableName: 'panel_users',
//       timestamps: true,
//       underscored: true,
//     },
//   );

//   PanelUsers.associate = models => {
//     // Example associations
//     // PanelUsers.hasMany(models.ApiKey, { foreignKey: 'login', sourceKey: 'login' });
//     // PanelUsers.hasMany(models.Tokens, { foreignKey: 'user_id', sourceKey: 'id' });
//   };

//   return PanelUsers;
// };

/**
 * Model class for "panel_users"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns PanelUsers - Sequelize model for panel users entity
 */
export default (sequelize, DataTypes) => {
  const PanelUsers = sequelize.define(
    'PanelUsers',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      login: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING(255),
        defaultValue: 'admin',
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      last_login: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      percent: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 50.0,
      },
      logs: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      domain_limits: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
      },
      isBan: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'panel_users',
      timestamps: true,
      underscored: true,
    },
  );

  PanelUsers.associate = models => {
    PanelUsers.hasMany(models.ApiKeys, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      as: 'api_keys',
    });
  };

  return PanelUsers;
};
