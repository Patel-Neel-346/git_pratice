/**
 * Model class for "spammer_teams"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns SpammerTeam - Sequelize model for spammer team entity
 */
export default (sequelize, DataTypes) => {
  const SpammerTeam = sequelize.define(
    'SpammerTeam',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      spammer_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      worker_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
    },
    {
      tableName: 'spammer_teams',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['spammer_id', 'worker_id'],
        },
      ],
    },
  );

  SpammerTeam.associate = models => {
    // Example associations
    // SpammerTeam.belongsTo(models.User, { foreignKey: 'worker_id', targetKey: 'user_id', as: 'Worker' });
    // SpammerTeam.belongsTo(models.User, { foreignKey: 'spammer_id', targetKey: 'user_id', as: 'Spammer' });
  };

  return SpammerTeam;
};
