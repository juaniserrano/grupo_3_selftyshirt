const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'juanignacioserranoluna@gmail.com',
        pass: 'gkharrucjuhkhaeo',
    },
});

let mailDetails = {
    from: '"Selfty Shirt 👕" <selftyshirt@gmail.com>', // sender address
    to: 'juanignacioserranoluna@gmail.com',
    subject: 'Gracias por suscribirte a nuestro Newsletter',
    text: 'Node.js testing mail for GeeksforGeeks',
    //Newsletter html
    html: `<h1>Gracias por suscribirte a nuestro Newsletter</h1>
    <p> Ahora te avisaremos cada vez que publiquemos un nuevo producto y las mejores ofertas.</p>
    <p> ¡Te deseamos un buen día!</p>
    <p> ¡Saludos!</p>
    <p> El equipo de Selfty Shirt 👕</p>
    <img src="https://res.cloudinary.com/juaniserrano/image/upload/v1654189155/logo-orange-blue_fdipgs.png" alt="logo" border="0" width="200px" />`,
};

mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
        console.log('Error Occurs', err);
    } else {
        console.log('Email sent successfully');
    }
});
