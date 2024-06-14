import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stay } from '../entities/stay';
import { Insurance } from 'app/admin/insurance/insurance';
import { LeService } from '../entities/LeService';
import { StayRoom } from '../entities/stay-room';

@Injectable({
  providedIn: 'root',
})
export class StayserviceService {
  private baseUrl = 'http://localhost:8085'; // Base URL of the backend API

  constructor(private http: HttpClient) {}

  createStay(patientKy: number, stay: any): Observable<Stay> {
    console.log('Stay before sending:', stay); // Display the stay object before sending it
    return this.http.post<Stay>(
      `${this.baseUrl}/stays/saveStay/${patientKy}`,
      stay
    );
  }

  getAllInsurances(): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(`${this.baseUrl}/healthInsurance`);
  }

  retrieveStays(): Observable<Stay[]> {
    return this.http.get<Stay[]>(`${this.baseUrl}/stays`);
  }

  getAllServices(): Observable<LeService[]> {
    return this.http.get<LeService[]>(`${this.baseUrl}/Leservice`);
  }

  getAllStaysByPatient(patientKy: number): Observable<Stay[]> {
    return this.http.get<Stay[]>(`${this.baseUrl}/stays/patient/${patientKy}`);
  }

  getStayRoomsForService(service_ky: number): Observable<StayRoom[]> {
    return this.http.get<StayRoom[]>(
      `${this.baseUrl}/stayRoom/service/${service_ky}`
    );
  }
}
