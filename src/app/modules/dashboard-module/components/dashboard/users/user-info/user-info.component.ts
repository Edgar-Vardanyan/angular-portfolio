import {map, takeUntil} from "rxjs/operators";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post, User} from "../../../../../../shared/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostService, UserService} from "../../../../../../shared/services";
import {Subject} from "rxjs";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  public userId: number;
  public user: User;
  public posts: Post[] = [];
  public destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.getUserId()
    this.getPosts();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  private getUserId(): void {

    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.userId = +params['id'];
          this.getUser();
        }
      );

  }

  public getUser(): void {
    this.userService.getUser(this.userId)
      .subscribe((user: User) => {
        this.user = user
      });
  }

  public getPosts(): void {
    this.postService.getPosts()
      .pipe(
        map(posts => {
          this.posts = posts.filter(post => post.userId === this.userId);
        })
      )
      .subscribe();

  }

  public onDelete(): void {
    this.userService.deleteUser(this.userId)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((res) => {
        this.router.navigate(['dashboard', 'users']);
      });
  }
}
