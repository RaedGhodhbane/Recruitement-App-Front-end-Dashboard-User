import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidates-dashboard-header',
  templateUrl: './candidates-dashboard-header.component.html',
  styleUrls: ['./candidates-dashboard-header.component.css']
})
export class CandidatesDashboardHeaderComponent implements OnInit {

  candidateName!:string;
  candidateImage!:string;
  constructor() { }

  ngOnInit(): void {

    const candidate = JSON.parse(localStorage.getItem('user') || '{}');
    this.candidateName = candidate.name;
    console.log("candidateName",this.candidateName)
    this.candidateImage = candidate.image;

  }

}
