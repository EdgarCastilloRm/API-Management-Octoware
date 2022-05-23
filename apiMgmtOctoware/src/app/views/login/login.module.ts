import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SocialLoginModule, GoogleLoginProvider, SocialAuthServiceConfig, MicrosoftLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-materials/angular-materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SocialLoginModule,
    HttpClientModule,
    RouterModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '926156298570-j2klln377mhv1uc00f9iv9crf8cjo066.apps.googleusercontent.com'
            )
          },
          {
            id: MicrosoftLoginProvider.PROVIDER_ID,
            provider: new MicrosoftLoginProvider('39f60a81-6664-4d23-95d4-9291205373af', {
              redirect_uri: 'http://localhost:4200',
              logout_redirect_uri: 'http://localhost:4200/'
            }),
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [LoginComponent]
})
export class LoginModule { }