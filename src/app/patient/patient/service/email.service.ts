import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  EmailURL: string = "http://localhost:8080/api/auth/dmgrphceml";
  constructor(private httpClient : HttpClient) { }
  getAllEmail() {
    return this.httpClient.get(this.EmailURL);
  }

  getEmailById(id: any) {
    return this.httpClient.get(`${this.EmailURL}/${id}`);
  }
  createEmail(Email: any) {
    console.log("hii",Email);
    return this.httpClient.post(this.EmailURL,Email);
  }
  updateEmail(Email: any) {
    return this.httpClient.put(`${this.EmailURL}`,Email);
  }
  deleteEmail(id:any) {
    return this.httpClient.delete(`${this.EmailURL}/${id}`);
  }


}
