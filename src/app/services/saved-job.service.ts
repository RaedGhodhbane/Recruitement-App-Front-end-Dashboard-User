import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SavedJobService {

  private favouritesChanged = new BehaviorSubject<number[]>([]);

  constructor(private http: HttpClient) {}

  getSavedJobs(userId: number) {
  return this.http.get<any[]>(`http://localhost:8082/api/saved-jobs/${userId}`);
}


  getFavouritesChanges(): Observable<number[]> {
    return this.favouritesChanged.asObservable();
  }

  saveJob(userId: number, jobId: number) {
    return this.http.post(`http://localhost:8082/api/saved-jobs/${userId}/${jobId}`, {});
  }

  removeSavedJob(jobId: number) {
    return this.http.delete(`http://localhost:8082/api/saved-jobs/${jobId}`).pipe(
      tap(() => {
        // notifier la suppression aux abonnés
        const current = this.favouritesChanged.value;
        this.favouritesChanged.next(current.filter(id => id !== jobId));
      })
    );
  }

  setFavourites(ids: number[]) {
    this.favouritesChanged.next(ids);
  }
}
