import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-profile-candidate',
  templateUrl: './profile-candidate.component.html',
  styleUrls: ['./profile-candidate.component.css']
})
export class ProfileCandidateComponent implements OnInit {
  profileForm!: FormGroup;
  id!:number;
  candidate:any;
  fileToUpload: any;
  constructor(private fb: FormBuilder, private candidateService:CandidateService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.profileForm= this.fb.group({
      name:['', Validators.required],
      email:['', Validators.required],
      dateOfBirth:['', Validators.required],
      phone:['', Validators.required],
      gender:['', Validators.required],
      title:['', Validators.required],
      description:['', Validators.required],
      image:['', Validators.required]
      
    })
    this.getOneCandidate();
  }

  formatDateForInput(dateString: string | null): string | null {
  if (!dateString) return null;
  return dateString.split('T')[0];
}

  getOneCandidate(){
    const candidate = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(candidate);
    const candidateId = candidate.id;
    this.candidateService.getOneCandidate(candidateId).subscribe((res:any) => {
      this.candidate = res;
      console.log("candidate", this.candidate);

    this.profileForm.patchValue({
      name: this.candidate.name,
      email: this.candidate.email,
      dateOfBirth: this.formatDateForInput(this.candidate.dateOfBirth),
      phone: this.candidate.phone,
      gender: this.candidate.gender,
      title: this.candidate.title,
      description: this.candidate.description,
      image:this.candidate.image
    });
    });
  }

  updateCandidate() {
    const candidate = JSON.parse(localStorage.getItem('user') || '{}');
    const candidateId = candidate.id;
    let formData = new FormData();
formData.append("name", this.profileForm.value.name);
formData.append("email", this.profileForm.value.email);
formData.append("dateOfBirth", this.profileForm.value.dateOfBirth);
formData.append("phone", this.profileForm.value.phone);
formData.append("gender", this.profileForm.value.gender);
formData.append("title", this.profileForm.value.title);
formData.append("description", this.profileForm.value.description);

formData.append("file", this.fileToUpload[0]);
    this.candidateService.updateCandidate(this.profileForm.value,candidateId).subscribe(
      (res:any) => {
        console.log(res);
        this.getOneCandidate();
      }
    )
  }

handleFileInput(files: any) {
this.fileToUpload = <Array<File>>files.target.files;
console.log(this.fileToUpload)
}

}
