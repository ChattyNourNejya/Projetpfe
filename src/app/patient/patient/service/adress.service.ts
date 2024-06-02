import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdressService {
  AdressURL: string = "http://localhost:8080/api/auth/dmgrphcaddrss";
  constructor(private httpClient : HttpClient) { }
  getAllAdress() {
    return this.httpClient.get(this.AdressURL);
  }

  getAdressById(id: any) {
    return this.httpClient.get(`${this.AdressURL}/${id}`);
  }
  createAdress(Adress: any) {
    console.log("hii",Adress);
    return this.httpClient.post(this.AdressURL,Adress);
  }
  updateAdress(Adress: any) {
    return this.httpClient.put(`${this.AdressURL}`,Adress);
  }
  deleteAdress(id:any) {
    return this.httpClient.delete(`${this.AdressURL}/${id}`);
  }


}
