/**
 * Model class for "financial_report"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns FinancialReport - Sequelize model for financial report entity
 */
export default (sequelize, DataTypes) => {
  const FinancialReport = sequelize.define(
    'FinancialReport',
    {
      report_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      report_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
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
      report_data: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    {
      tableName: 'financial_reports',
      underscored: true,
      timestamps: true,
    },
  );

  FinancialReport.associate = models => {
    // Example associations
    // FinancialReport.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
    // FinancialReport.belongsTo(models.User, { foreignKey: 'created_by', targetKey:
    // 'user_id', as: 'Creator' });
  };

  return FinancialReport;
};
