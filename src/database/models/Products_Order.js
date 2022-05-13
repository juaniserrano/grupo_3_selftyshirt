module.exports = (sequelize, DataTypes) => {
  let products = require('./Product');
  let orders = require('./Order');
  let alias = 'Products_Order';
  let cols = {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      foreignKey: 'product_id',
      references: {
        model: sequelize.models.products,
        key: 'id',
      },
    },
    order_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      foreignKey: 'order_id',
      references: {
        model: sequelize.models.Order,
        key: 'id',
      },
    },
    price: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
  };
  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
  };
  const Products_Order = sequelize.define(alias, cols, config);

  Products_Order.associate = function (models) {
    Products_Order.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'product_id',
    });
    Products_Order.belongsTo(models.Order, {
      as: 'order',
      foreignKey: 'order_id',
    });
  };

  // Products_Order.associate = function (models) {
  //   Products_Order.belongsTo(products, { as: 'Product', foreignKey: 'product_id' });
  //   Products_Order.belongsTo(orders, { as: 'Order', foreignKey: 'order_id' });
  // };
  return Products_Order;
};
