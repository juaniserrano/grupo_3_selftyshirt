module.exports = (sequelize, DataTypes) => {
	let alias = 'Product'; // esto debería estar siempre en singular
	let cols = {
		id: {
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
		},
		// created_at: DataTypes.TIMESTAMP,
		// updated_at: DataTypes.TIMESTAMP,
        name: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		price: {
			type: DataTypes.DECIMAL(4, 2).UNSIGNED,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		stock: {
			type: DataTypes.BIGINT(100).UNSIGNED,
			allowNull: false,
		},
		discount: {
			type: DataTypes.SMALLINT(3).UNSIGNED,
			allowNull: false,
		},
        category_id: DataTypes.BIGINT(10),
		image: DataTypes.STRING(100),
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

	return Product;
};