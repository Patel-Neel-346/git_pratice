/**
 * Model class for "accesses"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns Accesses - Sequelize model for accesses entity
 */
export default (sequelize, DataTypes) => {
  const Accesses = sequelize.define(
    'Accesses',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rule: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      access: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'accesses',
      timestamps: true,
      underscored: true,
    },
  );

  Accesses.associate = models => {
    // Example associations
    // Accesses.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
  };

  return Accesses;
};
