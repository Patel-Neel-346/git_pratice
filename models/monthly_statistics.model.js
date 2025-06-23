/**
 * Model class for "monthly_statistics"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns MonthlyStatistics - Sequelize model for monthly statistics entity
 */
export default (sequelize, DataTypes) => {
  const MonthlyStatistics = sequelize.define(
    'MonthlyStatistics',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
      domain_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
          model: 'domains',
          key: 'name',
        },
      },
      month: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_visits: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      total_earnings: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        allowNull: false,
      },
      unique_visitors: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      tableName: 'monthly_statistics',
      underscored: true,
      timestamps: true,
    },
  );

  MonthlyStatistics.associate = models => {
    // MonthlyStatistics.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
    // MonthlyStatistics.belongsTo(models.Domain, { foreignKey: 'domain_name', targetKey: 'name' });
  };

  return MonthlyStatistics;
};
