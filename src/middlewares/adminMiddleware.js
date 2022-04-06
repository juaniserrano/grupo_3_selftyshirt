module.exports = (req, res, next) => {
  res.locals.usuarioLogueado = req.session.usuarioLogueado;
  if (req.session.usuarioLogueado.category === 'admin') {
    return next();
  }
  return res.redirect('/');
}