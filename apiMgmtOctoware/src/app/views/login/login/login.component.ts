import { SocialUser, SocialAuthService, GoogleLoginProvider, MicrosoftLoginProvider } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/models/basicInfoUser';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  user: SocialUser = new SocialUser();
  basicInfo!: UserInfo;
  loggedIn: boolean = false; 
  authSub: Subscription = new Subscription;

  body = {
    id_tipo_usr: null
  }

  constructor(
    private authService: SocialAuthService,
    private dataService: DataService,
    private router: Router
  ) {
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  signInGoogle():void{
    this.authSub = this.authService.authState.subscribe({
      next: (res) => {
        this.user = res;
        if (this.user != null) {
          this.registerUser();
        }
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      }
    });
  }
  
  registerUser(): void{
    var body = {
      nombre_usr: this.user.name,
      email: this.user.email,
      id_tipo_usr: 1
    }
    this.dataService.registerUser(body).subscribe({
      next: (res) => {
        this.getUserData();
      }
    });
  }

  getUserData(){
    this.dataService.getUserData(this.user.email).subscribe({
      next: (response) => {
        this.basicInfo ={
          id_usr: response[0].id_usr,
          nombre_usr: response[0].nombre_usr,
          email: response[0].email,
          status: response[0].status,
          tipo_usr: response[0].tipo_usr
        }
        this.dataService.setJsonValue('currentUser', this.basicInfo);
        this.getToken();
      }
    })
  }

  getToken() {
    if(this.user.provider == 'MICROSOFT'){

      var body = { name: this.user.name, email: this.user.email };
      this.dataService.verifyMS(body).subscribe((response: any) => {
        if (response) {
          localStorage.setItem('token', JSON.stringify(response));
          this.router.navigate(['dashboard']);
        }
      });
    }else{
      var id_token = { id_token: this.user?.idToken };
      this.dataService.verifyGoogle(id_token).subscribe((response: any) => {
        if (response) {
          localStorage.setItem('token', JSON.stringify(response));
          this.router.navigate(['dashboard']);
        }
      });
    }
  }

  signInMS(): void{
    this.authSub= this.authService.authState.subscribe({
      next: (res) => {
        this.user = res;
        if (this.user != null) {
          this.registerUser();
        }
        this.authService.signIn(MicrosoftLoginProvider.PROVIDER_ID);
      }
    });
  }
}
