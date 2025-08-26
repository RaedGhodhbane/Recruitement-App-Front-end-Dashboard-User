import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private apiURL = 'http://localhost:8082'
  constructor(private http:HttpClient) { }

  registerCandidate(candidate:any) {
    return this.http.post(`${this.apiURL}/candidate/registerCandidate`, candidate);
  }


  getAllCandidates() {
    return this.http.get(`${this.apiURL}/candidate/candidates`);
  }

  getOneCandidate(idCandidate:any) {
    return this.http.get(`${this.apiURL}/candidate/${idCandidate}`);
  }

  updateCandidate(candidate:any,idCandidate:any) {
    return this.http.put(`${this.apiURL}/candidate/update/${idCandidate}`, candidate);
  }

  deleteCandidate(idCandidate:any) {
    return this.http.delete(`${this.apiURL}/candidate/${idCandidate}`);
  }

  changePassword(candidateId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiURL}/candidate/${candidateId}/change-password`, data);
  }
  
}
