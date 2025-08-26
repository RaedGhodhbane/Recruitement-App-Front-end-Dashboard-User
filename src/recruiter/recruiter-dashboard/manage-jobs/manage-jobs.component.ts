import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.css']
})
export class ManageJobsComponent implements OnInit {

  offers: any[] = [];
  paginatedOffers: any[] = [];
  userConnect: any;
  editingIndex: number | null = null;
  tempJob: any;
  index: any;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  term: string = "";

  constructor(private jobService: JobService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userConnect = JSON.parse(localStorage.getItem('user')!);
    this.getJobsByRecruiter();
  }

  getJobsByRecruiter() {
    this.jobService.getAllJobs().subscribe(
      (res: any) => {
        this.offers = res.filter((element: any) => (element.recruiter?.id == this.userConnect.id));
        this.totalPages = Math.ceil(this.offers.length / this.itemsPerPage);
        this.setPage(this.currentPage);
        console.log("Tous les jobs retournés :", this.offers);
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

updateJobByRecruiter(index: number) {
  if (this.editingIndex === index) {
    const jobToUpdate = this.paginatedOffers[index];
    this.jobService.updateJob(jobToUpdate.id, jobToUpdate).subscribe({
      next: (updatedJob: any) => {
        console.log('Job mis à jour :', updatedJob);
        const globalIndex = this.offers.findIndex((o: any) => o.id === updatedJob.id);
        if (globalIndex !== -1) this.offers[globalIndex] = updatedJob;
        this.setPage(this.currentPage);
        this.editingIndex = null;
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
      }
    });
  } else {
    this.editingIndex = index;
  }
}


  deleteJob(jobId: number): void {
    this.offers = this.offers.filter((o: { id: number; }) => o.id !== jobId);
    this.totalPages = Math.ceil(this.offers.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    this.setPage(this.currentPage);

    this.jobService.deleteJob(jobId).subscribe({
      next: () => {
        this.getJobsByRecruiter();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err);
        this.getJobsByRecruiter();
      }
    });
  }
}
