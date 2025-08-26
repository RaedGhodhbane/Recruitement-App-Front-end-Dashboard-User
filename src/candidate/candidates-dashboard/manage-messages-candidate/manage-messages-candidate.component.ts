import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-manage-messages-candidate',
  templateUrl: './manage-messages-candidate.component.html',
  styleUrls: ['./manage-messages-candidate.component.css']
})
export class ManageMessagesCandidateComponent implements OnInit {

  allMessages: any[] = [];
  messages: any[] = [];
  editingIndex: number | null = null;
  paginatedMessages: any[] = [];
  searchTerm: string = "";
  userConnect: any;
  id: any;
  term: string = "";

  currentPage: number = 1;
  pageSize: number = 1;
  totalPages: number = 1;

  constructor(private activateRoute: ActivatedRoute, private messageService: MessageService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.userConnect = JSON.parse(localStorage.getItem('user')!);
    this.getMessagesByCandidate();
    this.id = this.activateRoute.snapshot.params['id'];
  }

  getMessagesByCandidate() {
    this.messageService.getAllMessages().subscribe((res: any) => {
      this.allMessages = res.filter((element: any) => element.userReceive?.id == this.userConnect.id);
      this.messages = [...this.allMessages];
      this.setupPagination();
    });
  }


  setupPagination() {
    this.totalPages = Math.ceil(this.messages.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedMessages();
  }

  updatePaginatedMessages() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedMessages = this.messages.slice(start, end);
    this.cdr.detectChanges();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedMessages();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedMessages();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedMessages();
    }
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  deleteMessage(messageId: number): void {
    this.allMessages = this.allMessages.filter(m => m.id !== messageId);
    this.messages = this.messages.filter(m => m.id !== messageId);
    this.setupPagination();

    this.messageService.deleteMessage(messageId).subscribe({
      next: () => this.getMessagesByCandidate(),
      error: (err) => console.error('Erreur lors de la suppression :', err)
    });
  }
}
