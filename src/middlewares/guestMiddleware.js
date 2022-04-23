module.exports = (req, res, next) => {
  console.log(req.session)

  if (req.session.usuarioLogueado) {
    return next();
  }
  res.redirect('../users/login');
}