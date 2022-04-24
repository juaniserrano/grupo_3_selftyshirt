module.exports = (sequelize, dataTypes) => {
	let alias = 'User'; // esto debería estar siempre en singular
	let cols = {
		id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
		},
		// created_at: dataTypes.TIMESTAMP,
		// updated_at: dataTypes.TIMESTAMP,
        first_name: {
			type: dataTypes.STRING(500),
			allowNull: false,
		},
        last_name: {
			type: dataTypes.STRING(500),
			allowNull: false,
		},
		email: {
			type: dataTypes.STRING(500),
			allowNull: false,
		},
		password: {
			type: dataTypes.STRING(200).UNSIGNED,
			allowNull: false,
		},
        phone: {
            type: dataTypes.INT(100).UNSIGNED,
            allowNull: false,
        },
        role_id: dataTypes.BIGINT(10),
		image: dataTypes.STRING(100),
	};
	let config = {
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: false,
	};
	const User = sequelize.define(alias, cols, config);

	//Hacer associations despues de definir el modelo
	//Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)
	User.associate = function (models) {
		User.belongsTo(models.Category, {
			as: 'categories',
			foreignKey: 'category_id',
		});
	};

	return User;
};