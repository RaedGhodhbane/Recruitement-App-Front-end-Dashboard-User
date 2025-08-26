import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiURL = "http://localhost:8082"
  constructor(private http:HttpClient) { }

postjobRecruiter(recruiter:any, idRecruiter:any) {
  return this.http.post(`${this.apiURL}/offer/${idRecruiter}`,recruiter);
}

getAllJobs() {
  return this.http.get(`${this.apiURL}/offer/offers`)
}

getOneJob(id:any) {
  return this.http.get(`${this.apiURL}/offer/${id}`)
}

updateJob(id:any, offer:any) {
  return this.http.put(`${this.apiURL}/offer/${id}`,offer);
}

deleteJob(jobId:any) {
  return this.http.delete(`${this.apiURL}/offer/${jobId}`)
}

saveJobCandidacy(candidacy:any) {
    return this.http.post(`${this.apiURL}/candidacy`, candidacy);
  }
}
