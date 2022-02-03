import {User} from "../interfaces";
import {Observable} from "rxjs";
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('users');
  }

  public getUser(userId: number): Observable<User> {
    return this.http.get<User>(`users/${userId}`);
  }

  public createUser(data: User): Observable<Object> {
    return this.http.post('users', data);
  }

  public updateUser(data: User, userId: number): Observable<Object> {
    return this.http.put(`users/${userId}`, data);
  }

  public deleteUser(userId: number): Observable<Object> {
    return this.http.delete(`users/${userId}`);
  }

}
