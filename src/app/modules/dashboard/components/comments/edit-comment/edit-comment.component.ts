import {Observable} from "rxjs";
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Comment} from "../../../../../shared/interfaces";
import {DeactivateGuard} from "../../../../../shared/guards";
import {CommentService} from "../../../../../shared/services";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit, DeactivateGuard {

  public comment: Comment;
  public editForm: FormGroup;
  public editingMode: boolean = this.activatedRoute.snapshot.params.id;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
  ) {
  }

  public ngOnInit(): void {
    this.createForm()
    this.ifEditingMode()
  }

  public onSubmit(addForm: FormGroup): void {
    this.editForm.markAsPristine()

    if (this.editingMode) {
      this.updateComment(addForm.value, this.activatedRoute.snapshot.params.id)
    } else {
      this.createComment(addForm.value)
    }

  }

  public canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.editForm.dirty) {
      return true;
    }
    return confirm('Discard changes?');
  }

  public onCancel(): void {
    this.router.navigate(['dashboard', 'comments']);
  }

  private createForm(): void {
    this.editForm = new FormGroup({
      id: new FormControl(this.activatedRoute.snapshot.params.id),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      body: new FormControl('', Validators.required)
    });
  }

  private ifEditingMode(): void {
    if (this.activatedRoute.snapshot.params.id) {
      this.editingMode = true;
      this.getComment(this.activatedRoute.snapshot.params.id)
    }
  }

  private getComment(commentId: number): void {
    this.commentService.getComment(commentId)
      .subscribe(((comment: Comment) => {
          this.editForm.patchValue(comment);
        })
      );
  }

  private updateComment(data: Comment, commentId: number): void {
    this.commentService.updateComment(data, commentId)
      .subscribe(() => {
        this.onCancel();
      });
  }

  private createComment(data: Comment): void {
    this.commentService.createComment(data)
      .subscribe(() => {
        this.onCancel();
      });
  }


}
