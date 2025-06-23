/**
 * Model class for "Product"
 *
 * @param {Sequelize} sequelize - sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} Product - Sequelize model for the Product entity
 */
export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(20),
        defaultValue: "active",
      },
    },
    {
      tableName: "products",
      underscored: true,
      timestamps: true, // Optional if you want created_at and updated_at
    }
  );

  // Define associations here
  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
      as: "owner",
    });

    Product.hasMany(models.ProductSale, {
      foreignKey: "product_id",
      sourceKey: "product_id",
      as: "sales",
    });
  };

  return Product;
};
