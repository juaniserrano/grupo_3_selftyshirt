module.exports = (sequelize, dataTypes) => {
	let alias = 'Product'; // esto debería estar siempre en singular
	let cols = {
		id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
		},
		// created_at: dataTypes.TIMESTAMP,
		// updated_at: dataTypes.TIMESTAMP,
        name: {
			type: dataTypes.STRING(500),
			allowNull: false,
		},
		price: {
			type: dataTypes.DECIMAL(4, 2).UNSIGNED,
			allowNull: false,
		},
		description: {
			type: dataTypes.STRING(200).UNSIGNED,
			allowNull: false,
		},
		stock: {
			type: dataTypes.INT(100).UNSIGNED,
			allowNull: false,
		},
        category_id: dataTypes.BIGINT(10),
		image: dataTypes.STRING(100),
	};
	let config = {
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: false,
	};
	const Product = sequelize.define(alias, cols, config);

	//Hacer associations despues de definir el modelo
	//Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)
	Product.associate = function (models) {
		Product.belongsTo(models.Category, {
			as: 'categories',
			foreignKey: 'category_id',
		});
	};

	return Product;
};