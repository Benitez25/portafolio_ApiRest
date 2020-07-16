
const mongoose = require('mongoose')

const app = require('./app')

const port = 3000 

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify',false)

mongoose.connect('mongodb://localhost:27017/portafolio', {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>{
        console.log("Conectado al mongo DB")
        app.listen(port, ()=>{
            console.log("Conectado al servidor")
        })

    })