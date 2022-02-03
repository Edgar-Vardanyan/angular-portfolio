import {Observable} from 'rxjs';
import {AuthService} from "../services";
import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.ifLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  private ifLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }


}
