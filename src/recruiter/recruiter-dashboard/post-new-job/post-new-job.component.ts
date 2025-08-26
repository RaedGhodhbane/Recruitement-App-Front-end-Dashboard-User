import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-post-new-job',
  templateUrl: './post-new-job.component.html',
  styleUrls: ['./post-new-job.component.css']
})
export class PostNewJobComponent implements OnInit {
  loginForm!: FormGroup;
  title= '';
  description='';
  type='';
  address='';
  salary=0;
  experience='';
  publicationDate!: Date
  expirationDate!: Date
  errorMessage= '';
  offer:any;
  constructor(private fb:FormBuilder, private jobService:JobService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm= this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      publicationDate:['', Validators.required],
      expirationDate:['',Validators.required],
      type:['',Validators.required],
      salary:[0,Validators.required],

    })
  }

  saveJobRecruiter() : void {
      if (this.loginForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }
    const credentials = this.loginForm.value;

    const recruiter = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(recruiter);
    const recruiterId = recruiter.id;
    const token = recruiter.token;

    this.jobService.postjobRecruiter(credentials,recruiterId).subscribe({
            next: (response) => {
        console.log('Offre enregistrée avec succès', response);
        this.router.navigate(['']); // Redirige vers la liste des offres
      },
      error: (error) => {
        console.error('Erreur lors de l’enregistrement de l’offre', error);
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
      }
    });
    }
  }
