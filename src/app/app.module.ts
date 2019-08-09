import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllServicesComponent } from './all-services/all-services.component';
import { SPServicio } from './servicios/sp-servicio';
import { HistoryComponent } from './history/history.component';
import { UpdateStatusComponent } from './update-status/update-status.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';

@NgModule({
  declarations: [
    AppComponent,
    AllServicesComponent,
    HistoryComponent,
    UpdateStatusComponent
  ],
  imports: [
    BrowserModule, NgxPaginationModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
        ReactiveFormsModule,
        BsDropdownModule.forRoot(),TextareaAutosizeModule
        
  ],
  providers: [SPServicio],
  bootstrap: [AppComponent]
})
export class AppModule { }
