import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConvidadoService } from './convidado.service';

import { Evento } from '../evento/evento';
import { Convidado } from '../convidado/convidado';

@Component({
  selector: 'app-convidado',
  templateUrl: './convidado.component.html',
  styleUrls: ['./convidado.component.css']
})
export class ConvidadoComponent implements OnInit {

  public convidado = new Convidado();

  public eventos: Evento[] = [];

  public idadeConvidado = '';

  constructor(
    private router: Router,
    private convidadoService: ConvidadoService
  ) { }

  ngOnInit() {
    this.convidado.id = parseInt(this.router.url.split('/')[2])
    this.CarregarConvidado();
  }

  public CarregarConvidado(){
    this.convidadoService.loadConvidado(this.convidado.id)
      .subscribe(res => {
        this.convidado = res;
        this.CarregarEventos();
      }, err => {});
  }

  public CarregarEventos(){
    this.convidadoService.loadEventos(this.convidado.id)
      .subscribe(res => {
        this.eventos = res;
        console.log(this.convidado)
        console.log(this.eventos)
      }, err => {});
  }

  public AbrirEvento(id){
    window.location.href = "/evento/" + id;
  }

  public AlterarConvidado(){
    this.idadeConvidado = (this.convidado.idade)+'';
    document.getElementById("alterarConvidado").style.display = 'block';
    document.getElementById("lista").style.display = 'none';
  }

  public SalvarConvidado(){
    const convidado = this.convidado;
    convidado.idade = parseInt(this.idadeConvidado);

    this.convidadoService.alterarConvidado(convidado)
      .subscribe(res => {
        this.AbrirSuccess();
        this.VoltarAlterarConvidado();
      }, err => {
        this.AbrirError();
        this.VoltarAlterarConvidado();
      });
  }

  public RemoverConvidado(){
    document.getElementById("RemoverConvidado").style.display = 'block';
    document.getElementById("ButtonsConvidado").style.display = 'none';
  }

  public ConfirmarRemover(){
    this.convidadoService.Remover(this.convidado.id)
      .subscribe(res => {
        this.VoltarParaEventos();
      }, err => {
      });
  }

  public RemoverConvite(id_evento){
    this.convidadoService.RemoverConvite(this.convidado.id, id_evento)
      .subscribe(res => {
        this.CarregarEventos();
      }, err => {
        this.AbrirError();
      });
  }

  public VoltarAlterarConvidado(){
    this.CarregarConvidado();
    document.getElementById("alterarConvidado").style.display = 'none';
    document.getElementById("lista").style.display = 'block';
  }

  public VoltarRemover(){
    document.getElementById("RemoverConvidado").style.display = 'none';
    document.getElementById("ButtonsConvidado").style.display = 'block';
  }

  public VoltarParaEventos(){
    window.location.href = "/eventos";
  }

  public AbrirError(){
    document.getElementById("error").style.display = 'block';
    document.getElementById("success").style.display = 'none';
  }

  public AbrirSuccess(){
    document.getElementById("success").style.display = 'block';
    document.getElementById("error").style.display = 'none';
  }

  public CloseAlert(){
    document.getElementById("error").style.display = 'none';
    document.getElementById("success").style.display = 'none';
  }
}
