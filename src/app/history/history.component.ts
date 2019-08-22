import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { SPServicio } from "../servicios/sp-servicio";
import { Servicios } from "../dominios/servicios";
import { Usuario } from "../dominios/usuario";
import { Grupo } from "../dominios/grupo";
import { ModalModule, BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Historial } from "../dominios/historial";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"]
})
export class HistoryComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  datePickerConfig: Partial<BsDatepickerConfig>;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  serviciosList: Servicios[] = [];
  serviciosHistoriaList: Historial[] = [];
  nombreUsuario: any;
  emailUsuario: any;
  idUsuario: number;
  usuarioActual: Usuario;
  esColaborador: boolean = false;
  grupos: Grupo[] = [];
  modalRef: BsModalRef;
  textoModal: string = "";
  form: FormGroup;
  dataSource;

  displayedColumns: string[] = ['Fecha','Estado','Detalle', 'ModificadoPor'];

  private registrarControles() {
    this.form = this.formulario.group({
      rangoFechas: [""],
      selectServicios: [""]
    });
  }

  constructor(
    public servicios: SPServicio,
    private modalService: BsModalService,
    private formulario: FormBuilder
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit() {
    this.registrarControles();
    this.ObtenerUsuarioActual();
    this.ObtenerTodosLosServicios();
  }

  ObtenerUsuarioActual() {
    this.servicios.ObtenerUsuarioActual().subscribe(
      respuesta => {
        this.usuarioActual = new Usuario(
          respuesta.Title,
          respuesta.email,
          respuesta.Id
        );
        this.nombreUsuario = this.usuarioActual.nombre;
        this.idUsuario = this.usuarioActual.id;

        console.log(this.nombreUsuario);
        this.obtenerGrupos();
      },
      err => {
        console.log("Error obteniendo usuario: " + err);
      }
    );
  }

  obtenerGrupos() {
    let idUsuario = this.usuarioActual.id;
    this.servicios.ObtenerGruposUsuario(idUsuario).subscribe(
      respuesta => {
        this.grupos = Grupo.fromJsonList(respuesta);
        this.verificarPermisos();
      },
      err => {
        console.log("Error obteniendo grupos de usuario: " + err);
      }
    );
  }

  verificarPermisos() {
    let existeEsColaborador = this.grupos.find(
      x => x.title === "Colaboradores"
    );
    if (existeEsColaborador !== undefined) {
      this.esColaborador = true;
    }
  }

  ObtenerTodosLosServicios() {
    this.servicios.ObtenerTodosLosServicios().then(respuesta => {
      this.serviciosList = Servicios.fromJsonList(respuesta);
      console.log(this.serviciosList);
    });
  }

  openModal(template: TemplateRef<any>, texto: string) {
    this.modalRef = this.modalService.show(template);
    this.textoModal = texto;
  }

  consultarHistorial(template: TemplateRef<any>) {
    let idDelServicio = this.form.get("selectServicios").value;
    var rangoFechas = this.form.get("rangoFechas").value;

    if (
      rangoFechas !== null &&
      rangoFechas !== undefined &&
      idDelServicio !== undefined
    ) {
      let fechaIni = this.ObtenerFormatoFecha(new Date(rangoFechas[0]));
      let fechaFin = this.ObtenerFormatoFecha(new Date(rangoFechas[1]));

      this.servicios
        .ObtenerHistoriaServicio(idDelServicio, fechaIni, fechaFin)
        .then(respuesta => {
          this.serviciosHistoriaList = Historial.fromJsonList(respuesta);
          this.dataSource = new MatTableDataSource(this.serviciosHistoriaList);
          this.dataSource.paginator = this.paginator;
          console.log(this.serviciosHistoriaList);
        });
    } else {
      this.openModal(
        template,
        "Debe seleccionar un servicio y un rago de fechas"
      );
    }
  }

  ObtenerFormatoFecha(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }
}
