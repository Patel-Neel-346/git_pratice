export default (sequelize, DataTypes) => {
  const DomainVisit = sequelize.define(
    'DomainVisit',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      domain_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: 'domains',
          key: 'name',
        },
      },
      visitor_ip: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      country_code: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      visit_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      user_agent: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'domain_visits',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'idx_domain_visits_domain',
          fields: ['domain_name'],
          using: 'BTREE',
        },
        {
          name: 'idx_domain_visits_time',
          fields: ['visit_time'],
          using: 'BTREE',
        },
      ],
    },
  );

  DomainVisit.associate = models => {
    // DomainVisit.belongsTo(models.Domain, { foreignKey: 'domain_name', targetKey: 'name' });
  };

  return DomainVisit;
};
