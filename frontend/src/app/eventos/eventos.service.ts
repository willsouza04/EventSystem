import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Evento } from '../evento/evento';
import { Local } from '../local/local';

@Injectable()
export class EventosService {

  private eventosUrlFindAll = 'http://localhost:4200/api/evento/findAll';
  private locaisUrlFindAll = 'http://localhost:4200/api/local/findAll';

  constructor(private http: Http) { }

  public addEvento(evento: Evento): Observable<string> {
    var eventosUrlSave = 'http://localhost:4200/api/evento/save?'

    eventosUrlSave += 'id_local=' + evento.id_Local + '&';
    eventosUrlSave += 'nome=' + evento.nome + '&';
    eventosUrlSave += 'data=' + evento.data + '&';
    eventosUrlSave += 'hora=' + evento.hora;

    var result =  this.http.get(`${eventosUrlSave}`)
      .map((res: Response) => res.toString());
    return result;
  }

  public addLocal(local: Local): Observable<string> {
    var locaisUrlSave = 'http://localhost:4200/api/local/save?'

    locaisUrlSave += 'nome=' + local.nome + '&';
    locaisUrlSave += 'rua=' + local.rua + '&';
    locaisUrlSave += 'numero=' + local.numero + '&';
    locaisUrlSave += 'cidade=' + local.cidade;

    var result =  this.http.get(`${locaisUrlSave}`)
      .map((res: Response) => res.toString());
    return result;
  }

  public loadEventos(): Observable<Evento[]> {
   var result =  this.http.get(`${this.eventosUrlFindAll}`)
      .map((res: Response) => res.json());
    return result
  }

  public loadLocais(): Observable<Local[]> {
   var result =  this.http.get(`${this.locaisUrlFindAll}`)
      .map((res: Response) => res.json());
      return result
  }
}
