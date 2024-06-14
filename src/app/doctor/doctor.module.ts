import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FormComponent } from './appointments/form/form.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { SettingsComponent } from './settings/settings.component';
import { AppointmentsService } from './appointments/appointments.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { AddPatientComponent } from './patient/add-patient/add-patient.component';
import { DeleteComponent } from './patient/delete/delete.component';
import { PatientsComponent } from './patient/patients/patients.component';
import { AdmissionComponent } from './patient/admission/admission.component';
import { AllstaysComponent } from './patient/allstays/allstays.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Ajoutez les imports spécifiques pour le calendrier ici
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { OwlDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { FormDialogComponent } from './calendar/form-dialog/form-dialog.component';
import { MedicalActComponent } from './medical-act/medical-act.component';
import { ActOptionsComponent } from './act-options/act-options.component';
import { TestResultDiscussionComponent } from './test-result-discussion/test-result-discussion.component';
import { EmergencyCareFollowupComponent } from './emergency-care-followup/emergency-care-followup.component';
import { MedicalTestAnalysisComponent } from './medical-test-analysis/medical-test-analysis.component';
import { PostSurgicalCheckupComponent } from './post-surgical-checkup/post-surgical-checkup.component';
import { AllstaysstaffComponent } from './allstaysstaff/allstaysstaff.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AppointmentsComponent,
    FormComponent,
    DoctorsComponent,
    PatientsComponent,
    SettingsComponent,
    AddPatientComponent,
    DeleteComponent,
    AdmissionComponent,
    AllstaysComponent,
    CalendarComponent,
    FormDialogComponent,
    MedicalActComponent,
    ActOptionsComponent,
    TestResultDiscussionComponent,
    EmergencyCareFollowupComponent,
    MedicalTestAnalysisComponent,
    PostSurgicalCheckupComponent,
    AllstaysstaffComponent, // Ajoutez le composant de calendrier ici
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatIconModule,
    NgApexchartsModule,
    NgScrollbarModule,
    DragDropModule,
    ComponentsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule, // Importez le module de calendrier ici
    OwlDateTimeModule, // Importez le module de date/heure Owl ici
  ],
  providers: [AppointmentsService],
})
export class DoctorModule {}
