const express = require('express')
const c_project = require('../controllers/C_project')

const rutas = express.Router()

//configurar middleware
const multipart = require('connect-multiparty')
//configurar una ruta para almacenar las imagenes
var up = multipart({uploadDir: './uploads'}) 

rutas.get('/view_project/:id', c_project.view_project)
rutas.get('/projects', c_project.projects)
rutas.post('/save', c_project.save)
rutas.delete('/delete/:id', c_project.delete)
rutas.post('/update/:id', c_project.update)
rutas.post('/update_image/:id',up, c_project.update_image)
rutas.get('/getImagen/:file', c_project.getImagen)

module.exports = rutas
