import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidacyService } from 'src/app/services/candidacy.service';
import { SavedJobService } from 'src/app/services/saved-job.service';

@Component({
  selector: 'app-manage-candidacies-candidate',
  templateUrl: './manage-candidacies-candidate.component.html',
  styleUrls: ['./manage-candidacies-candidate.component.css']
})
export class ManageCandidaciesCandidateComponent implements OnInit {
  allCandidacies: any[] = [];
  candidacies:any[] = [];
  userConnect:any;
  editingIndex: number | null = null;
  paginatedCandidacies: any[] = [];
  searchTerm: string = "";
  id:any;
  term: string = "";

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(private activateRoute : ActivatedRoute,private candidacyService:CandidacyService, private cdr: ChangeDetectorRef) 
  { }

  ngOnInit(): void {
    this.userConnect = JSON.parse(localStorage.getItem('user')!);
    this.getCandidaciesByCandidate();
    this.id = this.activateRoute.snapshot.params['id'];


}

  getCandidaciesByCandidate() {
    this.candidacyService.getAllCandidacies().subscribe((res: any) => {
      console.log('Toutes les candidatures:', res);
      this.allCandidacies = res.filter((element: any) => element.candidate?.id == this.userConnect.id);
      this.candidacies = [...this.allCandidacies];
      this.setupPagination();

    });
  }

  setupPagination() {
    this.totalPages = Math.ceil(this.candidacies.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedCandidacies();
  }

  updatePaginatedCandidacies() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCandidacies = this.candidacies.slice(start, end);
    this.cdr.detectChanges();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedCandidacies();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedCandidacies();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedCandidacies();
    }
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

updateCandidacyByCandidate(index: number) {
  if (this.editingIndex === index) {
    const candidacyToUpdate = this.candidacies[index];
    this.candidacyService.updateCandidacy(candidacyToUpdate.id, candidacyToUpdate).subscribe({
      next: (updatedCandidacy) => {
        console.log('Candidature mis à jour :', updatedCandidacy);
        this.candidacies[index] = updatedCandidacy;
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

deleteCandidacy(candidacyId: number): void {
  this.candidacies = this.candidacies.filter((c: { id: number; }) => c.id !== candidacyId);

  // Appel backend
  this.candidacyService.deleteCandidacy(candidacyId).subscribe({
    next: () => {
      this.getCandidaciesByCandidate();
    },
    error: (err) => {
      console.error('Erreur lors de la suppression :', err);
      this.getCandidaciesByCandidate();
    }
  });
}





}
