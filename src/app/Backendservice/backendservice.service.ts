import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentvarialsService } from '../Environmentvariables/environmentvarials.service'
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {
  response: any = [];
  constructor(private client: HttpClient, private Url: EnvironmentvarialsService) { }

  Addsocialmediausers(Socialmediauser: []) {

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        xhr.onreadystatechange = null;
        if (this.status == 302 || this.status == 200) {
          return JSON.parse(xhr.response);
        }
      }

    }

    xhr.open("POST", "" + this.Url.Baseurl + "/User/socialmediauser", false);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(Socialmediauser));

    return xhr;

  }

  userregistration(userdata: any) {
    let returneddata;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);


      }
    });

    xhr.open("POST", "" + this.Url.Baseurl + "/User/Adduser", false);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(userdata));
    return xhr;
  }
  Emailverification(id: number) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.onreadystatechange = function () {
      xhr.onreadystatechange = null;
      console.log(xhr);
    }
    xhr.open("POST", "" + this.Url.Baseurl + "/User/Userverification?id=" + id + "", false)
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    return xhr;
  }
    

   Userlogin(logincredentials:any)
   {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.onreadystatechange = function () {
      xhr.onreadystatechange = null;
      console.log(xhr);
    }
    xhr.open("POST", "" + this.Url.Baseurl + "/User/Userlogin", false)
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(logincredentials));
    return xhr;
   }

   
  Getuserdata(id:number)
  {
    var xhr=new XMLHttpRequest();
    xhr.withCredentials=true;
    xhr.onreadystatechange=function()
    {
      xhr.onreadystatechange = null;
      console.log(xhr.responseText);   
    }
    xhr.open("POST", "" + this.Url.Baseurl + "/User/Userdata?id="+id+"",false)
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    return xhr;
  }

}
