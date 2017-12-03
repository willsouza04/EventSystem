import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Evento } from './evento';
import { Local } from '../local/local';
import { Convidado } from '../convidado/convidado';

@Injectable()
export class EventoService {

  private locaisUrlFindAll = 'http://localhost:4200/api/local/findAll';

  private eventoUrlFindById = 'http://localhost:4200/api/evento/findById?id=';
  private localUrlFindById = 'http://localhost:4200/api/local/findById?id=';

  private convidadoUrlFindByEvento = 'http://localhost:4200/api/pessoa/findByEvent?id_evento=';
  private convidadoUrlFindByNotEvento = 'http://localhost:4200/api/pessoa/findByNotEvent?id_evento=';

  constructor(private http: Http) { }

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

  public addConvidado(convidado: Convidado): Observable<string> {
    var ConvidadoUrlSave = 'http://localhost:4200/api/pessoa/save?'

    ConvidadoUrlSave += 'nome=' + convidado.nome + '&';
    ConvidadoUrlSave += 'idade=' + convidado.idade + '&';
    ConvidadoUrlSave += 'cpf=' + convidado.cpf;

    var result =  this.http.get(`${ConvidadoUrlSave}`)
      .map((res: Response) => res.toString());
    return result;
  }

  public loadEvento(id: number): Observable<Evento> {
   var result =  this.http.get(`${this.eventoUrlFindById+id}`)
      .map((res: Response) => res.json());
    return result
  }

  public loadLocal(id: number): Observable<Local> {
   var result =  this.http.get(`${this.localUrlFindById+id}`)
      .map((res: Response) => res.json());
      return result
  }

  public loadConvidados(id_evento: number): Observable<Convidado[]>{
    var result =  this.http.get(`${this.convidadoUrlFindByEvento+id_evento}`)
       .map((res: Response) => res.json());
       return result
  }
  public loadNotConvidados(id_evento: number): Observable<Convidado[]>{
    var result =  this.http.get(`${this.convidadoUrlFindByNotEvento+id_evento}`)
       .map((res: Response) => res.json());
       return result
  }

  public Convidar(id_pessoa: number, id_evento: number): Observable<string> {
    var conviteUrlSave = 'http://localhost:4200/api/convite/save?'

    conviteUrlSave += 'id_pessoa=' + id_pessoa + '&';
    conviteUrlSave += 'id_evento=' + id_evento;

    var result =  this.http.get(`${conviteUrlSave}`)
      .map((res: Response) => res.toString());
    return result;
  }

  public loadLocais(): Observable<Local[]> {
   var result =  this.http.get(`${this.locaisUrlFindAll}`)
      .map((res: Response) => res.json());
      return result
  }

  public Remover(id: number): Observable<string> {
    var eventoUrlRemove = 'http://localhost:4200/api/evento/deleteById?id='+id;
    var result =  this.http.get(`${eventoUrlRemove}`)
      .map((res: Response) => res.toString());
    return result;
  }

  public alterarEvento(evento: Evento): Observable<string> {
    var eventoUrlUpdate = 'http://localhost:4200/api/evento/updateById?'

    eventoUrlUpdate += 'id=' + evento.id + '&';
    eventoUrlUpdate += 'id_local=' + evento.id_Local + '&';
    eventoUrlUpdate += 'nome=' + evento.nome + '&';
    eventoUrlUpdate += 'data=' + evento.data + '&';
    eventoUrlUpdate += 'hora=' + evento.hora;

    var result =  this.http.get(`${eventoUrlUpdate}`)
      .map((res: Response) => res.toString());
    return result;
  }

  public RemoverConvite(id_pessoa: number, id_evento: number): Observable<string> {
    var conviteUrlSave = 'http://localhost:4200/api/convite/deleteByIds?'

    conviteUrlSave += 'id_pessoa=' + id_pessoa + '&';
    conviteUrlSave += 'id_evento=' + id_evento;

    var result =  this.http.get(`${conviteUrlSave}`)
      .map((res: Response) => res.toString());
    return result;
  }
}
