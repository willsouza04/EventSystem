import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Evento } from '../evento/evento';
import { Convidado } from '../convidado/convidado';

@Injectable()
export class ConvidadoService {

  private convidadoUrlFindById = 'api/pessoa/findById?id='
  private eventoUrlFindByConvidado = 'api/evento/findByPessoa?id_pessoa='

  constructor(private http: Http) { }

  public loadConvidado(id: number): Observable<Convidado> {
   var result =  this.http.get(`${this.convidadoUrlFindById+id}`)
      .map((res: Response) => res.json());
    return result
  }

  public loadEventos(id_convidado: number): Observable<Evento[]>{
    var result =  this.http.get(`${this.eventoUrlFindByConvidado+id_convidado}`)
       .map((res: Response) => res.json());
       return result
  }

  public Remover(id: number): Observable<string> {
    var convidadoUrlRemove = 'http://localhost:4200/api/pessoa/deleteById?id='+id;
    var result =  this.http.get(`${convidadoUrlRemove}`)
      .map((res: Response) => res.toString());
    return result;
  }

  public alterarConvidado(convidado: Convidado): Observable<string> {
    var convidadoUrlUpdate = 'http://localhost:4200/api/pessoa/updateById?'

    convidadoUrlUpdate += 'id=' + convidado.id + '&';
    convidadoUrlUpdate += 'nome=' + convidado.nome + '&';
    convidadoUrlUpdate += 'idade=' + convidado.idade + '&';
    convidadoUrlUpdate += 'cpf=' + convidado.cpf;

    var result =  this.http.get(`${convidadoUrlUpdate}`)
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
