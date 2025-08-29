import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  allMessages: any[] = [];
  messages: any[] = [];
  messageForm!: FormGroup;
  errorMessage= '';
  message: any;
  admin: any;

  userConnect: any;
  constructor(private fb:FormBuilder,private contactService: ContactService,
    private activateRoute: ActivatedRoute, private cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      name: ['',Validators.required],
      subject:['',Validators.required],
      email:['',Validators.required],
      phone:[,Validators.required],
      message:['', Validators.required]
    })
    this.userConnect = JSON.parse(localStorage.getItem('user')!)
  }

  sendMessageContact() {
  if (this.messageForm.invalid) {
    this.errorMessage = "Veuillez remplir tous les champs correctement.";
    return ;
  }

    this.userConnect = JSON.parse(localStorage.getItem('user')!);

    this.contactService.sendMessageByUser(this.messageForm.value,this.userConnect.id).subscribe({
    next: (response) => {
      this.message = response
      console.log('Message envoyé avec succès', this.message);
    },
    error: (error) => {
      console.log('Erreur lors de l`envoie du message', error);
      this.errorMessage= 'Une erreur est survenue. Veuillez réessayer.';
    }
  });
  this.messageForm.reset();
}
  }
