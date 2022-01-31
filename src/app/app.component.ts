import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Routes } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendserviceService } from './Backendservice/backendservice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  opened = true
  logincheck=false
  userdata:any=[];
  constructor(private routes: Router, private route: ActivatedRoute, private backendservice:BackendserviceService) { }
  ngOnInit(): void {
      var login=localStorage.getItem("useremail");
      if(login!=null)
      {
        this.logincheck=true;
       let userdata=this.backendservice.Getuserdata(Number(login))
       if(userdata.status==200)
       {
         let userdetails=userdata.response;
        //  let user={
        //    "name":userdetails.Name,
        //    "Lastname":userdetails.Lastname,
        //    "email":userdetails.Email
        //  }
         this.userdata=JSON.parse(userdetails);
       }
      }
      else
      {
        this.logincheck=false
        this.routes.navigate(['signup']);
  
      }
      // this.logincheck=true;
      // this.routes.navigate(['signup']);
  
}

}