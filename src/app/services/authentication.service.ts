import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiURL = 'http://localhost:8082/api/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  public isLoggedIn = this.isLoggedInSubject.asObservable();

  constructor(private http:HttpClient) {}

  loginCandidate(credentials:any) {
    return this.http.post(`${this.apiURL}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        this.isLoggedInSubject.next(true);
      })
    );
  }

logout(): void {
  const token = localStorage.getItem('token');

  if (token) {
    this.http.post('http://localhost:8082/api/auth/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'text'
    }).subscribe({
      next: () => {
        console.log('Déconnexion côté backend réussie');
      },
      error: err => {
        console.error('Erreur lors de la déconnexion côté backend', err);
      }
    });
  }

  localStorage.removeItem('token');
  localStorage.removeItem('role');
  this.isLoggedInSubject.next(false);
}

getToken(): string | null {
  return localStorage.getItem('token');
}

getRole(): string | null {
  let role = localStorage.getItem('role');

  if (!role) {
    const user = localStorage.getItem('user');
    if (user) {
      role = JSON.parse(user).role;
    }
  }

  if (role && role.startsWith('ROLE_')) {
    role = role.replace('ROLE_', '');
  }

  return role;
}


isAuthenticated(): boolean {
  return !!this.getToken();
}

}
