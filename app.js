const express = require('express');
const app = express();
app.use(express.static('public'));


app.listen(3000, ()=>{
    console.log('Servidor funcionando');
});

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/index.html');
<<<<<<< HEAD
});
=======
});

app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/views/login.html');
});
>>>>>>> 6559b4e6d6f04dc8fb8889402a2080e226874fc1
