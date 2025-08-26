import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private apiURL = "http://localhost:8082"

  constructor(private http:HttpClient) { }

    addExperienceCandidate(experience:any, idCandidate:any) {
    return this.http.post(`${this.apiURL}/experience/${idCandidate}`, experience);
  }

    getAllExperiences() {
    return this.http.get(`${this.apiURL}/experience/experiences`);
  }

    updateExperienceCandidate(experience:any, id:any) {
    return this.http.put(`${this.apiURL}/experience/${id}`, experience);
  }

    deleteExperienceCandidate(id:any) {
    return this.http.delete(`${this.apiURL}/experience/${id}`);
    }
}
