import { Page404Component } from "./../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PrescriptionsComponent } from "./prescriptions/prescriptions.component";
import { MedicalRecordsComponent } from "./medical-records/medical-records.component";
import { BillingComponent } from "./billing/billing.component";
import { SettingsComponent } from "./settings/settings.component";
import { PatientsComponent } from "./patient/patients/patients.component";
import { AddPatientComponent } from "./patient/add-patient/add-patient.component";
import { AdmissionComponent } from "./patient/admission/admission.component";
import { AllstaysComponent } from "./patient/allstays/allstays.component";
import { CalendarComponent } from "./calendar/calendar.component";
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('./appointments/appointments.module').then(
        (m) => m.AppointmentsModule
      ),
  },
  {
    path: 'allstays',
    component: PrescriptionsComponent,
  },
  {
    path: 'patients',
    component: PatientsComponent,
  },
  {
    path: 'add-patient', // Ajout du chemin pour add-patient sous doctor
    component: AddPatientComponent,
  },
  {
    path: 'rdv',
    component: CalendarComponent,
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
    path: 'records',
    component: MedicalRecordsComponent,
  },
  {
    path: 'archive',
    component: BillingComponent,
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
export class PatientRoutingModule {}
