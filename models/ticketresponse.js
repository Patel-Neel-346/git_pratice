/**
 * Model class for "TicketResponse"
 *
 * @param {Sequelize} sequelize - sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} TicketResponse - Sequelize model for the ticket_responses table
 */
export default (sequelize, DataTypes) => {
  const TicketResponse = sequelize.define(
    "TicketResponse",
    {
      response_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      response: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      support_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      tableName: "ticket_responses",
      underscored: true,
      timestamps: true,
    }
  );

  // Define associations here
  TicketResponse.associate = (models) => {
    TicketResponse.belongsTo(models.Ticket, {
      foreignKey: "ticket_id",
      targetKey: "ticket_id",
      as: "ticket",
    });

    // If you have a Support model:
    // TicketResponse.belongsTo(models.Support, {
    //   foreignKey: "support_id",
    //   targetKey: "support_id",
    //   as: "support",
    // });
  };

  return TicketResponse;
};
