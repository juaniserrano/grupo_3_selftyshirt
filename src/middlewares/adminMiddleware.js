module.exports = (req, res, next) => {
  res.locals.usuarioLogueado = req.session.usuarioLogueado;
  console.log(req.session)
  if (req.session.usuarioLogueado && req.session.usuarioLogueado.category == 'admin') {
    return next();
  }
  return res.redirect('/?notAllowed=true');
}