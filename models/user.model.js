// /**
//  * Model class for "skill"
//  *
//  * @author Chetan Patil
//  *
//  * @param {Sequelize} sequelize - sequelize object
//  * @param {Sequelize.DataTypes} DataTypes - sequelize datatypes
//  *
//  * @returns User - sequelize model for user entity
//  */
// export default (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     gender: {
//       type: DataTypes.ENUM,
//       values: ['Male', 'Female', 'Other'],
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   }, {
//     tableName: 'user',
//     underscored: true,
//   });

//   User.associate = models => {
//     models.User.hasMany(models.Skill, { foreignKey: 'userId', targetId: 'id' });
//   };
//   return User;
// };

/**
 * Model class for "User"
 *
 * @param {Sequelize} sequelize - sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} User - Sequelize model for the User entity
 */
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      user_role: {
        type: DataTypes.STRING(250),
        // defaultValue: "user",
        defaultValue: "worker",
      },
      progress: {
        type: DataTypes.STRING(250),
        defaultValue: "40.0%",
      },
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      logs: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      sales: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      hold: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      invited_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      allowed_domains_count: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
      },
      status: {
        type: DataTypes.ENUM("new", "work", "ban"),
        defaultValue: "new",
      },
      owner_panel: {
        type: DataTypes.STRING(250),
        defaultValue: "werean",
      },
      hold_until: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      last_activity: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "users",
      underscored: true,
    }
  );

  // Define associations here
  User.associate = (models) => {
    User.belongsTo(models.User, {
      foreignKey: "invited_by",
      targetKey: "user_id",
      as: "inviter",
    });

    User.hasMany(models.Referral, {
      foreignKey: "inviter_id",
      as: "referrals",
    });

    //One User can be influencer for many Domains
    User.hasMany(models.Domain, {
      foreignKey: "influencer_id",
      as: "influencedDomains", // optional alias
    });

    User.hasMany(models.UserDomain, {
      foreignKey: "user_id",
      sourceKey: "user_id",
      as: "userDomains",
    });

    User.hasMany(models.PromoCode, {
      foreignKey: "user_id",
      as: "promoCodes",
    });

    User.hasMany(models.Product, {
      foreignKey: "user_id",
      sourceKey: "user_id",
      as: "products",
    });

    User.hasMany(models.ProductSale, {
      foreignKey: "user_id",
      sourceKey: "user_id",
      as: "product_sales",
    });

    User.hasMany(models.Withdrawal, {
      foreignKey: "user_id",
      sourceKey: "user_id",
      as: "withdrawals",
    });

    User.hasMany(models.Transfer, {
      foreignKey: "sender_id",
      sourceKey: "user_id",
      as: "sent_transfers",
    });

    User.hasMany(models.Transfer, {
      foreignKey: "recipient_id",
      sourceKey: "user_id",
      as: "received_transfers",
    });

    User.hasMany(models.ApiLog, {
      foreignKey: "user_id",
      sourceKey: "user_id",
      as: "api_logs",
    });

    User.hasMany(models.Ticket, {
      foreignKey: "user_id",
      sourceKey: "user_id",
      as: "tickets",
    });

    User.hasOne(models.ProfileSetting, {
      foreignKey: "user_id",
      sourceKey: "user_id",
      as: "profileSetting",
    });

    User.hasOne(models.NotificationSetting, {
      foreignKey: "user_id",
      sourceKey: "user_id",
      as: "notificationSetting",
    });
    // Example for potential future relationships
    // User.hasMany(models.SomeModel, { foreignKey: 'user_id' });
  };

  return User;
};
