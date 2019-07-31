import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllServicesComponent } from "./all-services/all-services.component";
import { HistoryComponent } from "./history/history.component";
import { UpdateStatusComponent } from "./update-status/update-status.component";

const routes: Routes = [  
  {path:'', redirectTo: 'Servicios', pathMatch: 'full'},
  { path: 'Servicios', component: AllServicesComponent },
  { path: 'Historial', component: HistoryComponent },
  { path: 'Actualizar', component: UpdateStatusComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
