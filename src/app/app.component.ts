import { Component } from '@angular/core';
import {SPServicio} from './servicios/sp-servicio';
import {Servicios} from './dominios/servicios';
import {Usuario} from './dominios/usuario';
import {Grupo} from './dominios/grupo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  
  title = 'estado-servicios';
  listaServicios: Servicios[] = [];
  totalServicios: number = 0;
  totalIncidentes: number = 0;


  nombreUsuario: any;
  emailUsuario: any;
  idUsuario: number;
  usuarioActual: Usuario;
  esColaborador: boolean;
  grupos: Grupo[] = []; 
  


  constructor(public servicios:SPServicio) { }

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
        this.listaServicios = Servicios.fromJsonList(respuesta);
        for (let servicio of this.listaServicios) {
          this.totalServicios++;
          if(servicio.estado!="Correcto")
          {
           this.totalIncidentes++;
          }
        }
      
        
      }
    )
  }

}
