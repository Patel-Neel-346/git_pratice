export default (sequelize, DataTypes) => {
  const CloudflareAccounts = sequelize.define(
    'CloudflareAccounts',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      apiKey: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      domain: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      email_recovery: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'cloudflare_accounts',
      underscored: true,
      timestamps: true,
    },
  );

  CloudflareAccounts.associate = models => {
    // Add associations here if needed
  };

  return CloudflareAccounts;
};
