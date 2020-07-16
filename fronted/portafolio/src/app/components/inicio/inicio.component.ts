import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../service/project.service'
import {ProjectModel} from '../../models/project'
import {global} from '../../service/global.service'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [ProjectService]
})
export class InicioComponent implements OnInit {
  public projects: ProjectModel[] 
  public url:string
  public message:string
  constructor( private projectService: ProjectService) {
    this.url = global.url
    this.message = 'Crear nuevo projecto'
   }

  ngOnInit(): void {
    this.view_project()
  }
  //emite la funcion para mostrar los proyectos dentro de la pagina principal con la api creado en el backend
  view_project(){
    this.projectService.view_projects().subscribe(
      result=>{
        if(result){
          this.projects = result.project
        }
      },
      error=>{
        console.log(error)
      }
    )
  }

}
