import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecruiterService {
  private apiURL = 'http://localhost:8082';

  constructor(private http: HttpClient) {}

  registerRecruiter(recruiter: any) {
    return this.http.post(
      `${this.apiURL}/recruiter/registerRecruiter`,
      recruiter
    );
  }
  getAllRecruiters() {
    return this.http.get(`${this.apiURL}/recruiter/recruiters`);
  }

  getOneRecruiter(idRecruiter: any) {
    return this.http.get(`${this.apiURL}/recruiter/${idRecruiter}`);
  }

  updateRecruiter(idRecruiter:any,recruiter:any) {
    return this.http.put(`${this.apiURL}/recruiter/${idRecruiter}`, recruiter);
  }
  
}
