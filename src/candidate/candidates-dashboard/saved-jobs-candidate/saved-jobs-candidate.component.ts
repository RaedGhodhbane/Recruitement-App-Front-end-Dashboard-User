import { Component, OnInit } from '@angular/core';
import { EducationService } from 'src/app/services/education.service';
import { SavedJobService } from 'src/app/services/saved-job.service';

@Component({
  selector: 'app-saved-jobs-candidate',
  templateUrl: './saved-jobs-candidate.component.html',
  styleUrls: ['./saved-jobs-candidate.component.css']
})
export class SavedJobsCandidateComponent implements OnInit {
  educations: any;
  userConnect: any;

  favorites: any[] = [];
  pagedFavorites: any[] = [];

  page: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;

  constructor(
    private educationService: EducationService,
    private savedJobService: SavedJobService
  ) {}

  ngOnInit(): void {
    this.userConnect = JSON.parse(localStorage.getItem('user')!);
    console.log("userConnect au chargement :", this.userConnect);

    this.getEducationsCandidate();
    this.loadSavedJobs();
  }

  getEducationsCandidate() {
    this.educationService.getAllEducations().subscribe(
      (res: any) => {
        this.educations = res.filter(
          (element: any) => element.candidate?.id == this.userConnect.id
        );
        console.log("Tous les educations retournés :", res);
      }
    );
  }

  loadSavedJobs() {
    this.savedJobService.getSavedJobs(this.userConnect.id).subscribe(
      (res: any[]) => {
        this.favorites = res;
        this.totalPages = Math.ceil(this.favorites.length / this.pageSize);
        this.updatePage();
        console.log("Jobs sauvegardés :", this.favorites);
      },
      (err) => console.error(err)
    );
  }

  updatePage() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedFavorites = this.favorites.slice(startIndex, endIndex);
  }

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages) {
      this.page = p;
      this.updatePage();
    }
  }

  nextPage() {
    this.goToPage(this.page + 1);
  }

  prevPage() {
    this.goToPage(this.page - 1);
  }

  removeFromFavourites(jobId: number) {
    this.savedJobService.removeSavedJob(jobId).subscribe(() => {
      this.favorites = this.favorites.filter(job => job.id !== jobId);
      this.totalPages = Math.ceil(this.favorites.length / this.pageSize);
      if (this.page > this.totalPages) this.page = this.totalPages || 1;
      this.updatePage();
    });
  }
}
