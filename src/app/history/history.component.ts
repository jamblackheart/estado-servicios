import { Component, OnInit,TemplateRef } from '@angular/core';
import {SPServicio} from '../servicios/sp-servicio';
import {Servicios} from '../dominios/servicios';
import {Usuario} from '../dominios/usuario';
import {Grupo} from '../dominios/grupo';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  serviciosList: Servicios[] = [];
  nombreUsuario: any;
  emailUsuario: any;
  idUsuario: number;
  usuarioActual: Usuario;
  esColaborador: boolean;
  grupos: Grupo[] = []; 
  modalRef: BsModalRef;

  textoModal:string = "";


  form = new FormGroup({
    dateYMD: new FormControl(new Date()),
    dateFull: new FormControl(new Date()),
    dateMDY: new FormControl(new Date()),
    dateRange: new FormControl([new Date(), new Date()])
  });


  constructor(public servicios:SPServicio, private modalService: BsModalService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
   }

  ngOnInit() {
    this.ObtenerUsuarioActual() ;
    
    this.ObtenerTodosLosServicios();
  }

  ObtenerUsuarioActual() {
    this.servicios.ObtenerUsuarioActual().subscribe(
      (respuesta) => {
        this.usuarioActual = new Usuario(respuesta.Title, respuesta.email, respuesta.Id);
        this.nombreUsuario = this.usuarioActual.nombre;
        this.idUsuario = this.usuarioActual.id;
        
        console.log(this.nombreUsuario);
        this.obtenerGrupos();

      }, err => {
        console.log('Error obteniendo usuario: ' + err);
        
      }
    )
  };


  obtenerGrupos() {
    let idUsuario = this.usuarioActual.id;
    this.servicios.ObtenerGruposUsuario(idUsuario).subscribe(
    (respuesta) => {
    this.grupos = Grupo.fromJsonList(respuesta);
    this.verificarPermisos();
   
    }, err => {
    console.log('Error obteniendo grupos de usuario: ' + err);
    }
    )
    };
    
    verificarPermisos() {
    let existeEsColaborador = this.grupos.find(x => x.title === "Colaboradores");
    if (existeEsColaborador !== undefined) {
      this.esColaborador= true;
    };
    }; 


  ObtenerTodosLosServicios(){
    this.servicios.ObtenerTodosLosServicios().then(
      (respuesta)=>{
        this.serviciosList = Servicios.fromJsonList(respuesta);
        console.log(this.serviciosList);
      }
    )
  }

  openModal(template: TemplateRef<any>,  texto: string) {
    this.modalRef = this.modalService.show(template);
    this.textoModal = texto;
  }


  consultarHistorial(e){
   
    // str idServicio = (e.target.value).split(":");
    // if(idServicio)
    // alert("cambiamos id= " + idServicio);
    


  }

}
