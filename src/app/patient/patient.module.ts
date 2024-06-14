import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PatientRoutingModule } from './patient-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';
import { BillingComponent } from './billing/billing.component';
import { SettingsComponent } from './settings/settings.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FullCalendarModule } from '@fullcalendar/angular';
import { OwlDateTimeModule } from '@danielmoncada/angular-datetime-picker';

// Assuming these are the components related to patient module
import { AddPatientComponent } from './patient/add-patient/add-patient.component';
import { DeleteComponent } from './patient/delete/delete.component';
import { PatientsComponent } from './patient/patients/patients.component';
import { AdmissionComponent } from './patient/admission/admission.component';
import { AllstaysComponent } from './patient/allstays/allstays.component';

// Specific imports for the calendar
import { CalendarComponent } from './calendar/calendar.component';
import { FormDialogComponent } from './calendar/form-dialog/form-dialog.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PrescriptionsComponent,
    MedicalRecordsComponent,
    BillingComponent,
    SettingsComponent,
    AddPatientComponent,
    DeleteComponent,
    PatientsComponent,
    AdmissionComponent,
    AllstaysComponent,
    CalendarComponent,
    FormDialogComponent,
  
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    NgApexchartsModule,
    NgScrollbarModule,
    ComponentsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    DragDropModule,
    FullCalendarModule,
    OwlDateTimeModule,
  ],
})
export class PatientModule {}
