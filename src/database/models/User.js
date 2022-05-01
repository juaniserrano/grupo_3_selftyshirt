module.exports = (sequelize, DataTypes) => {
	let alias = 'User'; // esto debería estar siempre en singular
	let cols = {
		id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: {
			type: DataTypes.STRING(60),
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING(60),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(60),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(250),
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
        role_id: {
            type: DataTypes.BIGINT(10),
            allowNull: false,
			defaultValue: 1,
        },
        image: {
            type: DataTypes.STRING(200),
        },
		newsletter: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		}
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
		User.belongsTo(models.Role, {
			as: 'role',
			foreignKey: 'role_id'
		});
	}

	return User;
};