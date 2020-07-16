import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {RouterModuleWithProviders, appRouting} from './app.routing'

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CrearComponent } from './components/crear/crear.component';
import { ActualizarComponent } from './components/actualizar/actualizar.component';
import { ErrorComponent } from './components/error/error.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CrearComponent,
    ActualizarComponent,
    ErrorComponent,
    ProyectoComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    FormsModule,
    HttpClientModule
  ],
  providers: [RouterModuleWithProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
