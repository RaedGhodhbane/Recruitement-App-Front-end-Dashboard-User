import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedInEmployer: boolean = false;
  isLoggedInCandidate: boolean = false;
  user!:any;
  idCandidate!:any;
role:any
  constructor(private authService:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!)
     this.role = this.user.role;
    console.log("Le role est ",this.role);
   this.verif()

  }
verif(){
   if (this.role === 'CANDIDATE') {
    this.isLoggedInCandidate = true;
    this.authService.isLoggedIn.subscribe(status => {
    this.isLoggedInCandidate = status;
    })
    }
    else if ( this.role === 'RECRUITER') {
    this.isLoggedInEmployer = true;
    this.authService.isLoggedIn.subscribe(status => {
      this.isLoggedInEmployer = status;
    })
    }
}
    logout(): void {
    this.authService.logout();
    this.isLoggedInCandidate = false;
    this.isLoggedInEmployer = false;
    localStorage.clear();
    this.role=null
 this.router.navigate(['/login']).then(() => {
    location.reload(); 
  });

  }

}
