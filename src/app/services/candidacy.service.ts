import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidacyService {

  private apiURL = "http://localhost:8082"

  constructor(private http:HttpClient) { }

getAllCandidacies() {
  return this.http.get(`${this.apiURL}/candidacy/candidacies`)
}

updateCandidacy(id:any, candidacy:any) {
  return this.http.put(`${this.apiURL}/candidacy/${id}`,candidacy);
}

deleteCandidacy(candidacyId:any) {
  return this.http.delete(`${this.apiURL}/candidacy/${candidacyId}`)
}

existsCandidacy(offerId:any,candidateId:any) {
  return this.http.get<boolean>(`${this.apiURL}/candidacy/candidacies/exists?offerId=${offerId}&candidateId=${candidateId}`)
}

acceptCandidacy(candidacyId:any) {
  return this.http.put(`${this.apiURL}/candidacy/${candidacyId}/accept`,{});
}

declineCandidacy(candidacyId:any) {
  return this.http.put(`${this.apiURL}/candidacy/${candidacyId}/decline`,{});
}
}
