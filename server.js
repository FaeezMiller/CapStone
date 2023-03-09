const express=require('express');
const routes = require('./contoller');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = parseInt(process.env.port) || 3030;
const app = express();
const {errorHandling} = require('./middleware/errorHandling');

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:8080');
    res.header('Access-Control-Allow-Credentials','true');
    res.header('Access-Control-Allow-Methods','*');
    res.header('Access-Control-Allow-Headers','*');
    next();
});

app.use(routes);
app.use(cors(), cookieParser(), express.json(), express.urlencoded({extended: false}));

app.listen(port,()=>{
    console.log('Server running on port 3030')
});
app.use(errorHandling);