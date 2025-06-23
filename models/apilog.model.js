/**
 * Model class for "ApiLog"
 *
 * @param {Sequelize} sequelize - sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} ApiLog - Sequelize model for the api_logs table
 */
export default (sequelize, DataTypes) => {
  const ApiLog = sequelize.define(
    "ApiLog",
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      endpoint: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      request_params: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      response_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      response_text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      login: {
        type: DataTypes.STRING(255),
        defaultValue: "werean",
      },
    },
    {
      tableName: "api_logs",
      underscored: true,
      timestamps: true,
    }
  );

  // Define associations here
  ApiLog.associate = (models) => {
    ApiLog.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
      as: "user",
    });
  };

  return ApiLog;
};
