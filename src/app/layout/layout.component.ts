import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  offers:any[] = [];
  visibleOffers: number = 3;
  term: string = '';
  term2: string = '';

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe(
    (res:any) => {
      this.offers = res;
    } 
    );
  }

  showMore() {
    this.visibleOffers +=3;
  }
}
