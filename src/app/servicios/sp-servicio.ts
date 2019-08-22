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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImllX3FXQ1hoWHh0MXpJRXN1NGM3YWNRVkduNCIsImtpZCI6ImllX3FXQ1hoWHh0MXpJRXN1NGM3YWNRVkduNCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTY2NDg2NTU4LCJuYmYiOjE1NjY0ODY1NTgsImV4cCI6MTU2NjUxNTY1OCwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiJjZDQwNmRiYS1jZjZlLTQ1OGEtOWQzYi1iN2YwYzJkMjk2ZDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiODJmMjU3YzItMjc5ZC00M2ZlLWI3ODQtZmZmNjFlYzE5ZWI5Iiwic3ViIjoiODJmMjU3YzItMjc5ZC00M2ZlLWI3ODQtZmZmNjFlYzE5ZWI5IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.4mHulfiq7VP4GVvlOfIwwOD4PkFr0AQ-kHkMVGrhas4ZNpoo2ZLdSSLdcLFZ306TFbRKG_tEMvDMAgQfSbwuhIXDROKy24BG3wQEsBLuy_sDophy8lOpbnsAlnKK8pG6tzhrDSs9IkJb6yFBQk11Kycszy8aWjXz1_JyjISQD5vXdMNJIDH_UtTVlMOP1N6SKF2_kveENgkJ0iPd1DMQMFNF6_NjsH1nn7z8ZU-j5Ra-vAQrHB6W6bPIrXuHqk30k9--7OMqFZE76JB1pO3HI9UkMPeESPlJOeSf4_tWxTytMh7IU1kRTGS2-FTYKfWz6n6sdeWUP_JohPP7T3CIqg'
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

    ObtenerEstados(){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaServicios).fields.getByTitle("estado").get();
        return respuesta;
    }

}