/**
 * Model class for "is_error_creditnails"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns IsErrorCreditnails - Sequelize model for is_error_creditnails entity
 */
export default (sequelize, DataTypes) => {
  const IsErrorCreditnails = sequelize.define(
    'IsErrorCreditnails',
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
      password: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'is_error_creditnails',
      timestamps: true,
      underscored: true,
    },
  );

  IsErrorCreditnails.associate = models => {
    // Define associations if needed
  };

  return IsErrorCreditnails;
};
