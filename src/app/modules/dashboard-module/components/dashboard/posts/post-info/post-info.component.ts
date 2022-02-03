import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post, User} from "../../../../../../shared/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostService, UserService} from "../../../../../../shared/services";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit, OnDestroy {
  public postId: number;
  public user: User;
  public post: Post;
  public destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private userService: UserService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    this.getPostId()
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  private getPostId(): void {

    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.postId = +params['id'];
          this.getPost();
        }
      );

  }

  public getPost(): void {
    this.postService.getPost(this.postId)
      .subscribe((post: Post) => {
        this.post = post
        this.getUser();
      });

  }

  public getUser(): void {
    this.userService.getUser(this.post.userId)
      .subscribe((user: User) => {
        this.user = user
      });
  }

  public onDelete(): void {
    this.postService.deletePost(this.postId)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.router.navigate(['dashboard', 'posts']);
      });

  }
}
