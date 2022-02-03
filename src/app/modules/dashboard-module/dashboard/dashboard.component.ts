import {Router} from "@angular/router";
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  public ngOnInit(): void {
  }

  public onLogout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
