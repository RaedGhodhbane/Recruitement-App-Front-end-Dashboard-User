import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruiter-dashboard-header',
  templateUrl: './recruiter-dashboard-header.component.html',
  styleUrls: ['./recruiter-dashboard-header.component.css']
})
export class RecruiterDashboardHeaderComponent implements OnInit {

  recruiterCompanyName!:string;
  recruiterImage!:string;

  constructor() { }

  ngOnInit(): void {
    const recruiter = JSON.parse(localStorage.getItem('user') || '{}');
    this.recruiterCompanyName = recruiter.companyName;
    console.log("candidateName",this.recruiterCompanyName)
    this.recruiterImage = recruiter.image;
  }

}
