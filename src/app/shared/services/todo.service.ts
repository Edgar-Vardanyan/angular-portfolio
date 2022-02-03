import {Todo} from "../models";
import {Observable} from "rxjs";
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('todos');
  }

}
