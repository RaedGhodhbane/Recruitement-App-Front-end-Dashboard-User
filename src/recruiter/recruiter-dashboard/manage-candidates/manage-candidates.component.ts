import { Component, OnInit } from '@angular/core';
import { CandidacyService } from 'src/app/services/candidacy.service';

@Component({
  selector: 'app-manage-candidates',
  templateUrl: './manage-candidates.component.html',
  styleUrls: ['./manage-candidates.component.css']
})
export class ManageCandidatesComponent implements OnInit {

  candidacies: any[] = [];
  paginatedCandidacies: any[] = [];
  page: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  editingIndex: number | null = null;
  term:string="";

  constructor(private candidacyService: CandidacyService) { }

  ngOnInit(): void {
    this.getAllCandidacies();
  }

  getAllCandidacies() {
    this.candidacyService.getAllCandidacies().subscribe((res:any) => {
      this.candidacies = res;
      this.totalPages = Math.ceil(this.candidacies.length / this.itemsPerPage);
      this.setPage(this.page);
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.page = page;

    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCandidacies = this.candidacies.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.page < this.totalPages) this.setPage(this.page + 1);
  }

  prevPage() {
    if (this.page > 1) this.setPage(this.page - 1);
  }

  acceptCandidacy(candidacy: any) {
    this.candidacyService.acceptCandidacy(candidacy.id).subscribe({
      next: () => candidacy.status = 'ACCEPTED',
      error: (err) => console.error(err)
    });
  }

  declineCandidacy(candidacy: any) {
    this.candidacyService.declineCandidacy(candidacy.id).subscribe({
      next: () => candidacy.status = 'DECLINED',
      error: (err) => console.error(err)
    });
  }
}
