import {Subject} from "rxjs";
import {Post} from "../../../../../shared/models";
import {PostService} from "../../../../../shared/services";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  public posts: Post[] = [];
  public destroy$ = new Subject<void>();

  constructor(
    private postsService: PostService
  ) {
  }

  public ngOnInit(): void {
    this.getPosts();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public getPosts(): void {
    this.postsService.getPosts()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

}
