module.exports = (sequelize, DataTypes) => {
  let alias = 'Order'; // esto debería estar siempre en singular
  let cols = {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    shipping_adress: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    order_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    order_status: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
  };
  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
  };
  const Order = sequelize.define(alias, cols, config);

  //Hacer associations despues de definir el modelo
  //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
    });
  };

  return Order;
};
