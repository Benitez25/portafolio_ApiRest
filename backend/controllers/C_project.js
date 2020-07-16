var Project = require('../models/project')
//file System
var fs = require('fs')
//ubicacion
var path = require('path')

const c_project = {
    //function para mostrar un proyecto seleccionado por el id
    view_project:function(req, res){
        //recogemos el id por url y lo ingresamos a una constante
        const id = req.params.id
        //utilizamos 'finById' e ingresamos nuestra constante id para buscarlo en la base de datos
        Project.findById(id).exec((error, project)=>{
            //validamos un error y si no existe el project
            if(error) return res.status(500).send({mensaje:'Error al mostrar el projecto'})
            if(!project) return res.status(404).send({mensaje:'Error con el servidor'})
            //si salta  las validaciones anteriores entonces ejecuta la respuesta mostrando los datos del projecto
            return res.status(200).send({ project})
        })
    },
    //function para mostrar todos los proyectos
    projects:function(req, res){
        //efectuamos el metodo find() para mostrar todos los proyectos
        Project.find({}).exec((error, project)=>{
             //validamos un error y si no existe el project
            if(error) return res.status(500).send({mensaje:'Error al mostrar los projectos'})
            if(!project) return res.status(404).send({mensaje:'Error con el servidor'})
             //si salta  las validaciones anteriores entonces ejecuta la respuesta mostrando todos los proyectos
            return res.status(200).send({project})
        })
    },
    //function para guardar un proyecto
    save:function(req, res){
        //creamos una variable para agregar un nuevo proyecto
        const project = new Project()
        //recogemos todo los datos del body en una variable
        const params = req.body
        //cada variable recogida del body le asignamos a un dato de nuestro nuevo proyecto creado 
        project.name = params.name
        project.description = params.description
        project.category = params.category
        project.technology = params.technology
        //el dato de la imagen se agrega por otra funcion porque se utilizan para actualizar y para guardar un proyecto
        project.image = ""
        //utilizamos el metodo save para guardar nuestro proyecto creado
        project.save((error, project)=>{
            //validamos un error y si no existe el project
            if(error) return res.status(500).send({mensaje:'Error al guardar projecto'})
            if(!project) return res.status(404).send({mensaje:'Error con el servidor'})
            //si salta las validaciones anteriores entonces guarda el proyecto
            return res.status(200).send({project})
        })
    },
    //function para eliminar un proyecto
    delete:function(req, res){
        //recoger el id de la url y lo agregamos a una constante
        const id = req.params.id
        //hacemos uso del metodo findByIdAndRemove para eliminar proyecto, le agregamos el id porque es el id a eliminar
        Project.findByIdAndRemove(id, (error, project)=>{
            //validamos un error y si no existe el project
            if(error) return res.status(500).send({mensaje:'Error al eliminar projecto'})
            if(!project) return res.status(404).send({mensaje:'Error con el servidor'})
            //si salta las validaciones anteriores entonces elimna el proyecto
            return res.status(200).send({project})         
        })
    },
    //function para actualizar un proyecto
    update:function(req, res){
        //recogemos el id enviamos por la url y le asignamos una constante
        const id = req.params.id
        //recogemos todo el dato del body
        const data =  req.body
        //utilizamos el metodo findByIdAndUpdate para actualizar el proyecto con el id enviado y todo el dato seleccionado, {new:true} para mostrar el archivo actualizado
        Project.findByIdAndUpdate(id, data, {new:true}, (error, project)=>{
            //validamos un error y si no existe el project
            if(error) return res.status(500).send({mensaje:'Error al eliminar projecto'})
            if(!project) return res.status(404).send({mensaje:'Error con el servidor'})
            //si salta las validaciones anteriores entonces actualiza el proyecto
            return res.status(200).send({project})
        })
    },
    //function para actualizar la imagen de un proyecto
    update_image:function(req, res){
        //recogemos el id del proyecto que queremos actualizar con la imagen
        const id = req.params.id
        //validamos que exista este tipo de archivo
        if(req.files){
            //asignamos una constante para el dato de la imagen - req.files.image.path - es la ubicacion con el nombre de nuestra imagen 
            const filePath = req.files.image.path
            //agregamos a una constante este nombre recogido
            const beforePath = filePath
            //lo separamos con un split
            const afterPath = beforePath.split('\\')
            //recogemos el segundo dato que es el nombre del archivo con su tipo de archivo
            const FileName = afterPath[1]
            //separamos el nombre y el tipo de archivo con un split
            const extPath = FileName.split('\.')
            //recogemos el segundo dato que el tipo de archivo
            const typeName = extPath[1]
            //con el tipo de archivo validamos que terminacion tiene para no guardar otro tipo file
            if(typeName == 'png' || typeName == 'jpg' || typeName == 'gif' || typeName == 'jpeg'){
                //si es valido el tipo entonces lo actualizamos con el metodo findByIdAndUpdate, el id asignado y solo modificamos el {imagen:?}
                Project.findByIdAndUpdate(id, {image:FileName}, {new:true}, (error, project)=>{
                    //validamos un error y si no existe el project
                    if(error) return res.status(500).send({mensaje:'Error actualizando la imagen'})
                    if(!project) return res.status(404).send({mensaje:'Error con el servidor'})
                    //si salta las validaciones anteriores entonces actualiza la imagen del proyecto            
                    return res.status(200).send({project})
                })
            //en caso de tener otro tipo de file hacemos un else
            }else{
                //eliminamos lo almacenado con un fs y su metodo unlink, le pasamos la const con el nombre de achivo
                fs.unlink(filePath, (error)=>{
                    //mostramos un mensaje de error de formato
                    return res.status(500).send({mensaje:'tipo de formato no permitido'})
                })
            } 
        //en caso de no existir un dato tipo file enviamos un error    
        }else{
           return res.status(500).send({mensaje:'error al cargar la imagen'})
        }
    },

    //funcion para mostrar la imagen almacenada
    getImagen:function(req, res){
        //recogemos el dato enviado por la url, el nombre del file y lo guardamos en una constante
        const file = req.params.file
        //almacenamos la ubicacion de nuestra imagen en una constante
        const path_file  = './uploads/'+file
        //hacemos una validacion de la existencia de path_file que hemos almacenado y de ser cierto enviamos un mensaje
        fs.exists(path_file, (exists)=>{
            //en caso de ser verdad la existencia
            if(exists){
                //retornamos con un metodo sendFile para devolver la imagen
                return res.sendFile(path.resolve(path_file))
            //en caos contrario
            }else{
                //retornamos un mensaje de error, que no existe esta imagen 
                return res.status(200).send({mensaje:'no existe imagen'})
            }
        })
    }

}

module.exports = c_project