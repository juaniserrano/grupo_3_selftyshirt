module.exports = (sequelize, DataTypes) => {
	let alias = 'User'; // esto debería estar siempre en singular
	let cols = {
		id: {
            type: DataTypes.SMALLINT(6).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
		},
		// created_at: DataTypes.TIMESTAMP,
		// updated_at: DataTypes.TIMESTAMP,
        first_name: {
			type: DataTypes.VARCHAR(10),
			allowNull: true,
		},
		last_name: {
			type: DataTypes.VARCHAR(10),
			allowNull: true,
		},
		email: {
			type: DataTypes.VARCHAR(30),
			allowNull: true,
		},
		password: {
			type: DataTypes.VARCHAR(30),
			allowNull: true,
		},
		addres: {
			type: DataTypes.VARCHAR(30),
			allowNull: true,
		},
        phone: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
		},
        role_id: DataTypes.SMALLINT(4),
		image: DataTypes.VARCHAR(100),
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

	return User;
};