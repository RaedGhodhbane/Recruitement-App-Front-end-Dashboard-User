import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducationService } from 'src/app/services/education.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-resume-candidate',
  templateUrl: './resume-candidate.component.html',
  styleUrls: ['./resume-candidate.component.css']
})
export class ResumeCandidateComponent implements OnInit {
  coverLetter!: string;
  educationForm!: FormGroup;
  errorMessage='';
  educations: any;
  userConnect:any;
  editingIndex: number | null = null;
  experienceForm!: FormGroup;
  tempExperience: any = {};
  experiences: any;
  skillForm!: FormGroup;
  skills : any;
  tempSkill: any = {}


  constructor(private fb:FormBuilder, private educationService:EducationService
    , private experienceService:ExperienceService, private skillService: SkillService) { }

  ngOnInit(): void {
    this.userConnect = JSON.parse(localStorage.getItem('user')!);
    console.log("userConnect au chargement :", this.userConnect);
    this.getEducationsCandidate();
    this.getExperiencesCandidate();
    this.getSkillsCandidate();
    this.educationForm= this.fb.group({
      diploma:['', Validators.required],
      university:['', Validators.required],
      endDate:['', Validators.required],
      description:['', Validators.required]
    });

    this.experienceForm= this.fb.group({
      companyName:['',Validators.required],
      jobTitle:['', Validators.required],
      startExpDate:['', Validators.required],
      endExpDate:['', Validators.required],
      description:['', Validators.required]
    })

    this.skillForm = this.fb.group({
      title:['', Validators.required],
      percentage:['', Validators.required]
    })


  //   const storedEducations = localStorage.getItem('educations');
  //   if (storedEducations) {
  //   this.educations = JSON.parse(storedEducations);
  // }
    
  }

  saveEducationCandidate() {
    if (this.educationForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }
 
    this.educationService.addEducationCandidate(this.educationForm.value,this.userConnect.id).subscribe({
      next: (response) => {
      this.educations=response
        console.log('Education enregistrée avec succès', this.educations);
      },
      error: (error) => {
        console.error('Erreur lors de l’enregistrement de l’education', error);
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
    }
  });
  this.educationForm.reset();
}

getEducationsCandidate() {
  this.educationService.getAllEducations().subscribe(
    (res:any) => {
      this.educations = res.filter((element:any) => (element.candidate?.id == this.userConnect.id));
      console.log("Tous les educations retournés :", res)
    }
  )
}

editEducation(index: number) {
  this.editingIndex = index;
  const edu = this.educations[index];

  this.educations[index] = { ...edu };
}

updateEducation(index: number) {
  const updatedEdu = this.educations[index];

  if (!updatedEdu.diploma || !updatedEdu.university || !updatedEdu.endDate || !updatedEdu.description) {
    this.errorMessage = 'Tous les champs doivent être remplis.';
    return;
  }

 localStorage.setItem('educations', JSON.stringify(this.educations));

  const educationId = updatedEdu.id;

  console.log('Updated education:', updatedEdu);
console.log('Education ID:', updatedEdu.id);

  this.educationService.updateEducationCandidate(updatedEdu, educationId).subscribe({
    next: (res) => {
      console.log('Éducation mise à jour sur le serveur', res);
    },
    error: (err) => {
      console.error('Erreur de mise à jour', err);
    }
  });

  this.editingIndex = null;
}

deleteEducation(id:any, index:number) {
  console.log('ID à supprimer:', id);
  this.educationService.deleteEducationCandidate(id).subscribe({
    next: () => {
      this.educations.splice(index,1);
      console.log('Éducation supprimée avec succès');
    },
    error: (error) => {
      console.error('Erreur lors de la suppression',error);
    }
  })
}

saveExperienceCandidate() {
      if (this.experienceForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }
    const credentials = this.experienceForm.value;
    console.log(credentials)
    const candidate = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(candidate);
    const candidateId = candidate.id;

    this.experienceService.addExperienceCandidate(credentials,candidateId).subscribe({
      next: (response) => {
        this.experiences = response;
        console.log('Experience enregistrée avec succès', this.experiences);

      },
      error: (error) => {
        console.error('Erreur lors de l’enregistrement de l’experience', error);
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
    }
  });
  this.experienceForm.reset();
}

getExperiencesCandidate() {
  this.experienceService.getAllExperiences().subscribe(
    (res:any) => {
      this.experiences = res.filter((element:any) => (element.candidate?.id == this.userConnect.id));
      console.log("Toutes les expériences retournés :", res)
    }
  )
}
editExperience(index: number) {
  this.editingIndex = index;
  this.tempExperience = { ...this.experiences[index] };
}

updateExperience(index: number) {
  if (!this.tempExperience.companyName || !this.tempExperience.jobTitle || !this.tempExperience.startExpDate || !this.tempExperience.endExpDate || !this.tempExperience.description) {
    this.errorMessage = 'Tous les champs doivent être remplis.';
    return;
  }

  this.experiences[index] = { ...this.tempExperience };

  localStorage.setItem('experiences', JSON.stringify(this.experiences));

  const expId = this.tempExperience.id;

  this.experienceService.updateExperienceCandidate(this.tempExperience, expId).subscribe({
    next: (res) => {
      console.log('Experience mise à jour sur le serveur', res);
    },
    error: (err) => {
      console.error('Erreur de mise à jour', err);
    }
  });

  this.editingIndex = null;
}

deleteExperience(id:any, index:number) {
  console.log('ID à supprimer:', id);
  this.experienceService.deleteExperienceCandidate(id).subscribe({
    next: () => {
      this.experiences.splice(index,1);
      console.log('Experience supprimée avec succès');
    },
    error: (error) => {
      console.error('Erreur lors de la suppression',error);
    }
  })
}

 saveSkill() {
    const candidate = JSON.parse(localStorage.getItem('user') || '{}');
    const candidateId = candidate.id;

  this.skillService.addSkillCandidate(this.skillForm.value,candidateId).subscribe({
    next: (res) => {
      console.log('Compétences enregistrées !', res);
       this.skills.push(res);
       this.skillForm.reset();
    },
    error: (err) => {
      console.log('Erreur d’enregistrement', err);
    }
  });
  this.skillForm.reset();
 }

 getSkillsCandidate() {
  this.skillService.getAllSkills().subscribe(
    (res:any) => {
      this.skills = res.filter((element:any) => (element.candidate?.id == this.userConnect.id));
      console.log("Toutes les compétences retournés :", res)
    }
  )
}

 editSkill(index: number) {
  this.editingIndex = index;
  this.tempSkill = { ...this.skills[index] };
}
 updateSkill(index: number) {
  if (!this.tempSkill.title || !this.tempSkill.percentage) {
    this.errorMessage = 'Tous les champs doivent être remplis.';
    return;
  }

  this.skills[index] = { ...this.tempSkill };

  localStorage.setItem('skills', JSON.stringify(this.skills));

  const skillId = this.tempSkill.id;

  this.skillService.updateSkillCandidate(this.tempSkill, skillId).subscribe({
    next: (res) => {
      console.log('Compétence mise à jour sur le serveur', res);
    },
    error: (err) => {
      console.error('Erreur de mise à jour', err);
    }
  });

  this.editingIndex = null;
}

deleteSkill(id:any, index:number) {
  console.log('ID à supprimer:', id);
  this.skillService.deleteSkillCandidate(id).subscribe({
    next: () => {
      this.skills.splice(index,1);
      console.log('Experience supprimée avec succès');
    },
    error: (error) => {
      console.error('Erreur lors de la suppression',error);
    }
  })
}
}
