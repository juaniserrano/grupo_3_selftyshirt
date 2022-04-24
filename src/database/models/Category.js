module.exports = (sequelize, dataTypes) => {
	let alias = 'Category'; // esto debería estar siempre en singular
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
		}
	};
	let config = {
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: false,
	};
	const Category = sequelize.define(alias, cols, config);

	//Hacer associations despues de definir el modelo
	//Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)
	Category.associate = function (models) {
		Category.belongsTo(models.Category, {
			as: 'categories',
			foreignKey: 'category_id',
		});
	};

	return Category;
};