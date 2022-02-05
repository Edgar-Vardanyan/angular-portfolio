import {Subject} from "rxjs";
import {Comment} from "../../../../../shared/interfaces";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommentService} from "../../../../../shared/services";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnDestroy {

  public comments: Comment[] = [];
  public destroy$ = new Subject<void>();

  constructor(
    private commentService: CommentService
  ) {
  }

  public ngOnInit(): void {
    this.getComments();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public getComments(): void {
    this.commentService.getComments()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
      });
  }

}
