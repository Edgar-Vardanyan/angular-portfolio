import {Component, OnInit} from '@angular/core';
import {Post, User} from "../../../../../shared/models";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostService, UserService} from "../../../../../shared/services";

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit {
  public postId: number;
  public user: User;
  public post: Post;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UserService,
    private postsService: PostService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.postId = +params['id'];
        }
      );
    this.getPost();

  }

  public getPost(): void {
    this.postsService.getPost(this.postId)
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
    this.postsService.deletePost(this.postId).subscribe(() => {
      this.router.navigate(['dashboard', 'posts']);
    });

  }
}
