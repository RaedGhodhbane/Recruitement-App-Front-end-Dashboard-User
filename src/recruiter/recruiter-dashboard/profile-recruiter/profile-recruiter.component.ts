import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecruiterService } from 'src/app/services/recruiter.service';

@Component({
  selector: 'app-profile-recruiter',
  templateUrl: './profile-recruiter.component.html',
  styleUrls: ['./profile-recruiter.component.css'],
})
export class ProfileRecruiterComponent implements OnInit {
  profileForm!: FormGroup;
  id!:number;
  @Input("recruiter")
  recruiter:any;
  constructor(private fb: FormBuilder, private recruiterService:RecruiterService) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      companyName: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      name: ['', Validators.required],
      creationDate: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      website: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.getOneRecruiter();
  }

  formatDateForInput(dateString: string | null): string | null {
    if (!dateString) return null;
    return dateString.split('T')[0];
  }
  getOneRecruiter() {
    const recruiter = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(recruiter);
    const recruiterId = recruiter.id;
    this.recruiterService.getOneRecruiter(recruiterId).subscribe((res: any) => {
      this.recruiter = res;
      console.log('recruiter', this.recruiter);

      this.profileForm.patchValue({
        companyName: this.recruiter.companyName,
        email: this.recruiter.email,
        firstName: this.recruiter.firstName,
        name: this.recruiter.name,
        creationDate: this.formatDateForInput(this.recruiter.creationDate),
        phone: this.recruiter.phone,
        address: this.recruiter.address,
        website: this.recruiter.website,
        description: this.recruiter.description,
      });
    });
  }

    updateRecruiter() {
    const recruiter = JSON.parse(localStorage.getItem('user') || '{}');
    const recruiterId = recruiter.id;
    this.recruiterService.updateRecruiter(recruiterId,this.profileForm.value).subscribe(
      (res:any) => {
        console.log(res);
        this.getOneRecruiter();
      }
    )
  }
}
