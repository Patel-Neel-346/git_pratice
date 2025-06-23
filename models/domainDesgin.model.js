/**
 * Model class for "domain_design"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns DomainDesign - Sequelize model for domain design entity
 */
export default (sequelize, DataTypes) => {
  const DomainDesign = sequelize.define(
    'DomainDesign',
    {
      design_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    {
      tableName: 'domain_designs',
      underscored: true,
      timestamps: true,
    },
  );

  DomainDesign.associate = models => {
    // Example associations
    // DomainDesign.belongsTo(models.User, { foreignKey: 'created_by', targetKey: 'user_id' });
  };

  return DomainDesign;
};
