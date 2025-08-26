import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate.service';
import { EducationService } from 'src/app/services/education.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { MessageService } from 'src/app/services/message.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-candidates-detail',
  templateUrl: './candidates-detail.component.html',
  styleUrls: ['./candidates-detail.component.css']
})
export class CandidatesDetailComponent implements OnInit {

  id!:number;
  candidate:any;
  educations:any;
  experiences:any;
  skills:any;
  messageForm!: FormGroup;
  errorMessage= '';
  userConnect:any;
  message:any;


  constructor(private fb:FormBuilder,private candidateService:CandidateService, private educationService: EducationService,
    private activateRoute: ActivatedRoute, private experienceService:ExperienceService
  , private skillService: SkillService, private messageService:MessageService) { }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      fullName:['',Validators.required],
      subject:['', Validators.required],
      message:['', Validators.required]
    })
    this.id = this.activateRoute.snapshot.params['id'];
    console.log("id", this.id);
    this.getOneCandidate();
    this.getEducationsCandidate();
    this.getExperiencesCandidate();
    this.getSkillsCandidate();

  }

  getOneCandidate() {
    this.candidateService.getOneCandidate(this.id).subscribe(
      (res:any) => {
        this.candidate = res;
        console.log("candidate", this.candidate);
      }
    )
  }

  getEducationsCandidate() {
  this.educationService.getAllEducations().subscribe(
    (res:any) => {
      this.educations = res.filter((element:any) => (element.candidate?.id == this.id));
      console.log("Tous les educations retournés :", res)
    }
  )
}

getExperiencesCandidate() {
  this.experienceService.getAllExperiences().subscribe(
    (res:any) => {
      this.experiences = res.filter((element:any) => (element.candidate?.id == this.id));
      console.log("Toutes les expériences retournés :", res)
    }
  )
}

 getSkillsCandidate() {
  this.skillService.getAllSkills().subscribe(
    (res:any) => {
      this.skills = res.filter((element:any) => (element.candidate?.id == this.id));
      console.log("Toutes les compétences retournés :", res)
    }
  )
}

  sendMessage() {
  if (this.messageForm.invalid) {
    this.errorMessage = "Veuillez remplir tous les champs correctement.";
    return ;
  }

    this.userConnect = JSON.parse(localStorage.getItem('user')!);

  this.messageService.sendMessage(this.messageForm.value,this.userConnect.id,this.id).subscribe({
    next: (response) => {
      this.message = response
      console.log('Message envoyé avec succès', this.message);
    },
    error: (error) => {
      console.log('Erreur lors de l`envoie du message', error);
      this.errorMessage= 'Une erreur est survenue. Veuillez réessayer.';
    }
  })
  this.messageForm.reset();
  }
}
