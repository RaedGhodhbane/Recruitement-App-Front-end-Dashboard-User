import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-manage-messages-recruiter',
  templateUrl: './manage-messages-recruiter.component.html',
  styleUrls: ['./manage-messages-recruiter.component.css']
})
export class ManageMessagesRecruiterComponent implements OnInit {

  messages: any[] = [];
  paginatedMessages: any[] = [];
  userConnect: any;
  editingIndex: number | null = null;
  page: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  term :string = "";

  constructor(private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userConnect = JSON.parse(localStorage.getItem('user')!);
    this.getMessagesByRecruiter();
  }

  getMessagesByRecruiter() {
    this.messageService.getAllMessages().subscribe(
      (res: any) => {
        this.messages = res.filter((m: { userReceive: { id: any; }; }) => m.userReceive?.id === this.userConnect.id);
        this.totalPages = Math.ceil(this.messages.length / this.itemsPerPage);
        this.setPage(this.page);
        this.cdr.detectChanges();
        console.log("Tous les messages retournés :", this.messages);
      },
      (err) => console.error("Erreur lors du chargement des messages :", err)
    );
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.page = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedMessages = this.messages.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.page > 1) this.setPage(this.page - 1);
  }

  nextPage() {
    if (this.page < this.totalPages) this.setPage(this.page + 1);
  }

  deleteMessage(messageId: number): void {
    this.messages = this.messages.filter(m => m.id !== messageId);
    this.totalPages = Math.ceil(this.messages.length / this.itemsPerPage);
    if (this.page > this.totalPages) this.page = this.totalPages;
    this.setPage(this.page);
    this.messageService.deleteMessage(messageId).subscribe({
      next: () => console.log('Message supprimé'),
      error: (err) => console.error('Erreur lors de la suppression :', err)
    });
  }
}
