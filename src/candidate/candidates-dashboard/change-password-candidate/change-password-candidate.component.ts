import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidateService } from 'src/app/services/candidate.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-change-password-candidate',
  templateUrl: './change-password-candidate.component.html',
  styleUrls: ['./change-password-candidate.component.css']
})
export class ChangePasswordCandidateComponent implements OnInit {

  changePasswordForm!: FormGroup;
  candidateId!: number;
  userConnect!: any;

  successMessage = '';
  errorMessage = '';
  constructor(private fb:FormBuilder, private candidateService: CandidateService) {
   }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
    });
    this.userConnect = JSON.parse(localStorage.getItem('user')!);
    this.candidateId = this.userConnect.id;
  }


onSubmit() {
  if (this.changePasswordForm.invalid) return;

  if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Les mots de passe ne correspondent pas !'
    });
    return;
  }

  const payload = {
    currentPassword: this.changePasswordForm.value.currentPassword,
    newPassword: this.changePasswordForm.value.newPassword,
    confirmPassword: this.changePasswordForm.value.confirmPassword
  };

  this.candidateService.changePassword(this.candidateId, payload).subscribe({
    next: (res) => {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: res.message
      });
      console.log("res",res);
      this.changePasswordForm.reset();
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: err.error?.message || "Une erreur est survenue"
      });
    }
  });
}


}
