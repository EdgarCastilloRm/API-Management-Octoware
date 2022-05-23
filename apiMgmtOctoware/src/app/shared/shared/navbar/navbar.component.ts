import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:SocialAuthService, private dataService: DataService, private router:Router) { 
  }
  
  userData = this.dataService.getJsonValue('currentUser');

  ngOnInit(): void {
  }

  signOut(): void {
    this.dataService.clearToken();
    this.authService.signOut().
    then(() => this.router.navigate(['']));
  }

}
