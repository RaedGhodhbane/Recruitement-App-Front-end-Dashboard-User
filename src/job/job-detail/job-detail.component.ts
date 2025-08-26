import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CandidacyService } from 'src/app/services/candidacy.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  id!:number;
  offer:any;
  applyJobForm!:FormGroup;
  candidacy:any;
  errorMessage!:string;
  role:any;
  userConnect:any;
  hasApplied:boolean = false;


  constructor(private activateRoute: ActivatedRoute, private jobService: JobService,
    private fb:FormBuilder, private candidacyService:CandidacyService) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    console.log("id", this.id);
    this.getOneJob();
    this.role=localStorage.getItem('role');
    this.userConnect = JSON.parse(localStorage.getItem('user')!);
  this.applyJobForm = this.fb.group({
    submissionDate: [new Date().toISOString().split('T')[0]], 
    status: ['PENDING'],
    score: [0],
    offer: this.fb.group({
      id: [this.id] 
    }),
    candidate: this.fb.group({
      id: [this.userConnect.id] 
    })
  });

    this.existsCandidacy();

  }

  getOneJob() {
    this.jobService.getOneJob(this.id).subscribe(
      (res:any) => {
        this.offer = res;
        console.log("offer", this.offer)
      }
    )
  }

  saveCandidacy() {
        console.log(this.applyJobForm.value);
        this.jobService.saveJobCandidacy(this.applyJobForm.value).subscribe({
      next: (response) => {
      this.candidacy=response
        console.log('Candidature enregistrée avec succès', this.candidacy);
        window.location.reload();
      },
      error: (error) => {
        console.error('Erreur lors de l’enregistrement de la candidature', error);
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
    }
  });
  }

  existsCandidacy() {
 this.candidacyService.existsCandidacy(this.id, this.userConnect.id).subscribe(
  exists => {
    this.hasApplied = exists;
  }
 ) 
}

}
