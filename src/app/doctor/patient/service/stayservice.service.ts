import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stay } from '../entities/stay';
import { Insurance } from 'app/admin/insurance/insurance';
import {  LeService } from '../entities/LeService';

@Injectable({
  providedIn: 'root',
})
export class StayserviceService {
  private baseUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) {}

  createStay(patientKy: number, stay: any): Observable<Stay> {
    console.log('Stay before sending:', stay); // Display the stay object before sending it
    return this.http.post<Stay>(
      `${this.baseUrl}/stays/saveStay/${patientKy}`,
      stay
    );
  }

  getAllInsurances(): Observable<Insurance[]> {
    return this.http.get<Insurance[]>('http://localhost:8085/healthInsurance');
  }
  getAllServices(): Observable<LeService[]> {
    return this.http.get<LeService[]>(' http://localhost:8085/Leservice');
  }
  getAllStaysByPatient(patientKy: number): Observable<Stay[]> {
    return this.http.get<Stay[]>(`${this.baseUrl}/stays/patient/${patientKy}`);
  }
}
