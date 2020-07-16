import {ModuleWithProviders} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

import {InicioComponent} from './components/inicio/inicio.component'
import {CrearComponent} from './components/crear/crear.component'
import {ActualizarComponent} from './components/actualizar/actualizar.component'
import {ErrorComponent} from './components/error/error.component'
import {ProyectoComponent} from './components/proyecto/proyecto.component'

const app: Routes =[
    {path:'', redirectTo:'/inicio', pathMatch:'full'},
    {path:'inicio', component:InicioComponent},
    {path:'crear', component: CrearComponent},
    {path:'actualizar/:id', component:ActualizarComponent},
    {path:'projecto/:id', component:ProyectoComponent},
    {path: '**', component:ErrorComponent}
]


export const RouterModuleWithProviders: any[]  = []
export const appRouting : ModuleWithProviders = RouterModule.forRoot(app)
