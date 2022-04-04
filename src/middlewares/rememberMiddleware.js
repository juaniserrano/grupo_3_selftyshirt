function rememberMiddleware(req, res, next){
  next();

  if(req.cookies.remember != undefined && req.session.usuarioLogueado == undefined){ 

  }
}
