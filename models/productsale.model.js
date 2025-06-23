/**
 * Model class for "ProductSale"
 *
 * @param {Sequelize} sequelize - sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize data types
 *
 * @returns {Model} ProductSale - Sequelize model for the product_sales table
 */
export default (sequelize, DataTypes) => {
  const ProductSale = sequelize.define(
    "ProductSale",
    {
      sale_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "product_id",
        },
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      sold_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "product_sales",
      underscored: true,
    }
  );

  // Define associations here
  ProductSale.associate = (models) => {
    // ProductSale.belongsTo(models.User, {
    //   foreignKey: "user_id",
    //   targetKey: "user_id",
    //   as: "user",
    // });
    ProductSale.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
      as: "product_sales",
    });

    ProductSale.belongsTo(models.Product, {
      foreignKey: "product_id",
      targetKey: "product_id",
      as: "product",
    });
  };

  return ProductSale;
};
