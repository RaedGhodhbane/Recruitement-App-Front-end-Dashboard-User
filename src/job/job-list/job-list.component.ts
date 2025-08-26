import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { SavedJobService } from 'src/app/services/saved-job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  offers: any[] = [];            // toutes les offres
  paginatedOffers: any[] = [];   // les offres de la page courante
  currentPage: number = 1;       // page courante
  itemsPerPage: number = 4;      // nombre d’offres par page
  totalPages: number = 0;        // nombre total de pages
  term: string = '';
  userConnect:any;
  favourites: number[] = [];


  constructor(private jobService: JobService, private savedJobService:SavedJobService) { }

ngOnInit(): void {
  this.userConnect = JSON.parse(localStorage.getItem('user')!);
  this.getAllJobs();

  this.savedJobService.getSavedJobs(this.userConnect.id).subscribe((data: any[]) => {
    this.favourites = data.map(job => job.id); 
    this.savedJobService.setFavourites(this.favourites);
  });

  this.savedJobService.getFavouritesChanges().subscribe(ids => {
    this.favourites = ids;
  });
}


  getAllJobs() {
    this.jobService.getAllJobs().subscribe(
      (res:any) => {
        this.offers = res;
        this.totalPages = Math.ceil(this.offers.length / this.itemsPerPage);
        this.setPage(this.currentPage);
        console.log("Tous les jobs retournés :", res);
      }
    );
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;

    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedOffers = this.offers.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

   isFavourite(job: any): boolean {
    return this.favourites.includes(job.id);
  }

toggleFavourite(job: any) {
  if (this.isFavourite(job)) {
    this.savedJobService.removeSavedJob(job.id).subscribe(() => {
      this.favourites = this.favourites.filter(id => id !== job.id);
    });
  } else {
    this.savedJobService.saveJob(this.userConnect.id, job.id).subscribe(() => {
      this.favourites.push(job.id);
    });
  }
}


}
