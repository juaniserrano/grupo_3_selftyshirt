module.exports = (req, res, next) => {

  if (req.session.usuarioLogueado) {
    return next();
  }
  res.redirect('/login');
}