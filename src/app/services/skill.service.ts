import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiURL="http://localhost:8082"
  constructor(private http:HttpClient) { }

  addSkillCandidate(skill:any, idCandidate:any) {
    return this.http.post(`${this.apiURL}/skill/${idCandidate}`, skill);
  }

  getAllSkills() {
    return this.http.get(`${this.apiURL}/skill/skills`);
  }

  updateSkillCandidate(skill:any, id:any) {
    return this.http.put(`${this.apiURL}/skill/${id}`, skill);
  }

  deleteSkillCandidate(id:any) {
    return this.http.delete(`${this.apiURL}/skill/${id}`);
  }
}
