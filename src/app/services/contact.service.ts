import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiURL= "http://localhost:8082/contact"
  constructor(private http:HttpClient) { }

  sendMessageByUser(message:any,idUserSend:any) {
    return this.http.post(`${this.apiURL}/${idUserSend}`, message)
  }

  getAllMessagesContact() {
    return this.http.get(`${this.apiURL}/messages`)
  }
}
