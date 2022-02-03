import {Observable} from "rxjs";
import {Component, OnInit} from '@angular/core';
import {Post} from "../../../../../shared/models";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../../../shared/services";
import {DeactivateGuard} from "../../../../../shared/guards";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, DeactivateGuard {
  public editForm: FormGroup;
  public editingMode: boolean = this.activatedRoute.snapshot.params.id;
  public post: Post;

  constructor(
    private router: Router,
    private postsService: PostService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.createForm()

  }

  private createForm(): void {
    this.editForm = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    });

    if (this.activatedRoute.snapshot.params.id) {
      this.editingMode = true;
      this.postsService.getPost(this.activatedRoute.snapshot.params.id)
        .subscribe(
          ((post: Post) => {
            delete post.id;
            delete post.userId;
            this.editForm.setValue(post);
          })
        );


    }
  }

  public onSubmit(addForm: FormGroup): void {
    this.editForm.markAsPristine()

    if (this.editingMode) {
      this.postsService.updatePost(addForm.value, this.activatedRoute.snapshot.params.id)
        .subscribe(() => {
          this.onCancel();
        });
    } else this.postsService.createPost(addForm.value)
      .subscribe(() => {
        this.onCancel();
      });

  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.editForm.dirty) {
      return true;
    }

    return confirm('Discard changes?');
  }

  public onCancel(): void {
    this.router.navigate(['dashboard', 'posts']);
  }


}
