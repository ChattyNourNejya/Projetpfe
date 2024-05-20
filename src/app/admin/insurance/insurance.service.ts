import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Insurance } from './insurance';


@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  private baseUrl = ' http://localhost:8085/healthInsurance';
  constructor(private http: HttpClient) { }



  getAllInsurances(): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(this.baseUrl);
  }

  createInsurance(insuranceData: Insurance): Observable<Insurance> {
    return this.http.post<Insurance>("http://localhost:8085/healthInsurance/add", insuranceData);
  }

  updateInsurance(insKy: number, insuranceData: Insurance): Observable<Insurance> {
    return this.http.put<Insurance>(`http://localhost:8085/healthInsurance/update/${insKy}`, insuranceData);
  }

  deleteInsurance(insKy: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${insKy}`, { observe: 'response' });
  }
  getInsuranceByCompanyName(insNm: string): Observable<Insurance[]> {
    const url = `${this.baseUrl}/by-company-name?companyName=${insNm}`;
    return this.http.get<Insurance[]>(`http://localhost:8085/healthInsurance/getbyname/${insNm}`);
  }




  getInsuranceBypolicyName(policyNm: string): Observable<Insurance> {
    const url = `${this.baseUrl}/InsurancePlicyName/${policyNm}`;
    return this.http.get<Insurance>(url);
  }

  // Ajoutez d'autres méthodes si nécessaire





  
  
}
