import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Calendar } from './calendar.model';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Room } from './room';
import { LeService } from 'app/doctor/patient/entities/LeService';
import { ServiceZone } from './service-zone';
import { FunctionalUnit } from './functional-unit';
import { RoomGroup } from './room-group';
import { Patient } from '../patient/entities/patient';
import { MedicalAct } from './medical-act';
import { MedVisitSchdld } from './med-visit-schdld';



@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private readonly API_URL = 'http://localhost:8085';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  dataChange: BehaviorSubject<Calendar[]> = new BehaviorSubject<Calendar[]>([]);
  // Temporairement stocke les données provenant des dialogues
  dialogData!: Calendar;
  constructor(private http: HttpClient) {}

  get data(): Calendar[] {
    return this.dataChange.value;
  }

  getService(): Observable<LeService[]> {
    return this.http.get<LeService[]>('http://localhost:8085/Leservice');
  }

  getPatients(): Observable<Patient[]> {
    return this.http
      .get<Patient[]>('http://localhost:8085/getPatient')
      .pipe(catchError(this.errorHandler));
  }
  getMedicalActs(): Observable<MedicalAct[]> {
    return this.http.get<MedicalAct[]>(`http://localhost:8085/medicalacts`);
  }

  createMedVisitSchdld(
    medVisitSchdld: MedVisitSchdld
  ): Observable<MedVisitSchdld> {
    return this.http.post<MedVisitSchdld>(
      `http://localhost:8085/medvisitschdlds/add`,
      medVisitSchdld
    );
  }

  getAllMedVisitSchdlds(): Observable<MedVisitSchdld[]> {
    return this.http
      .get<MedVisitSchdld[]>(`http://localhost:8085/medvisitschdlds`)
      .pipe(catchError(this.errorHandler));
  }

  getServiceZone(): Observable<ServiceZone[]> {
    return this.http.get<ServiceZone[]>('http://localhost:8085/serviceZone');
  }

  getServiceZoneByService(serviceId: number): Observable<ServiceZone[]> {
    const url = `http://localhost:8085/serviceZone/serviceZone-by-service/${serviceId}`;
    return this.http.get<ServiceZone[]>(url);
  }

  getFunctionalUnitsByServiceZone(
    serviceZone_ky: number
  ): Observable<FunctionalUnit[]> {
    const url = `http://localhost:8085/functionalUnit/functionalUnits-by-serviceZone/${serviceZone_ky}`;
    return this.http.get<FunctionalUnit[]>(url);
  }

  getRoomGroupsByFunctionalUnit(
    functionalUnitKey: number
  ): Observable<RoomGroup[]> {
    const url = `${this.API_URL}/RoomGroup/roomGroups/${functionalUnitKey}`;

    return this.http.get<RoomGroup[]>(url).pipe(
      catchError((error: any) => {
        console.error(
          'Error getting room groups by functional unit key:',
          error
        );
        return throwError(error);
      })
    );
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllCalendars(): Observable<Calendar[]> {
    return this.http
      .get<Calendar[]>(this.API_URL)
      .pipe(catchError(this.errorHandler));
  }

  addUpdateCalendar(calendar: Calendar): void {
    this.dialogData = calendar;
  }

  deleteCalendar(calendar: Calendar): void {
    this.dialogData = calendar;
  }

  getRoomsByGroupId(roomGroupId: number): Observable<Room[]> {
    const url = `${this.API_URL}/room/roomGroups/${roomGroupId}`;
    return this.http.get<Room[]>(url).pipe(catchError(this.errorHandler));
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
