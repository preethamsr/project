import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private routes: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    localStorage.removeItem("useremail")
    this.routes.navigate(['login'])
  }

}
