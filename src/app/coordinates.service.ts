import { Injectable } from '@angular/core';
import { HttpClientModule,HttpClient } from "@angular/common/http"; 

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {

  constructor(private client : HttpClient) { }


    Getcoordianets():Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(res => {
        resolve( {
         lng: res.coords.longitude, lat: res.coords.latitude 
        })
    })
  })
   }
   GetclientIP()
  {
    return this.client.get("http://api.ipify.org/?format=json")
     
  }
}
