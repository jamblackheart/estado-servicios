import { Component, OnInit,TemplateRef } from '@angular/core';
import {SPServicio} from '../servicios/sp-servicio';
import {Servicios} from '../dominios/servicios';
import {Usuario} from '../dominios/usuario';
import {Grupo} from '../dominios/grupo';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.css']
})
export class AllServicesComponent implements OnInit {
  
  string: Servicios[] = [];
  nombreUsuario: any;
  emailUsuario: any;
  idUsuario: number;
  usuarioActual: Usuario;
  esColaborador: boolean;
  grupos: Grupo[] = []; 
  modalRef: BsModalRef;

  textoModal:string = "";

 


  constructor(public servicios:SPServicio, private modalService: BsModalService) { }

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
        this.string = Servicios.fromJsonList(respuesta);
        console.log(this.string);
      }
    )
  }

  openModal(template: TemplateRef<any>,  texto: string) {
    this.modalRef = this.modalService.show(template);
    this.textoModal = texto;
  }



}
