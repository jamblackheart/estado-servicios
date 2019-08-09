import { environment } from 'src/environments/environment';
import { sp } from '@pnp/sp';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable()
export class SPServicio {
    constructor() { }

    public ObtenerConfiguracion() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    }

    

    public ObtenerConfiguracionConPost() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InU0T2ZORlBId0VCb3NIanRyYXVPYlY4NExuWSIsImtpZCI6InU0T2ZORlBId0VCb3NIanRyYXVPYlY4NExuWSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTY1MjkyOTI4LCJuYmYiOjE1NjUyOTI5MjgsImV4cCI6MTU2NTMyMjAyOCwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiJjZDQwNmRiYS1jZjZlLTQ1OGEtOWQzYi1iN2YwYzJkMjk2ZDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiODJmMjU3YzItMjc5ZC00M2ZlLWI3ODQtZmZmNjFlYzE5ZWI5Iiwic3ViIjoiODJmMjU3YzItMjc5ZC00M2ZlLWI3ODQtZmZmNjFlYzE5ZWI5IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.DG7z0VgJ9AWGr4LYXHrYqZMqEyUwW2keHZJaimWl3vt_y2CGS85gvuJtnaP3ZT5dxukUCAob_e645e0qBaL9UzK_LH53diGiWPTkNnEwXPBkkx9nPM8RfSesJGh60VxF01lBaI82uYGFTT8YwNadP4NQ4PiGtvIDhU_vqOBCi8cQbgAvM1uC2pakKFIgJC9XqRhxHC8eO43OZDIEFqk-CdMbVS8lvUNpT9IM7MLKr69oYshZT3UmF44WZr05s0zGiYsA2mPcmEkFO3GFA956XV6-87z39NGWsVhnPpEiRIjadO9MDLtfCgcLKueIwOSJ2fGw0HVmpfwDBZEjupmZcA'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    } 

   

    ObtenerTodosLosUsuarios() {
        let respuesta = from(this.ObtenerConfiguracion().web.siteUsers.get());
        return respuesta;
    }

    ObtenerUsuarioActual() {
        let respuesta = from(this.ObtenerConfiguracion().web.currentUser.get());
        return respuesta;
    }



    ObtenerGruposUsuario(usuarioId: number){
        let respuesta = from(this.ObtenerConfiguracion().web.getUserById(usuarioId).groups.get());
        return respuesta;
    }

    

    GuardarServicio(ObjServicio){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaServicios).items.add(ObjServicio);
        return respuesta;
    }


    GuardarHistoriaServicio(ObjServicio){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaHistoriaServicios).items.add(ObjServicio);
        return respuesta;
    }


    ModificarServicio(ObjServicio, idServicio){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaServicios).items.getById(idServicio).update(ObjServicio);
        return respuesta; 
    }

    ObtenerHistoriaServicio(idSolicitud, fechaInicial, fechaFinal){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaHistoriaServicios).items.select("*","usuarioModifica/Title","servicio/Title").expand("usuarioModifica","servicio").filter("servicioId eq "+ idSolicitud + " and (fechaModificacion ge datetime'"+fechaInicial+"T00:00:00.00Z' and fechaModificacion le datetime'"+fechaFinal+"T23:59:59.00Z')").get();
        return respuesta;
    }


    

    ObtenerTodosLosServicios(){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaServicios).items.select("*","usuarioModifica/Title").expand("usuarioModifica").getAll();
        return respuesta;
    }

}