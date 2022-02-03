import {Post} from "../interfaces";
import {Observable} from "rxjs";
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('posts');
  }

  public getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`posts/${postId}`);
  }

  public updatePost(data: Post, postId: number): Observable<Object> {
    return this.http.put(`posts/${postId}`, data);
  }

  public createPost(data: Post): Observable<Object> {
    return this.http.post('posts', data);
  }

  public deletePost(postId: number): Observable<Object> {
    return this.http.delete(`posts/${postId}`);
  }


}
