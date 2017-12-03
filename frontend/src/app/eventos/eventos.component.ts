import { Component, OnInit } from '@angular/core';
import { EventosService } from './eventos.service';
import { Evento } from '../evento/evento';
import { Local } from '../local/local';

@Component({
  selector: 'app-eventos',
  templateUrl: 'eventos.component.html',
  styleUrls: ['eventos.component.css']
})
export class eventosComponent implements OnInit {

  public eventos: Evento[] = [];
  public nomeEvento = '';
  public dataEvento = '';
  public horaEvento = '';
  public localEvento = '';


  public locais: Local[] = [];
  public nomeLocal = '';
  public ruaLocal = '';
  public numeroLocal = '';
  public cidadeLocal = '';

  constructor(private eventosService: EventosService) {  }

  ngOnInit() {
    this.CarregaTodos();
  }

  public CarregaTodos(): void {
    this.eventosService.loadEventos()
      .subscribe(res => {
        this.eventos = res;
      }, err => {});

    this.eventosService.loadLocais()
      .subscribe(res => {
        this.locais = res;
      }, err => {});
  }

  public AbrirCadastroEvento(){
    document.getElementById("cadastroEvento").style.display = 'block';
    document.getElementById("lista").style.display = 'none';
  }

  public AdicionarCadastroLocal(){
    document.getElementById("cadastroEvento").style.display = 'none';
    document.getElementById("cadastroLocal").style.display = 'block';
  }

  public SalvarEvento(): void {
    const evento = new Evento();
    evento.id = 0;
    evento.nome = this.nomeEvento;
    evento.data = this.dataEvento.split("-")[2] + '/' +
      this.dataEvento.split("-")[1] + '/' + this.dataEvento.split("-")[0];
    evento.hora = this.horaEvento;
    evento.id_Local = parseInt(this.localEvento.split(",")[0]);

    this.eventosService.addEvento(evento)
      .subscribe(res => {
        this.AbrirSuccess();
        this.CarregaTodos();
        this.VoltarEvento();
      }, err => {
        this.AbrirError();
        this.VoltarEvento();
      });
  }

  public SalvarLocal(){
    const local = new Local();
    local.id = 0;
    local.nome = this.nomeLocal;
    local.rua = this.ruaLocal;
    local.numero = parseInt(this.numeroLocal);
    local.cidade = this.cidadeLocal;

    this.eventosService.addLocal(local)
      .subscribe(res => {
        this.AbrirSuccess();
        this.CarregaTodos();
        this.VoltarLocal();
      }, err => {
        this.AbrirError();
        this.VoltarLocal();
      });
  }

  public AbrirEvento(id){
    window.location.href = "/evento/" + id;
  }

  public VoltarEvento(){
    document.getElementById("cadastroEvento").style.display = 'none';
    document.getElementById("lista").style.display = 'block';
    this.LimparEvento();
  }

  public VoltarLocal(){
    document.getElementById("cadastroEvento").style.display = 'block';
    document.getElementById("cadastroLocal").style.display = 'none';
    this.LimparLocal();
  }

  public LimparEvento(){
    this.localEvento = '';
    this.nomeEvento = '';
    this.dataEvento = '';
    this.horaEvento = '';
  }

  public LimparLocal(){
    this.nomeLocal = '';
    this.ruaLocal = '';
    this.numeroLocal = '';
    this.cidadeLocal = '';
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
