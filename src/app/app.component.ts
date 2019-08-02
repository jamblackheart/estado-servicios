import { Component } from '@angular/core';
import {SPServicio} from './servicios/sp-servicio';
import {Servicios} from './dominios/servicios';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'estado-servicios';
}
