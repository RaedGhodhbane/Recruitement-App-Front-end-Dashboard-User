import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { RecruiterService } from 'src/app/services/recruiter.service';

@Component({
  selector: 'app-recruiter-detail',
  templateUrl: './recruiter-detail.component.html',
  styleUrls: ['./recruiter-detail.component.css']
})
export class RecruiterDetailComponent implements OnInit {

  id!:number;
  recruiter:any;
  messageForm!:FormGroup;
  errorMessage= '';
  userConnect:any;
  message:any;

  constructor(private fb:FormBuilder,private activateRoute:ActivatedRoute
    , private recruiterService:RecruiterService, private messageService:MessageService) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    console.log("id", this.id);
    this.getOneRecruiter();
    this.messageForm = this.fb.group({
          fullName:['',Validators.required],
          subject:['', Validators.required],
          message:['', Validators.required]
        })
  }

    getOneRecruiter() {
    this.recruiterService.getOneRecruiter(this.id).subscribe(
      (res:any) => {
        this.recruiter = res;
        console.log("candidate", this.recruiter);
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
