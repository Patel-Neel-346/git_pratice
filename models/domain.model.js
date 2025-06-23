// /**
//  * Model class for "domain"
//  *

//  *
//  * @param {Sequelize} sequelize - Sequelize instance
//  * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
//  *
//  * @returns Domain - Sequelize model for domain entity
//  */
// export default (sequelize, DataTypes) => {
//   const Domain = sequelize.define(
//     "Domain",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       status: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: true,
//         comment: "active or inactive",
//       },
//       assigned_to: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       created_at: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//       },
//       is_deleted: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false,
//         comment: "true if soft-deleted",
//       },
//     },
//     {
//       tableName: "domains",
//       underscored: true,
//       timestamps: false, // because you only have created_at, no updated_at
//     }
//   );

//   Domain.associate = (models) => {
//     // Example association (if you have a User model or similar)
//     // Domain.belongsTo(models.User, { foreignKey: 'assigned_to', targetKey: 'id' });
//   };

//   return Domain;
// };

/**
 * Model class for "Domain"
 *
 * @param {Sequelize} sequelize - sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} Domain - Sequelize model for the domains table
 */
export default (sequelize, DataTypes) => {
  const Domain = sequelize.define(
    "Domain",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      influencer_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(20),
        defaultValue: "active",
      },
      is_personal_domain: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      visits: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      ns_servers: {
        type: DataTypes.JSON,
      },
      login: {
        type: DataTypes.STRING(255),
        defaultValue: "werean",
      },
      logs_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      // design_name: {
      //   type: DataTypes.TEXT,
      //   defaultValue: "Miku",
      // },

      design_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "domain_designs",
          key: "design_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      is_visible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "domains",
      underscored: true,
      timestamps: true,
    }
  );

  // Define associations here
  Domain.associate = (models) => {
    Domain.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    Domain.belongsTo(models.DomainDesign, {
      foreignKey: "design_id",
      as: "design",
    });

    Domain.belongsTo(models.User, {
      foreignKey: "influencer_id",
      as: "influencer",
    });

    Domain.hasMany(models.UserDomain, {
      foreignKey: "domain",
      sourceKey: "name",
      as: "userDomains",
    });

    Domain.hasMany(models.PromoCode, {
      foreignKey: "domain_name",
      sourceKey: "name",
      as: "promoCodes",
    });

    Domain.hasMany(models.PromoVisit, {
      foreignKey: "domain_name",
      sourceKey: "name",
      as: "promoVisits",
    });

    Domain.hasMany(models.PromoLog, {
      foreignKey: "domain_name",
      sourceKey: "name",
      as: "promoLogs",
    });

    // Example for future:
    // Domain.hasMany(models.DomainVisitLog, { foreignKey: 'domain_id' });
  };

  return Domain;
};
