/**
 * Model class for "tokens"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns Tokens - Sequelize model for tokens entity
 */
export default (sequelize, DataTypes) => {
  const Tokens = sequelize.define(
    'Tokens',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.BIGINT,
        references: {
          model: 'panel_users',
          key: 'id',
        },
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },
      ip_address: {
        type: DataTypes.INET,
        allowNull: true,
      },
    },
    {
      tableName: 'tokens',
      timestamps: true,
      underscored: true,
    },
  );

  Tokens.associate = models => {
    // Example associations
    // Tokens.belongsTo(models.PanelUsers, { foreignKey: 'user_id', targetKey: 'id' });
  };

  return Tokens;
};
