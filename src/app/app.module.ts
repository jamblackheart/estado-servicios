import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllServicesComponent } from './all-services/all-services.component';
import { SPServicio } from './servicios/sp-servicio';
import { HistoryComponent } from './history/history.component';
import { UpdateStatusComponent } from './update-status/update-status.component';

@NgModule({
  declarations: [
    AppComponent,
    AllServicesComponent,
    HistoryComponent,
    UpdateStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SPServicio],
  bootstrap: [AppComponent]
})
export class AppModule { }
