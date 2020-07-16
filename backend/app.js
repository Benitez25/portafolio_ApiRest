const express = require('express')
const body_parser= require('body-parser')
const ruta = require('./routers/R_project')

const app = express()

app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:false}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api',ruta)

module.exports = app