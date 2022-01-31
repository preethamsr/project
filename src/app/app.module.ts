import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,FormGroup,Validators } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UniversitiesComponent } from './universities/universities.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {GoogleLoginProvider,FacebookLoginProvider} from 'angularx-social-login';
import { CoordinatesService } from './coordinates.service';
import { HttpClientModule } from "@angular/common/http";
import { BackendserviceService } from './Backendservice/backendservice.service';
import {ReactiveFormsModule} from '@angular/forms';
import { EnvironmentvarialsService } from '../app/Environmentvariables/environmentvarials.service';
import { EmailverificationComponent } from './emailverification/emailverification.component';
import { LogoutComponent } from './logout/logout.component';



 

const ROUTES: Routes = [
  {path: 'signup', component: HomepageComponent},
  {path: 'login', component: AppComponent},
  {path: 'universities', component: UniversitiesComponent},
  {path: 'verfication', component: EmailverificationComponent},
  {path: 'logout', component: LogoutComponent}


  
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    UniversitiesComponent,
    LogoutComponent, 
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    SocialLoginModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [    {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('149457059037-t9i75j5mnrmvguoq6795s6ausudmsgq4.apps.googleusercontent.com')
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(
            '277072117153996'
          )
        }       
      ],
      
    } as SocialAuthServiceConfig,
  },
  CoordinatesService,
  BackendserviceService,
  EnvironmentvarialsService,
  
],
  bootstrap: [AppComponent]
})
export class AppModule { }
