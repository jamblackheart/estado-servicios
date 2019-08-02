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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InU0T2ZORlBId0VCb3NIanRyYXVPYlY4NExuWSIsImtpZCI6InU0T2ZORlBId0VCb3NIanRyYXVPYlY4NExuWSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTY0MTAwMjU1LCJuYmYiOjE1NjQxMDAyNTUsImV4cCI6MTU2NDEyOTM1NSwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiIwNTg5MWVmNC0wNGEzLTRlMGUtOTFkOS0xMzhjMGNhM2JkYTRAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiYTlhNzYzZjItNzI3NC00NmQwLWE0M2ItYzYyMzJiYzVhOWI5Iiwic3ViIjoiYTlhNzYzZjItNzI3NC00NmQwLWE0M2ItYzYyMzJiYzVhOWI5IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.jQu7Ip_L320R4wLCaIPT7-hLvsB2Bbg2IN00pGxeUPBPaAAc_5iYnpG5S_aYmS9Etugp_9uQ4ho839_T7o-eP2mrJMROzk8pOGDh_W5Deub9T94pesfJKxRy0qfFXUwPwZDr4jDI7JydZgujvVlTnQDgta9KWjZXZcneFwn6t5wyUhvf61S5gr_62PYaYHaoh5SjsjDFbYMMtf2UmTIveiWskc4NJBneghjrDqOp_lO_LwFhUfpXQ96_5mPHWnGIhpd_wc_-BQQnipEYmUxUPzFvMbWPZNN_r1qTUdGGgneH4fEA-UHbC-Y3dufxwOSiSqGbGASBDck8x2H_vSxoXQ'
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
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaServicios).items.add(ObjServicio);
        return respuesta;
    }

    ModificarServicio(ObjServicio, idServicio){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaServicios).items.getById(idServicio).update(ObjServicio);
        return respuesta; 
    }

    ObtenerHistoriaServicio(idSolicitud){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaHistoriaServicios).items.select("*","usuarioModifica/Title","servicio/Title").expand("usuarioModifica","servicio").filter("servicioId eq "+ idSolicitud).getAll();
        return respuesta;
    }


    

    ObtenerTodosLosServicios(){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaServicios).items.select("*","usuarioModifica/Title").expand("usuarioModifica").getAll();
        return respuesta;
    }

}