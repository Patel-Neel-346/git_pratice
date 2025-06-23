/**
 * Model class for "Ticket"
 *
 * @param {Sequelize} sequelize - sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} Ticket - Sequelize model for the tickets table
 */
export default (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    "Ticket",
    {
      ticket_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "users",
          key: "user_id",
        },
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "open",
        validate: {
          isIn: [["open", "answered", "closed"]],
        },
      },
    },
    {
      tableName: "tickets",
      underscored: true,
    }
  );

  // Define associations here
  Ticket.associate = (models) => {
    Ticket.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
      as: "user",
    });

    Ticket.hasMany(models.TicketResponse, {
      foreignKey: "ticket_id",
      sourceKey: "ticket_id",
      as: "responses",
    });
    // Example for potential future relationships
    // Ticket.hasMany(models.TicketResponse, { foreignKey: 'ticket_id' });
  };

  return Ticket;
};
