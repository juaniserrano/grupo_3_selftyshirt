const { check, body } = require("express-validator")
const fs = require("fs");
const path = require("path");

function findAll(){
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../src/data/usersDataBase.json")));
    console.log(users)
    return users;
}

const validator = {
    login:[
        check("email")
            .notEmpty()
            .withMessage("Campo email vacio"),
        check("password")
            .notEmpty()
            .withMessage("Campo password vacio")
    ],
    register:[
        check("email")
            .notEmpty()
            .withMessage("Email vacio")
            .bail()
            .isEmail()
            .withMessage("Formato de email incorrecto")
            .bail()
            .custom(function(value){
                // let users = findAll()
                // //busco al usuario
                // let userFound = users.find(function(user){
                //     return user.email == value
                // })
                // //si existe un usuario devuelvo el error
                // if(userFound){
                //     throw new Error("Email ya registrado!");
                // }
                // //sino devuelvo true
                return true
            })
            ,
        check("first_name")
            .notEmpty()
            .withMessage("Campo Nombre vacio")
            .isLength({min:2})
            .withMessage("El Nombre debe contener al menos 2 caracteres"),
        check("last_name")
            .notEmpty()
            .withMessage("Campo Apellido vacio")
            .isLength({min:2})
            .withMessage("El Apellido debe contener al menos 2 caracteres"),
        check("password")
            .notEmpty()
            .withMessage("campo Password vacio")
            .isLength({min:8})
            .withMessage("La contraseña debe contener al menos 8 caracteres")
    ]
}

module.exports = validator