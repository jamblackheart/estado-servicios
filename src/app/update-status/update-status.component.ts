import { Component, OnInit, TemplateRef } from '@angular/core';
import { SPServicio } from '../servicios/sp-servicio';
import { Servicios } from '../dominios/servicios';
import { Usuario } from '../dominios/usuario';
import { Grupo } from '../dominios/grupo';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent implements OnInit {

  string: Servicios[] = [];
  nombreUsuario: any;
  emailUsuario: any;
  idUsuario: number;
  usuarioActual: Usuario;
  esColaborador: boolean;
  grupos: Grupo[] = [];
  modalRef: BsModalRef;

  textoModal: string = "";
  idServicioActualizar: number = 0;
  form: FormGroup;
  private registrarControles() {
    this.form = this.formulario.group({
      nuevoEstado: [""],
      detalleIncidente: [""]
    })
  };




  constructor(public servicios: SPServicio, private modalService: BsModalService, private formulario: FormBuilder) { }

  ngOnInit() {
    this.registrarControles();
    this.ObtenerUsuarioActual();

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
    let idUsuario = this.usuarioActual.id;
    this.servicios.ObtenerGruposUsuario(idUsuario).subscribe(
      (respuesta) => {
        this.grupos = Grupo.fromJsonList(respuesta);
        this.verificarPermisos();

      }, err => {
        console.log('Error obteniendo grupos de usuario: ' + err);
      }
    )
  };

  verificarPermisos() {
    let existeEsColaborador = this.grupos.find(x => x.title === "Colaboradores");
    if (existeEsColaborador !== undefined) {
      this.esColaborador = true;
    };
  };


  ObtenerTodosLosServicios() {
    this.servicios.ObtenerTodosLosServicios().then(
      (respuesta) => {
        this.string = Servicios.fromJsonList(respuesta);
        console.log(this.string);
      }
    )
  }

  openModal(template: TemplateRef<any>, idServicio: number) {
    this.textoModal = "";
    this.modalRef = this.modalService.show(template);
    this.idServicioActualizar = idServicio;
    this.form.controls["nuevoEstado"].setValue("");
    this.form.controls["detalleIncidente"].setValue("");

  }

  openModal2(template: TemplateRef<any>, texto: string) {
    this.modalRef = this.modalService.show(template);
    this.textoModal = texto;
  }

  ActualizarEstado() {
    var nuevoEstado = this.form.get("nuevoEstado").value;
    var detalleIncidente = this.form.get("detalleIncidente").value;
    if (nuevoEstado === "" || detalleIncidente === "") {
      this.textoModal = "Debe seleccionar un estado e indicar un detalle del incidente";
    }
    else {
      let objServicio = {
        estado: nuevoEstado,
        detalleCambio: detalleIncidente
      }

      

      this.servicios.ModificarServicio(objServicio, this.idServicioActualizar).then((respuesta) => {
        this.ObtenerTodosLosServicios();
        this.modalService.hide(1);
        
        let ObjHistoriaServicio = {        
          Title:"Historia",
          Estado:nuevoEstado,
          DetalleCambio:detalleIncidente,
          fechaModificacion:new Date(),
          servicioId:this.idServicioActualizar,
          usuarioModificaId:this.usuarioActual.id
       } 

        this.servicios.GuardarHistoriaServicio(ObjHistoriaServicio);


      }).catch((error) => {
        console.log(error);

      });
    }



  }

}
