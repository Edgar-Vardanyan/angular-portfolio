import {Injectable} from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  canActivate(): boolean {
    if (localStorage.getItem('user')) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;


  }

}
