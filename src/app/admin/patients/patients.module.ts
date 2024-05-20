import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientsRoutingModule } from './patients-routing.module';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { FormDialogComponent } from './allpatients/dialog/form-dialog/form-dialog.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { PatientService } from './patient-service.service';

@NgModule({
  declarations: [
    AddPatientComponent,
    EditPatientComponent,
    PatientProfileComponent,
    FormDialogComponent,
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [PatientService],
})
export class PatientsModule {}
