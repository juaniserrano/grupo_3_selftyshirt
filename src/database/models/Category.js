module.exports = (sequelize, DataTypes) => {
	let alias = 'Category'; // esto debería estar siempre en singular
	let cols = {
		id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
			type: DataTypes.STRING(60),
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
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id'
        });
    }

	

	return Category;
};