import {Component, OnDestroy, OnInit} from '@angular/core';
import {Comment, Post, User} from "../../../../../shared/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CommentService, PostService, UserService} from "../../../../../shared/services";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";


@Component({
  selector: 'app-comment-info',
  templateUrl: './comment-info.component.html',
  styleUrls: ['./comment-info.component.scss']
})
export class CommentInfoComponent implements OnInit, OnDestroy {
  public comment: Comment;
  public post: Post;
  public user: User;
  public commentId: number;
  public destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private userService: UserService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
  ) {
  }

  public ngOnInit(): void {
    this.getCommentId()
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public getComment(): void {
    this.commentService.getComment(this.commentId)
      .subscribe((comment: Comment) => {
        this.comment = comment
        this.getPost();
      });

  }

  public getPost(): void {
    this.postService.getPost(this.comment.postId)
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
    this.commentService.deleteComment(this.commentId)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.router.navigate(['dashboard', 'comments']);
      });

  }

  private getCommentId(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.commentId = +params['id'];
          this.getComment();
        }
      );
  }
}
