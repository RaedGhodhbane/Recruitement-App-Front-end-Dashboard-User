import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiURL = "http://localhost:8082/message"
  constructor(private http:HttpClient) { }

  sendMessage(message:any,idUserSend:any,idUserReceive:any) {
    return this.http.post(`${this.apiURL}/${idUserSend}/${idUserReceive}`, message);
  }

  getAllMessages() {
    return this.http.get(`${this.apiURL}/messages`);
  }

  updateMessage(message:any,id :any) {
    return this.http.put(`${this.apiURL}/${id}`, message);
  }

  deleteMessage(id:any) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
