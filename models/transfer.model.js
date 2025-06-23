/**
 * Model class for "Transfer"
 *
 * @param {Sequelize} sequelize - sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} Transfer - Sequelize model for the transfers table
 */
export default (sequelize, DataTypes) => {
  const Transfer = sequelize.define(
    "Transfer",
    {
      transfer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sender_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      recipient_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: "transfers",
      underscored: true,
      timestamps: true,
    }
  );

  // Define associations here
  Transfer.associate = (models) => {
    Transfer.belongsTo(models.User, {
      foreignKey: "sender_id",
      as: "sender",
    });

    Transfer.belongsTo(models.User, {
      foreignKey: "recipient_id",
      as: "recipient",
    });
  };

  return Transfer;
};
