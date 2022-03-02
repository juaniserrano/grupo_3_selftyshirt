const fs = require('fs');
let now = new Date();
const moment = require('moment');
moment.lang('es');

function logMiddleware(req, res, next) {
	fs.appendFileSync('log.txt', 'Se ingreso en la pagina: ' + req.url + ' a las ' + moment(now).format('MM:SS [el dia] Do MMMM [del] YYYY') + '\n');
	next();
}

module.exports = logMiddleware;
