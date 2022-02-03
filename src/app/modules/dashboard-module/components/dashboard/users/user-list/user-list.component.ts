import {Subject} from "rxjs";
import {User} from "../../../../../../shared/interfaces";
import {UserService} from "../../../../../../shared/services";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  public users: User[] = [];
  public destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
  ) {
  }

  public ngOnInit(): void {
    this.getUsers();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public getUsers(): void {
    this.userService.getUsers()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

}
