import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendserviceService } from '../Backendservice/backendservice.service';

@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.css']
})
export class EmailverificationComponent implements OnInit {
id:number;
  constructor(private routes: Router, private route: ActivatedRoute,private backend:BackendserviceService) { 
    this.route.queryParams.subscribe(params=>{
      this.id=params['id']
    });
  }

  ngOnInit(): void {
   const response= this.backend.Emailverification(this.id)
   if(response.status==200)
   {
    this.routes.navigate(['signup']);
   }
  }

}
