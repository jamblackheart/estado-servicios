import { Component } from '@angular/core';
import {SPServicio} from './servicios/sp-servicio';
import {Servicios} from './dominios/servicios';


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
  


  constructor(public servicios:SPServicio) { }

  ngOnInit() {
   
    
    this.ObtenerTodosLosServicios();

  }

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
