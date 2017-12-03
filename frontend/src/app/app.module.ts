import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { menuComponent } from './menu/menu.component';
import { eventosComponent } from './eventos/eventos.component';
import { HomeComponent } from './home/home.component';
import { ConvidadoComponent } from './convidado/convidado.component';
import { EventoComponent } from './evento/evento.component';

import { EventosService } from './eventos/eventos.service';
import { EventoService } from './evento/evento.service';
import { ConvidadoService } from './convidado/convidado.service';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown'

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { appRoutes } from './app.routes';
@NgModule({
  declarations: [
    AppComponent,
    menuComponent,
    eventosComponent,
    HomeComponent,
    ConvidadoComponent,
    EventoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot()

  ],
  providers: [EventosService, EventoService, ConvidadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
