import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointments } from './appointments.model';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Patient } from '../patient/entities/patient';
@Injectable()
export class AppointmentsService extends UnsubscribeOnDestroyAdapter {
  //       error: (error: HttpErrorResponse) => {
  //          // error code here
  //       },
  //     });

  private readonly API_URL = 'assets/data/doc-appointments.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Appointments[]> = new BehaviorSubject<
    Appointments[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Appointments;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Appointments[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAppointments(): Observable<Appointments[]> {
    return this.httpClient
      .get<Appointments[]>('http://localhost:8085/medvisitschdlds')
      .pipe(catchError(this.errorHandler));
  }

  getPatients(): Observable<Patient[]> {
    return this.httpClient
      .get<Patient[]>('http://localhost:8085/getPatient')
      .pipe(catchError(this.errorHandler));
  }
  addAppointments(appointments: Appointments): void {
    this.dialogData = appointments;

    // this.httpClient.post(this.API_URL, appointments)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = appointments;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateAppointments(appointments: Appointments): void {
    this.dialogData = appointments;

    // this.httpClient.put(this.API_URL + appointments.id, appointments)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = appointments;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteAppointments(id: number): void {
    console.log(id);

    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }

  private errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = error.error.message;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur : ${error.status}\nMessage : ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
