export default (sequelize, DataTypes) => {
  const UserEarnings = sequelize.define(
    'UserEarnings',
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
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      source: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      account_email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      earned_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      domain_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
          model: 'domains',
          key: 'name',
        },
      },
    },
    {
      tableName: 'user_earnings',
      underscored: true,
      timestamps: true,
    },
  );

  UserEarnings.associate = models => {
    // UserEarnings.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
    // UserEarnings.belongsTo(models.Domain, { foreignKey: 'domain_name', targetKey: 'name' });
  };

  return UserEarnings;
};
