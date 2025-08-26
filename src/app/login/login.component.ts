import { Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email = '';
  password = '';
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    const credentials = this.loginForm.value;

    this.authenticationService.loginCandidate(credentials).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        try {
          const payload = JSON.parse(atob(res.token.split('.')[1]));
          const role = payload.authorities?.[0];
          if (role) {
            localStorage.setItem('role', role);
          } else {
            console.warn('Aucun rôle trouvé dans le token');
          }
          setTimeout(() => {
            this.router.navigate(['/']).then(() => {
    location.reload(); 
  });
         
          }, 0);
        } catch (e) {
          console.error('Erreur lors du décodage du token JWT', e);
        }

      },
      error: () => {
        this.errorMessage = 'Email ou mot de passe invalide';
      },
    });
  }
}
