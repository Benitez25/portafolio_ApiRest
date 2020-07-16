import { Component, OnInit } from '@angular/core';
import {ProjectModel} from '../../models/project'
import {ProjectService} from '../../service/project.service'
import {UploadService}from '../../service/upload.service'
import {ActivatedRoute} from '@angular/router'
import {global} from '../../service/global.service'

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
  providers: [ProjectService, UploadService]
})
export class CrearComponent implements OnInit {

  public project: ProjectModel
  public fileToUpload: Array<File>
  public status: string
  public view_suc:boolean
  public failed:boolean

  constructor(private projectService: ProjectService, private uploadService: UploadService, private activatedRoute:ActivatedRoute) { 
    this.project = new ProjectModel("", "","","","","")
    this.view_suc = true
    this.failed = true
  }

  ngOnInit(): void {
  }
   //desarrollamos la funcion ngSubmit del formulario
  onSubmit(){
    //realizamos la funcion para guardar proyecto de nuestra api
    this.projectService.save_project(this.project).subscribe(
      project=>{
        if(project){
          //actualiza la imagen del formulario
          this.uploadService.FileRequest(global.url+'update_image/'+project.project._id,[],this.fileToUpload, 'image' )
          //emite una promesa cuando esta se ejecuta y entrega un mensaje satisfactorio  
            .then((result:any)=>{
              if(result){
                this.failed = true
                this.view_suc = false
                this.status = 'Registrado Exitosamente'
              }
            },
            error =>{
              this.view_suc = false
              this.failed = true
              this.status = 'Se registro sin imagen'
            })
        }else{
          this.view_suc = true
          this.failed = false
          this.status = 'No se Registro'
        }
      },
      error=>{
          this.view_suc = true
          this.failed = false
          this.status = 'No se Registro'
      }
    )    
  }
  
//recoge un cambio emitido al cargar un archivo
  fileChange(file:any){
      this.fileToUpload = <Array<File>>file.target.files
      console.log(this.fileToUpload)
  }

}
