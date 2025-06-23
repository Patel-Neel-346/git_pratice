/**
 * Model class for "account"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns Account - Sequelize model for account entity
 */
export default (sequelize, DataTypes) => {
  const Account = sequelize.define(
    'Account',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      promo_code: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      account_value: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      market_status: {
        type: DataTypes.STRING(50),
        defaultValue: 'pending',
        allowNull: false,
      },
      market_item_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      market_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      market_error: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      processed_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      categories: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      email_password: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      account_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      total_value: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      category_values: {
        type: DataTypes.JSONB,
        defaultValue: {},
        allowNull: false,
      },
      account_domain: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      cookies: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sold_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      item_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hold_until: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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
    },
    {
      tableName: 'accounts',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'idx_accounts_market_status',
          fields: ['market_status'],
          using: 'BTREE',
        },
      ],
    },
  );

  Account.associate = models => {
    // Example associations
    // Account.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
  };

  return Account;
};
