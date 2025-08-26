import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private apiURL = "http://localhost:8082"

  constructor(private http:HttpClient) { }

  addEducationCandidate(education:any, idCandidate:any) {
    return this.http.post(`${this.apiURL}/education/${idCandidate}`, education);
  }

  getAllEducations() {
    return this.http.get(`${this.apiURL}/education/educations`);
  }

  updateEducationCandidate(education:any, id:any) {
    return this.http.put(`${this.apiURL}/education/${id}`, education);
  }

  deleteEducationCandidate(id:any) {
    return this.http.delete(`${this.apiURL}/education/${id}`);
  }

}
