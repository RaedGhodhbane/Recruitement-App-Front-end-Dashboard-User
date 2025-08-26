import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidate.service';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RecruiterService } from '../services/recruiter.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formCandidate: any;
  formRecruiter: any;

  constructor(private formBuilder : FormBuilder, private candidateService : CandidateService, private recruiterService: RecruiterService, private router : Router) { }

  ngOnInit(): void {
    this.formCandidate = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]],
    }, 
      { validators: passwordMatchValidator() });

        this.formRecruiter = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]],
    }, 
      { validators: passwordMatchValidator() });

    }

  registerCandidate() {
    this.candidateService.registerCandidate(this.formCandidate.value).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire(
          'Success'
        )
        this.formCandidate.reset();
        this.router.navigate(['/login']);

      },
      (error) => {
          if (error.status === 401) {
          console.log("email existe déjà");
          this.formCandidate.get('email')?.setErrors({ emailExists: true });
      }
    }
    );
  }

    registerRecruiter() {
    this.recruiterService.registerRecruiter(this.formCandidate.value).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire(
          'Success'
        )
        this.formCandidate.reset();
        this.router.navigate(['/login']);

      },
      (error) => {
          if (error.status === 401) {
          console.log("email existe déjà");
          this.formCandidate.get('email')?.setErrors({ emailExists: true });
      }
    }
    );
  }
}

export function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  };
}
