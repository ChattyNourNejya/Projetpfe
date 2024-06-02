import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from '../staff/allstaff/staff.model';

@Injectable({
  providedIn: 'root',
})
export class UserAccService {
  private baseUrl = ' http://localhost:8085/Staff/allstaff';

  constructor(private http: HttpClient) {}
  getAllStaffs(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.baseUrl);
  }
}
