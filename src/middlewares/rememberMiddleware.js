const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const User = db.User;

async function getAllUsers() {
  const users = await User.findAll();
  return users;
}

async function recordame(req, res, next) {
  if (!req.session.usuarioLogueado && req.cookies.user) {
    let users = await getAllUsers();
    const usuarioCookies = users.find(function (user) {
      return user.id == req.cookies.user;
    });

    let user = {
      id: usuarioCookies.id,
      first_name: usuarioCookies.first_name,
      last_name: usuarioCookies.last_name,
      image: usuarioCookies.image,
    };

    req.session.usuarioLogueado = user;

    return next();
  } else {
    return next();
  }
}
module.exports = recordame;
