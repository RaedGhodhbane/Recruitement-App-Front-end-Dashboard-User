import { Component, OnInit } from '@angular/core';
import { RecruiterService } from 'src/app/services/recruiter.service';

@Component({
  selector: 'app-recruiter-grid',
  templateUrl: './recruiter-grid.component.html',
  styleUrls: ['./recruiter-grid.component.css']
})
export class RecruiterGridComponent implements OnInit {

  recruiters: any[] = [];
  paginatedRecruiters: any[] = []; 
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 0;
  term: string = "";

  constructor(private recruiterService: RecruiterService) { }

  ngOnInit(): void {
    this.getAllRecruiters();
  }

  getAllRecruiters() {
    this.recruiterService.getAllRecruiters().subscribe(
      (res: any) => {
        this.recruiters = res;
        this.totalPages = Math.ceil(this.recruiters.length / this.itemsPerPage);
        this.setPage(this.currentPage);
        console.log("recruiters", this.recruiters);
      }
    )
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;

    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRecruiters = this.recruiters.slice(startIndex, endIndex);
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
}
