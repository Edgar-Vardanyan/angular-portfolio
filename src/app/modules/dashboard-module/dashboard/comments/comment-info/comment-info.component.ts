import {Component, OnInit} from '@angular/core';
import {Comment, Post, User} from "../../../../../shared/models";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CommentService, PostService, UserService} from "../../../../../shared/services";


@Component({
  selector: 'app-comment-info',
  templateUrl: './comment-info.component.html',
  styleUrls: ['./comment-info.component.scss']
})
export class CommentInfoComponent implements OnInit {
  public comment: Comment;
  public post: Post;
  public user: User;
  public commentId: number;

  constructor(
    private router: Router,
    private usersService: UserService,
    private postsService: PostService,
    private activatedRoute: ActivatedRoute,
    private commentsService: CommentService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.commentId = +params['id'];
          this.getComment();
        }
      );


  }

  public getComment(): void {
    this.commentsService.getComment(this.commentId)
      .subscribe((comment: Comment) => {
        this.comment = comment
        this.getPost();
      });

  }

  public getPost(): void {
    this.postsService.getPost(this.comment.postId)
      .subscribe((post: Post) => {
        this.post = post
        this.getUser();
      });

  }

  public getUser(): void {
    this.usersService.getUser(this.post.userId)
      .subscribe((user: User) => {
        this.user = user
      });
  }

  public onDelete(): void {
    this.commentsService.deleteComment(this.commentId)
      .subscribe(() => {
        this.router.navigate(['dashboard', 'comments']);
      });

  }
}
