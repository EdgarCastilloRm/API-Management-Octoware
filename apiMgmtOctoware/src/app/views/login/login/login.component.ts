import { SocialUser, SocialAuthService, GoogleLoginProvider, MicrosoftLoginProvider } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/models/basicInfoUser';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

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

  constructor(
    private authService: SocialAuthService,
    private dataService: DataService,
    private router: Router
  ) {
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  signInGoogle(): void {
    this.authSub = this.authService.authState.subscribe((user) => {
      this.user = user;
      if (user != null) {
        this.registerUser();
        this.getUserData();
        this.getToken();
      }
    });
    
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInMS(): void {
    this.authSub = this.authService.authState.subscribe((user) => {
      this.user = user;
      if (user != null) {
        this.registerUser();
        this.getUserData();
        this.getToken();
      }
    });
    
    this.authService.signIn(MicrosoftLoginProvider.PROVIDER_ID);
  }

  registerUser(){
    var body = {
      nombre_usr: this.user.name,
      email: this.user.email,
      id_tipo_usr: 1
    }
    this.dataService.registerUser(body).subscribe((response) => {
      console.log(response);
    });
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

  getUserData(){
    this.dataService.getUserData(this.user.email).subscribe((response: UserInfo[])=>{
      if(response){
        this.basicInfo ={
          id_usr: response[0].id_usr,
          nombre_usr: response[0].nombre_usr,
          email: response[0].email,
          estatus: response[0].estatus,
          tipo_usr: response[0].tipo_usr
        }
        this.dataService.setJsonValue('currentUser', this.basicInfo);
      }
    });
  }
}
