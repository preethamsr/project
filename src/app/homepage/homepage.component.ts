import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { CoordinatesService } from '../coordinates.service'
import { BackendserviceService } from '../Backendservice/backendservice.service'
import { Userdata } from '../Models/userdata'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


declare var FB: any
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  // Registrationdata=new Userdata(null,null,"preetham.nov16@gmaile.com",null,null,null,null,null)
  Registrationdata: Userdata = {
    Name: null, Lastname: null, Email: null, Phonenumber: null, Password: null, Langitude: null,
    Latitude: null, Ipaddress: null
  }
  Message: string;
  Loginmessage: string;
  socialUser: SocialUser;
  isLoggedin: boolean = false;
  registration = new FormGroup({
    Name: new FormControl('', Validators.required),
    Lastname: new FormControl('', Validators.required),
    // Phonenumber: new FormControl('', [Validators.pattern('^[0-9]{10}$)]')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
  })
  get name() { return this.registration.get('Name'); }
  get lastname() { return this.registration.get('Lastname'); }
  get phonenumber() { return this.registration.get('Phonenumber'); }
  get Email() { return this.registration.get('email'); }
  get Password() { return this.registration.get('password'); }

  constructor(private routes: Router, private route: ActivatedRoute,
    private authService: SocialAuthService,
    private Coordinates: CoordinatesService,
    private Backendservice: BackendserviceService) { }
  Socialmediauser: any = [];
  Lan_lat: any;
  Ipaddress: any;

  ngOnInit(): void {  
   this.authService.authState.subscribe((user)=>{
    this.socialUser = user;
    this.isLoggedin = (user != null);
    console.log(this.socialUser)
    console.log(this.isLoggedin)
   })
  }


  Facebooklogin() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(facebookuser=>{
      console.log(facebookuser)
      const geocoordinates = this.Getcoordinates()
      this.GetclientIP();
      let facebookusers = [
        {
          "Name": facebookuser.firstName,
          "Lastname": facebookuser.lastName,
          "Email": facebookuser.email,
          "Langitude": geocoordinates["longitude"].toString(),
          "Latitude": geocoordinates["latitude"].toString(),
          "Ipaddress": this.Ipaddress
        }
      ]
      this.Socialmediauser.push(facebookusers[0])
      let userID = this.Backendservice.Addsocialmediausers(this.Socialmediauser[0]);
      this.Socialmediauser = [];
      if (userID.status == 200 || userID.status == 302) {
        let responsedata = JSON.parse(userID.response);
        const navigationExtras: NavigationExtras = {
          queryParams: {
            activationcode: responsedata.ID
          }
        }
        localStorage.setItem("useremail", responsedata.ID)
        this.routes.navigate(['login'],navigationExtras)
      }
    });
  }

  googlelogin() {
    // let socialPlatformProvider;
    // socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(google_user => {
      const geocoordinates = this.Getcoordinates()
      this.GetclientIP();
      let googleuser = [
        {
          "Name": google_user.name,
          "Lastname": google_user.lastName,
          "Email": google_user.email,
          "Langitude": geocoordinates["longitude"].toString(),
          "Latitude": geocoordinates["latitude"].toString(),
          "Ipaddress": this.Ipaddress
        }
      ];
      this.Socialmediauser.push(googleuser[0])
      let userID = this.Backendservice.Addsocialmediausers(this.Socialmediauser[0]);
      this.Socialmediauser = [];
      if (userID.status == 200 || userID.status == 302) {
        let responsedata = JSON.parse(userID.response);
        const navigationExtras: NavigationExtras = {
          queryParams: {
            activationcode: responsedata.ID
          }
        }
        localStorage.setItem("useremail", responsedata.ID)
        this.routes.navigate(['login'],navigationExtras)
      }
    })

  }
  async GetclientIP() {
    this.Coordinates.GetclientIP().subscribe((res: any) => {
      return this.Ipaddress = res.ip;
    })

  }
  Getcoordinates() {
    this.Coordinates.Getcoordianets().then( res => {
      this.Lan_lat = {
        "longitude": res.lng,
        "latitude": res.lat
      }
    })
    return this.Lan_lat;
  }


  facebooklogin() {

  }

  Userregistration() {
    const geocoordinates = this.Getcoordinates()
    console.log(this.Registrationdata)
    this.Registrationdata.Langitude = geocoordinates["longitude"].toString();
    this.Registrationdata.Latitude = geocoordinates["latitude"].toString();
    this.GetclientIP();
    this.Registrationdata.Ipaddress = this.Ipaddress;
    let response = this.Backendservice.userregistration(this.Registrationdata)
    if (response.status == 302) {
      this.Message = "Email already exits";
    }
    if (response.status == 200) {
      this.Message = "Verify the entered email"
    }
    console.log(response);
  }

  Userlogin() {
    const geocoordinates = this.Getcoordinates()
    console.log(this.Registrationdata)
    this.Registrationdata.Langitude = geocoordinates["longitude"].toString();
    this.Registrationdata.Latitude = geocoordinates["latitude"].toString();
    this.GetclientIP();
    this.Registrationdata.Ipaddress = this.Ipaddress;
    const response = this.Backendservice.Userlogin(this.Registrationdata);

    if (response.status == 200) {
      let responsedata = JSON.parse(response.response);
      const navigationExtras: NavigationExtras = {
        queryParams: {
          activationcode: responsedata.ID
        }
      };
      localStorage.setItem("useremail", responsedata.ID)
      this.routes.navigate(['login'], navigationExtras);
    }
    else if (response.status == 404) {
      this.Loginmessage = "Email or Password is wrong"
    }

  }
  
}
