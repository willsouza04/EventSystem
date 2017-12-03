import { RouterModule, Routes } from '@angular/router';

import { menuComponent } from './menu/menu.component'
import { HomeComponent } from './home/home.component'
import { eventosComponent } from './eventos/eventos.component'
import { EventoComponent } from './evento/evento.component'
import { ConvidadoComponent } from './convidado/convidado.component'

export const appRoutes: Routes = [
  { path: 'menu', component: menuComponent },
  { path: 'home', component: HomeComponent },
  { path: 'evento/:id', component: EventoComponent },
  { path: 'convidado/:id', component: ConvidadoComponent },
  { path: 'eventos', component: eventosComponent }
];
