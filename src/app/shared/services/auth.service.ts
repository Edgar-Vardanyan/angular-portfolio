import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }


  public isLoggedIn(): boolean {
    return !!localStorage.getItem('user')
  }

  public newUser(userInfo: string): void {
    localStorage.setItem('user', userInfo)
  }
}
