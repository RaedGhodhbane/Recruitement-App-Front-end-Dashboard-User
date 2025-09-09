import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CandidateService } from 'src/app/services/candidate.service';
import { EducationService } from 'src/app/services/education.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-resume-pdf',
  templateUrl: './resume-pdf.component.html',
  styleUrls: ['./resume-pdf.component.css']
})
export class ResumePDFComponent implements OnInit {

  userConnect:any;
  educations: any;
  experiences: any;
  skills : any;
  candidate:any;
  

  constructor(private educationService:EducationService,private experienceService:ExperienceService,
    private skillService:SkillService, private candidateService:CandidateService) { }

  ngOnInit(): void {
    this.userConnect = JSON.parse(localStorage.getItem('user')!);
    console.log("userConnect au chargement :", this.userConnect);
    this.getEducationsCandidate();
    this.getExperiencesCandidate();
    this.getSkillsCandidate();
    this.getOneCandidate();
  }

getEducationsCandidate() {
  this.educationService.getAllEducations().subscribe(
    (res:any) => {
      this.educations = res.filter((element:any) => (element.candidate?.id == this.userConnect.id));
      console.log("Tous les educations retournés :", res)
    }
  )
}

getExperiencesCandidate() {
  this.experienceService.getAllExperiences().subscribe(
    (res:any) => {
      this.experiences = res.filter((element:any) => (element.candidate?.id == this.userConnect.id));
      console.log("Toutes les expériences retournés :", res)
    }
  )
}

getSkillsCandidate() {
  this.skillService.getAllSkills().subscribe(
    (res:any) => {
      this.skills = res.filter((element:any) => (element.candidate?.id == this.userConnect.id));
      console.log("Toutes les compétences retournés :", res)
    }
  )
}

  getOneCandidate(){
    const candidate = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(candidate);
    const candidateId = candidate.id;
    this.candidateService.getOneCandidate(candidateId).subscribe((res:any) => {
      this.candidate = res;
      console.log("candidate", this.candidate);
    });
  }

  downloadCV() {
    const data = document.getElementById('cvContent');
    if (!data) return;

    html2canvas(data).then(canvas => {
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('CV'+ this.candidate.firstName + this.candidate.name + '.pdf');
    });
  }
}
