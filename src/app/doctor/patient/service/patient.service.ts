import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../entities/patient';
import { Address } from '../entities/address';
import { Phone } from '../entities/phone';
import { Email } from '../entities/email';

@Injectable({
  providedIn: 'root'
})
export class PatientService {


  private baseUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) {}

  createPatient(patient: any): Observable<any> {
    return this.http.post<Patient>(`${this.baseUrl}/createPatient`, patient);
  }

  retrievePatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/getPatient`);
  }

  getPatientById(patientKy: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/getPatient/${patientKy}`);
  }
  getPatientByNameDOB(firstName: string, lastName: string, dob: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/getPatient/${firstName}/${lastName}/${dob}`);
  }

  updatePatient(patientKy: number, updatedPatient:any): Observable<any> {
    return this.http.put<Patient>(`${this.baseUrl}/updatePatient/${patientKy}`, updatedPatient);
  }

  deletePatient(patientKy: number): Observable<Patient> {
    return this.http.delete<Patient>(`${this.baseUrl}/deletePatient/${patientKy}`);
  }
  disablePatient(patientKy: number): Observable<any> {
    return this.http.put<Patient>(`${this.baseUrl}/disablePatient/${patientKy}`, {});
  }
 
  enablePatient(patientKy: number): Observable<any>  {
    return this.http.put<Patient>(`${this.baseUrl}/enablePatient/${patientKy}`, {});
  }
  // Function to delete an address
  deleteAddress(addressKy: number, patientKy: number): Observable<any> {
    return this.http.delete<Address>(`${this.baseUrl}/deleteAddress/${addressKy}/${patientKy}`, {});
  }
   // Method to delete a phone
   deletePhone(phoneKy: number, patientKy: number): Observable<any> {
    return this.http.delete<Phone>(`${this.baseUrl}/deletePhone/${phoneKy}/${patientKy}`, {});
  }

  // Method to delete an email
  deleteEmail(emailKy: number, patientKy: number): Observable<any> {
    return this.http.delete<Email>(`${this.baseUrl}/deleteEmail/${emailKy}/${patientKy}`, {});
  }
}
