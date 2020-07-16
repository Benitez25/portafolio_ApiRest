import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {global}  from './global.service'
import {Observable} from 'rxjs'
import {ProjectModel}  from '../models/project'

@Injectable()
export class ProjectService{
private url : String
    constructor(private httpCliente:HttpClient){
        this.url = global.url
    }

    //view projects
    view_projects():Observable<any>{
        const header = new HttpHeaders().set('Content-Type','application/json')
        return this.httpCliente.get(this.url+'projects', {headers:header})
    }

    //view project
    view_project(_id):Observable<any>{
       const header = new HttpHeaders().set('Content-Type','application/json')
       return this.httpCliente.get(this.url+'view_project/'+_id, {headers:header})
    }

    //save project
    save_project(project:ProjectModel):Observable<any>{
        const header = new HttpHeaders().set('Content-Type','application/json')
        let params = JSON.stringify(project)
        return this.httpCliente.post(this.url+'save', params, {headers:header})
    }

    //delete project
    delete_project(id):Observable<any>{
        const header = new HttpHeaders().set('Content-Type','application/json')
        return this.httpCliente.delete(this.url+'delete/'+id, {headers:header})
    }

    //update project
    update_project(project:ProjectModel):Observable<any>{
        const header = new HttpHeaders().set('Content-Type','application/json')
        let params = JSON.stringify(project) 
        return this.httpCliente.post(this.url+'update/'+project._id, params, {headers:header})
    }

}