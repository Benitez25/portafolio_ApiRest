import { Component, OnInit } from '@angular/core';
import {ProjectModel} from '../../models/project'
import {ProjectService} from '../../service/project.service'
import {UploadService}from '../../service/upload.service'
import {ActivatedRoute, Router} from '@angular/router'
import {global} from '../../service/global.service'

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css'],
  providers:[ProjectService,UploadService ]
})
export class ActualizarComponent implements OnInit {

  public view_suc : boolean
  public failed :boolean
  public status : string
  public project: ProjectModel
  public url:string
  public fileToUpload: Array<File>

  constructor(private projectService:ProjectService, private activateRoute:ActivatedRoute, private router:Router, private uploadService: UploadService,) {
    this.view_suc = true
    this.failed = true
    this.url = global.url
    this.project = new ProjectModel("", "","","","","")

   }
//Configuramos un ngOnInit para poder visualizar los datos dentro del formulario
  ngOnInit(): void {
    //recibimos el id del parametro con un params
    this.activateRoute.params.subscribe(params=>{
      //guarmos el id registrado
      const dato = params.id
      //dentro de la funcion ingresamos lo que registrmamos 'dato'
      this.viewProject(dato)
    })
  }
//function para vizualizar los datos de un proyecto
  viewProject(id){
    this.projectService.view_project(id).subscribe(
      project=>{
        if(project){
          this.project = project.project
        }
      }
    )
  }

  //Configuramos el ngSubmit que emite el formulario
  onSubmit(){
    //llamamos a nuestro funcion para actualizar el proyecto
    this.projectService.update_project(this.project).subscribe(
      project=>{
        if(project){
          //verificamos si existe una imagen dentro de nuestro formulario
          if(this.fileToUpload){
            //hacemos la funcion de actualizar una imagen una vez confirmamos la actualizacion de los datos del proyecto
            //los parametros que se envian son, 1. la url con la api mas el id del proyecto a al cual se va a actualizar
            //2. un arreglo vacio
            //3. se evia la imagen que se va a actualizar
            //4. la variable imagen
            this.uploadService.FileRequest(global.url+'update_image/'+project.project._id,[],this.fileToUpload, 'image' )
            .then((result:any)=>{
              //si valida esta actualizacion entonces emite un resultado
              if(result){
                this.failed = true
                this.view_suc = false
                this.status = 'Registrado Exitosamente'
              }
            },
            //si no valida esta actualizacion entonces emite un resultado que actualiza los datos del proyecto pero no de la imagen
            error =>{
              console.log(error)
              this.view_suc = true
              this.failed = false
              this.status = 'No se Registro1'
            })
          }else{
                this.failed = true
                this.view_suc = false
                this.status = 'Registrado Exitosamente'
          }
        }else{
          this.view_suc = true
          this.failed = false
          this.status = 'No se Registro2'
        }
      },
      error=>{
        this.view_suc = true
        this.failed = false
        this.status = 'No se Registro3'
    }
    )  
    
  }


//recoge un cambio emitido al cargar un archivo
  fileChange(file:any){
    this.fileToUpload = <Array<File>>file.target.files
  }

}
