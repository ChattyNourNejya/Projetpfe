import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { SettingsComponent } from './settings/settings.component';
import { PatientsComponent } from './patient/patients/patients.component';
import { AddPatientComponent } from './patient/add-patient/add-patient.component';
import { AdmissionComponent } from './patient/admission/admission.component';
import { AllstaysComponent } from './patient/allstays/allstays.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MedicalActComponent } from './medical-act/medical-act.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
  },
  {
    path: 'patients',
    component: PatientsComponent,
  },

  {
    path: 'Medical_act',
    component: MedicalActComponent,
  },

  {
    path: 'happened_appointment',
    component: CalendarComponent,
  },

  {
    path: 'add-patient', // Ajout du chemin pour add-patient sous doctor
    component: AddPatientComponent,
  },
  {
    path: 'add-admission/:patientKy',
    component: AdmissionComponent,
  },
  {
    path: 'admissions/:patientKy',
    component: AllstaysComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
