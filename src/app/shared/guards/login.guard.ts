import {AuthService} from "../services";
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }


  public canActivate(): boolean {
    if (this.ifLoggedIn()) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }

  private ifLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }


}
