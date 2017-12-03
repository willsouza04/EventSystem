import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from './evento.service';

import { Evento } from './evento';
import { Local } from '../local/local';
import { Convidado } from '../convidado/convidado';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  public evento = new Evento();
  public local = new Local();
  public convidado = new Convidado();

  public locais: Local[] = [];
  public convidados: Convidado[] = [];
  public notConvidados: Convidado[] = [];

  public localEvento = '';
  public dataEvento = '';
  public numeroLocal = '';
  public idadeConvidado = '';

  constructor(
    private router: Router,
    private eventoService: EventoService
  ) {  }

  ngOnInit() {
    this.evento.id = parseInt(this.router.url.split('/')[2])
    this.CarregarEvento();
  }

  public CarregarEvento(){
    this.eventoService.loadEvento(this.evento.id)
      .subscribe(res => {
        this.evento = res;
        this.CarregarLocal();
      }, err => {});
  }

  public CarregarLocal(){
    this.eventoService.loadLocal(this.evento.id_Local)
      .subscribe(res => {
        this.local = res;
        this.CarregarConvidados();
      }, err => {});
  }

  public CarregarConvidados(){
    this.eventoService.loadConvidados(this.evento.id)
      .subscribe(res => {
        this.convidados = res;
      }, err => {});
  }

  public CarregarLocais(){
    this.eventoService.loadLocais()
      .subscribe(res => {
        this.locais = res;
      }, err => {});
  }

  public AbrirConvidado(id){
    window.location.href = "/convidado/" + id;
  }

  public AbrirConvidar(){
    this.CarregarNaoConvidados();
    document.getElementById("Convidar").style.display = 'block';
    document.getElementById("lista").style.display = 'none';
  }

  public CarregarNaoConvidados(){
    this.eventoService.loadNotConvidados(this.evento.id)
      .subscribe(res => {
        this.notConvidados = res;
      }, err => {});
  }

  public Convidar(id_pessoa){
    this.eventoService.Convidar(id_pessoa, this.evento.id)
      .subscribe(res => {
        this.AbrirSuccess();
        this.CarregarNaoConvidados();
      }, err => {
        this.AbrirError();
      });
  }

  public RemoverConvite(id_convidado){
    this.eventoService.RemoverConvite(id_convidado, this.evento.id)
      .subscribe(res => {
        this.CarregarConvidados();
      }, err => {
        this.AbrirError();
      });
  }

  public AlterarEvento(){
    this.CarregarLocais();
    document.getElementById("alterarEvento").style.display = 'block';
    document.getElementById("lista").style.display = 'none';
  }

  public RemoverEvento(){
    document.getElementById("RemoverEvento").style.display = 'block';
    document.getElementById("ButtonsEvento").style.display = 'none';
  }

  public ConfirmarRemover(){
    this.eventoService.Remover(this.evento.id)
      .subscribe(res => {
        this.VoltarParaEventos()
      }, err => {
      });
  }

  public VoltarRemover(){
    document.getElementById("RemoverEvento").style.display = 'none';
    document.getElementById("ButtonsEvento").style.display = 'block';
  }

  public SalvarEvento(): void {
    const evento = this.evento;
    evento.data = this.dataEvento.split("-")[2] + '/' +
      this.dataEvento.split("-")[1] + '/' + this.dataEvento.split("-")[0];
    evento.id_Local = parseInt(this.localEvento.split(",")[0]);

    this.eventoService.alterarEvento(evento)
      .subscribe(res => {
        this.AbrirSuccess();
        this.CarregarEvento();
        this.VoltarAlterarEvento();
      }, err => {
        this.AbrirError();
        this.VoltarAlterarEvento();
      });
  }

  public SalvarLocal(){
    const local = this.local;
    this.local.id = 0;
    this.local.numero = parseInt(this.numeroLocal);
    this.eventoService.addLocal(local)
      .subscribe(res => {
        this.AbrirSuccess();
        this.VoltarLocal();
      }, err => {
        this.AbrirError();
        this.VoltarLocal();
      });
  }

  public AdicionarLocal(){
    this.local = new Local();
    document.getElementById("cadastroLocal").style.display = 'block';
    document.getElementById("alterarEvento").style.display = 'none';
  }

  public NovoConvidado(){
    document.getElementById("cadastroConvidado").style.display = 'block';
    document.getElementById("Convidar").style.display = 'none';
  }

  public SalvarConvidado(){
    const convidado = this.convidado;
    this.convidado.id = 0;
    this.convidado.idade = parseInt(this.idadeConvidado);
    this.eventoService.addConvidado(convidado)
      .subscribe(res => {
        this.AbrirSuccess();
        this.VoltarConvidado();
      }, err => {
        this.AbrirError();
        this.VoltarConvidado();
      });
  }

  public VoltarConvidado(){
    this.CarregarNaoConvidados();
    document.getElementById("cadastroConvidado").style.display = 'none';
    document.getElementById("Convidar").style.display = 'block';
  }

  public VoltarLocal(){
    this.CarregarLocais();
    document.getElementById("cadastroLocal").style.display = 'none';
    document.getElementById("alterarEvento").style.display = 'block';
  }

  public VoltarAlterarEvento(){
    this.CarregarEvento();
    document.getElementById("alterarEvento").style.display = 'none';
    document.getElementById("lista").style.display = 'block';
  }

  public VoltarParaEventos(){
    window.location.href = "/eventos";
  }

  public VotarConvidar(){
    this.CarregarConvidados();
    document.getElementById("Convidar").style.display = 'none';
    document.getElementById("lista").style.display = 'block';
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
