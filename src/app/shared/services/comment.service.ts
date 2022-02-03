import {Observable} from "rxjs";
import {Comment} from "../models";
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>('comments');
  }

  public getComment(commentId: number): Observable<Comment> {
    return this.http.get<Comment>(`comments/${commentId}`);
  }

  public updateComment(data: Comment, commentId: number) {
    return this.http.put(`comments/${commentId}`, data);
  }

  public createComment(data: Comment) {
    return this.http.post('comments', data);
  }

  public deleteComment(commentId: number) {
    return this.http.delete(`comments/${commentId}`);
  }

}

export class commentsService {
}
