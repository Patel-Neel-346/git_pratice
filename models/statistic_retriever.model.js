/**
 * Model class for "statistic_retriever"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns StatisticRetriever - Sequelize model for statistic_retriever entity
 */
export default (sequelize, DataTypes) => {
  const StatisticRetriever = sequelize.define(
    'StatisticRetriever',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      two_fa: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      changeEmail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'statistic_retriever',
      timestamps: true,
      underscored: true,
    },
  );

  StatisticRetriever.associate = models => {
    // Define associations if needed
  };

  return StatisticRetriever;
};
