import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-candidates-grid',
  templateUrl: './candidates-grid.component.html',
  styleUrls: ['./candidates-grid.component.css']
})
export class CandidatesGridComponent implements OnInit {

  candidates: any[] = [];
  paginatedCandidates: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 0;

  term: string = "";

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.getAllCandidates();
  }

  getAllCandidates() {
    this.candidateService.getAllCandidates().subscribe(
      (res: any) => {
        this.candidates = res;
        this.totalPages = Math.ceil(this.candidates.length / this.itemsPerPage);
        this.setPage(1);
      }
    )
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;

    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.paginatedCandidates = this.candidates.slice(startIndex, endIndex);
  }

  get pages(): number[] {
    const pagesToShow = 5;
    let start = Math.max(1, this.currentPage - Math.floor(pagesToShow / 2));
    let end = start + pagesToShow - 1;

    if (end > this.totalPages) {
      end = this.totalPages;
      start = Math.max(1, end - pagesToShow + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

}
