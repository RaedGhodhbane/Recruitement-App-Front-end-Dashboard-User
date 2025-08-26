import { Component, OnInit } from '@angular/core';
import { EducationService } from 'src/app/services/education.service';
import { SavedJobService } from 'src/app/services/saved-job.service';

@Component({
  selector: 'app-saved-jobs-candidate',
  templateUrl: './saved-jobs-candidate.component.html',
  styleUrls: ['./saved-jobs-candidate.component.css']
})
export class SavedJobsCandidateComponent implements OnInit {
educations:any
userConnect:any
favorites:any[] = [];
  constructor(private educationService:EducationService, private savedJobService: SavedJobService) { }

  ngOnInit(): void {
    this.userConnect = JSON.parse(localStorage.getItem('user')!);
    console.log("userConnect au chargement :", this.userConnect);
    this.getEducationsCandidate();
    this.loadSavedJobs();


  }
getEducationsCandidate() {
  this.educationService.getAllEducations().subscribe(
    (res:any) => {
          this.educations = res.filter((element:any) => (element.candidate?.id == this.userConnect.id));

      console.log("Tous les educations retournés :", res)
    }
  )
}

  loadSavedJobs() {
    this.savedJobService.getSavedJobs(this.userConnect.id).subscribe(
      (res: any[]) => {
        this.favorites = res;
        console.log("Jobs sauvegardés :", this.favorites);
      },
      (err) => console.error(err)
    );
  }

  removeFromFavourites(jobId: number) {
    this.savedJobService.removeSavedJob(jobId).subscribe(() => {
      this.favorites = this.favorites.filter(job => job.id !== jobId);
    });
  }
}
