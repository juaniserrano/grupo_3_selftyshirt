// module.exports = (sequelize, dataTypes) => {
// 	let alias = 'Order'; // esto debería estar siempre en singular
// 	let cols = {
// 		id: {
//             type: dataTypes.BIGINT(10).UNSIGNED,
//             primaryKey: true,
//             allowNull: false,
//             autoIncrement: true
// 		},
// 		// created_at: dataTypes.TIMESTAMP,
// 		// updated_at: dataTypes.TIMESTAMP,
//         amount: {
// 			type: dataTypes.BIGINT(500),
// 			allowNull: false,
// 		},
//         shipping_address: {
//             type: dataTypes.STRING(200).UNSIGNED,
//             allowNull: false,
//         },
// 		price: {
// 			type: dataTypes.DECIMAL(4, 2).UNSIGNED,
// 			allowNull: false,
// 		},
// 		order_status: {
// 			type: dataTypes.DATEONLY,
// 			allowNull: false,
// 		},
//         category_id: dataTypes.BIGINT(10),
// 		image: dataTypes.STRING(100),
// 	};
// 	let config = {
// 		timestamps: true,
// 		createdAt: 'created_at',
// 		updatedAt: 'updated_at',
// 		deletedAt: false,
// 	};
// 	const Order = sequelize.define(alias, cols, config);

// 	//Hacer associations despues de definir el modelo
// 	//Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)
// 	Order.associate = function (models) {
// 		Order.belongsTo(models.Category, {
// 			as: 'categories',
// 			foreignKey: 'category_id',
// 		});
// 	};

// 	return Order;
// };