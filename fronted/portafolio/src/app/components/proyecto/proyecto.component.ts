import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../service/project.service'
import {ProjectModel} from '../../models/project'
import {ActivatedRoute, Router} from '@angular/router'
import {global} from '../../service/global.service'

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
  providers:[ProjectService]
})
export class ProyectoComponent implements OnInit {
  public url: string
  public project: ProjectModel

  constructor(private projectService:ProjectService, private activateRoute:ActivatedRoute, private router:Router) { 
    this.url = global.url
  }

  //configuramos el ngOnInit para emitir la funcion al comenzar la pagina 
  ngOnInit(): void {
    //recogemos el id que se envia por la url
    this.activateRoute.params.subscribe(params=>{
      //lo ingresamos dentro de una constante
      const id = params.id
      //ejecutamos la funcion para visualizar los proyectos con el id recogido
      this.viewProject(id)
    })
  }

//configuramos la funcion para obtener todos los proyectos 
  viewProject(id){
    //emitimos la funcion que ejecuta nuestra api 
    this.projectService.view_project(id).subscribe(
      project=>{
        if(project){
          this.project = project.project
        }
      }
    )
  }

  //funcion para elimir un proyecto
  deleteProject(id){
    this.projectService.delete_project(id).subscribe(
      project=>{
        if(project){
          this.router.navigate(['/inicio'])
        }
      }
    )
  }

//funcion para enviar a la pagina de actulizar
  actualizar(id){
    this.router.navigate(['/actualizar/'+id])
  }

}
