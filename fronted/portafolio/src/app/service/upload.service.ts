import {Injectable} from '@angular/core'
import {global} from './global.service'


@Injectable()
export class UploadService{
    
    public url:string
    
    constructor(){
        this.url=global.url
    }
    //Funcion para solicitar un archivo de la base de datos
    //como primera instancia solicita la url de la API, parametro, file, nombre
    FileRequest(url:string, params:Array<string>, file:Array<File>,name:string){
        //retornamos una nueva promesa, con los datos resolve para devolver lo validado o reject para devolver error
        return new Promise(function(resolve, reject){
            //creamos un formulario y lo adjuntamos a un  objeto
            var formData: any = new  FormData
            //usamos un nuevo XMLHttpRequest para la actualizacion de la imagen de manera asincronica.
            var xhr= new XMLHttpRequest()
            //creamos un arreglo para recoger la cantidad de archivos que pueden llegar 
            for(var i = 0; i < file.length; i++ ){
                //adjuntamos el archivo
                formData.append(name, file[i], file[i].name)
            }
            //hacemos la peticion si exite un cambio con onreadystatechange
            xhr.onreadystatechange = function(){
                //comprobamos si existe cambio, siempre es 4
                if(xhr.readyState == 4 ){
                    // hacemos un status 200 y enviamos el resolve por json 
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response))
                    // si no devuelve el status 200, enviamos un reject
                    }else{
                        reject(xhr.response)
                    }
                }
            }
            //hacemos la peticion, por metodo post, a la url de la api y true para confirmar
            xhr.open('POST', url, true)
            //que envie todo el formulario
            xhr.send(formData)
        })

    }

}