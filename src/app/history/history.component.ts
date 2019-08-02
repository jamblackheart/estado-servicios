import { Component, OnInit,TemplateRef } from '@angular/core';
import {SPServicio} from '../servicios/sp-servicio';
import {Servicios} from '../dominios/servicios';
import {Usuario} from '../dominios/usuario';
import {Grupo} from '../dominios/grupo';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {Historial} from '../dominios/historial';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';




@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  datePickerConfig:Partial<BsDatepickerConfig>;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  serviciosList: Servicios[] = [];

  serviciosHistoriaList: Historial[] = [];

  nombreUsuario: any;
  emailUsuario: any;
  idUsuario: number;
  usuarioActual: Usuario;
  esColaborador: boolean;
  grupos: Grupo[] = []; 
  modalRef: BsModalRef;

  textoModal:string = "";

  form:FormGroup;




private registrarControles() {
this.form= this.formulario.group({  
  rangoFechas: [""],
  selectServicios: [""]
})
};
 



  constructor(public servicios:SPServicio, private modalService: BsModalService, private formulario: FormBuilder) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
   }

  ngOnInit() {
    this.registrarControles();
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


  consultarHistorialDate(e){
   
     var idServicio = (e.target.value).split(":");
     if(idServicio.length >= 1 )
     {
        idServicio = idServicio[1].trim();
        alert("cambiamos id= " + idServicio);

     }
    


  }

  consultarHistorialServicios(e){
   
    var idServicio = (e.target.value).split(":");
    if(idServicio.length >= 1 )
    {
       idServicio = idServicio[1].trim();
       alert("cambiamos id= " + idServicio);

    }

 }

 consultarHistorial(idServicio:string, fechaInicial:Date, fechaFinal:Date)
 {
   alert("vamos a consultar el historial select= " + this.form.get("selectServicios").value + " fechas: " + this.form.get("rangoFechas").value);
   let idDelServicio = this.form.get("selectServicios").value;

   this.servicios.ObtenerHistoriaServicio(idDelServicio).then(
    (respuesta)=>{
      this.serviciosHistoriaList = Historial.fromJsonList(respuesta);
      console.log(this.serviciosHistoriaList);
    }
  )


   

 }

}
