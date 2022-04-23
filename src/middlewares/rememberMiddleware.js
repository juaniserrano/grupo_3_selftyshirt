const fs = require("fs");
const path = require("path");

function findAll(){
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/usersDataBase.json")));
    return users;
}

function recordame (req, res , next){
    if(!req.session.usuarioLogueado && req.cookies.user){
        let users = findAll()
        const usuarioCookies = users.find(function(user){
            return user.id == req.cookies.user
        })

        let user = {
            id: usuarioCookies.id,
            name: usuarioCookies.name,
            last_name: usuarioCookies.last_name,
            avatar: usuarioCookies.avatar,
        }

        req.session.usuarioLogueado = user;

        return next()

    }else{
        return next()
    }
}
module.exports = recordame;