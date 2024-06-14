import { Component, OnInit } from '@angular/core';
import { Patient } from '../patient/entities/patient';
import { PatientService } from '../patient/service/patient.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  archivedPatients$: Observable<any[]> | undefined;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.archivedPatients$ = this.patientService.getArchivedPatients();
  }
}